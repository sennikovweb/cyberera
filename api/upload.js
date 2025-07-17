import { Redis } from "@upstash/redis";

// Клиент автоматически подхватит из process.env:
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

const RATE_LIMIT = 10;
const WINDOW_SEC = 60;
const HOURS = 6;
const STOP_LIVE_TIME = HOURS * 60 * 60 * 1000;

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // или конкретный домен
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader('Access-Control-Allow-Credentials', 'true');  // если нужны куки
}

export default async function handler(req, res) {
  // 1) Pre‑flight запрос
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(204).end(); // No Content
  }

  // 2) Для остальных запросов сразу вешаем CORS‑заголовки
  setCorsHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 1) Rate limiting по IP
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const rateKey = `rate_limit:${userIP}`;
    const cnt = await redis.incr(rateKey);
    if (cnt === 1) {
      await redis.expire(rateKey, WINDOW_SEC);
    }
    if (cnt > RATE_LIMIT) {
      return res.status(429).json({ status: "error", message: `Too many requests (${RATE_LIMIT}/min)` });
    }

    // 2) Читаем тело запроса
    const body = req.body;
    const uuid = body.event_uuid;
    const key = body.key;
    const data = body.data;

    if (!uuid) {
      return res.status(400).json({ status: "error", message: "event_uuid is required" });
    }

    const redisResponse = await redis.get(uuid);
    let parsedPrevFile;

    if (redisResponse) {
      try {
        parsedPrevFile = typeof redisResponse === "string" ? JSON.parse(redisResponse) : redisResponse;
      } catch (error) {
        return res.status(400).json({ message: "Corrupted data in db" });
      }
      if (parsedPrevFile.key != key) {
        return res.status(403).json({ success: false, message: "Wrong key!" });
      }

      if (Date.now() - parsedPrevFile.data.date > STOP_LIVE_TIME) {
        return res.status(410).json({
          status: "error",
          message: "Too long without updates",
          status_code: 410,
          time: HOURS,
        });
      }
    }
    // 3) Сохраняем данные
    await redis.set(uuid, JSON.stringify(body));

    // 2. Считываем текущий индекс файлов
    const filesRaw = await redis.get("FILES");
	 console.log('filesRaw',filesRaw);
	 
    let filesList = Array.isArray(filesRaw) ? filesRaw : [];
console.log('Array.isArray(filesRaw)',Array.isArray(filesRaw));

    // 3. Готовим метаинформацию
    const meta = {
      date: data.date,
      title: data.eventName || "Без названия",
      data: 'some data'
    };

    // 4. Удаляем старую запись этого uuid (если она есть)
    filesList = filesList.filter((entry) => entry.key !== uuid);

    // 5. Добавляем новую
    filesList.push({ uuid: uuid, meta });

    // 6. Перезаписываем индекс файлов
    await redis.set("FILES", filesList);

    // 5) Отправляем ответ
    return res.status(200).json({
      status: "success",
      message: "results export SUCCESSFUL!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}

//REST API Версия
// export default async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//       const rateLimitKey = `rate_limit:${userIP}`;

//       // Атомарно увеличиваем счетчик и получаем новое значение
//       const incrResponse = await fetch(
//         `${process.env.KV_REST_API_URL}/incr/${encodeURIComponent(rateLimitKey)}`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
//           }
//         }
//       );

//       if (!incrResponse.ok) {
//         throw new Error('Failed to increment rate limit counter');
//       }

//       const result = await incrResponse.json();
//       const currentCount = result.result;

//       // Если это первый запрос, устанавливаем TTL 60 секунд
//       if (currentCount === 1) {
//         await fetch(
//           `${process.env.KV_REST_API_URL}/expire/${encodeURIComponent(rateLimitKey)}/60`,
//           {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
//             }
//           }
//         );
//       }

//       // Проверяем лимит
//       if (currentCount > 10) {
//         res.status(429).json({
//           status: 'error',
//           message:'Too many requests. Limit is 10 requests per minute.',
//           error: 'Too many requests. Limit is 10 requests per minute.'
//         });
//         return;
//       }

//       const data = req.body;
//       const uuid = data["event_uuid"];
// 		const date = Date.now()
//       // console.log('data', data)
//       // console.log('dataSting', JSON.stringify(data))

//      // ИСПРАВЛЕННАЯ ЧАСТЬ: сначала SET, затем EXPIRE отдельными запросами
//       // 1. Сохраняем данные
//       const setResponse = await fetch(
//         `${process.env.KV_REST_API_URL}/set/${encodeURIComponent(uuid)}`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
//             'Content-Type': 'application/json'
//           },
// 			 body:JSON.stringify(data)
//         }
//       );

//       if (!setResponse.ok) {
//         const errorDetails = await setResponse.text();
//         throw new Error(`Redis set error: ${errorDetails}`);
//       }

//       // 2. Устанавливаем TTL 14 дней (1209600 секунд)
//       const expireResponse = await fetch(
//         `${process.env.KV_REST_API_URL}/expire/${encodeURIComponent(uuid)}/1209600`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
//           }
//         }
//       );

//       if (!expireResponse.ok) {
//         const errorDetails = await expireResponse.text();
//         throw new Error(`Redis expire error: ${errorDetails}`);
//       }

//       const dataUrl = `${process.env.VERCEL_URL || 'https://rh-results-viewer.vercel.app'}/api/getData?uuid=${uuid}`;

//       res.status(200).json({
//         status: 'success',
//         message: 'Export successful',
//         dataUrl: dataUrl,
//         yourData: data
//       });

//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({
//         status: 'error',
//         message:'error.message',
//         error: error.message
//       });
//     }
//   } else if (req.method === 'GET') {
//     res.status(200).json({
//       status: 'success',
//       message: 'GET endpoint works'
//     });
//   }
// };
