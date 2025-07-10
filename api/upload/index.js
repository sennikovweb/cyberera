export default async (req, res) => {
  if (req.method === 'POST') {
    try {
     const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const rateLimitKey = `rate_limit:${userIP}`;

      // Атомарно увеличиваем счетчик и получаем новое значение
      const incrResponse = await fetch(
        `${process.env.KV_REST_API_URL}/incr/${encodeURIComponent(rateLimitKey)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );

      if (!incrResponse.ok) {
        throw new Error('Failed to increment rate limit counter');
      }

      const result = await incrResponse.json();
      const currentCount = result.result;

      // Если это первый запрос, устанавливаем TTL 60 секунд
      if (currentCount === 1) {
        await fetch(
          `${process.env.KV_REST_API_URL}/expire/${encodeURIComponent(rateLimitKey)}/60`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
            }
          }
        );
      }

      // Проверяем лимит
      if (currentCount > 10) {
        res.status(429).json({
          status: 'error',
          message:'Too many requests. Limit is 10 requests per minute.',
          error: 'Too many requests. Limit is 10 requests per minute.'
        });
        return;
      }

      
      const data = req.body;
      const uuid = data["event_uuid"];
		const date = Date.now()
      // console.log('data', data)
      // console.log('dataSting', JSON.stringify(data))

     // ИСПРАВЛЕННАЯ ЧАСТЬ: сначала SET, затем EXPIRE отдельными запросами
      // 1. Сохраняем данные
      const setResponse = await fetch(
        `${process.env.KV_REST_API_URL}/set/${encodeURIComponent(uuid)}/${encodeURIComponent(JSON.stringify(data))}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!setResponse.ok) {
        const errorDetails = await setResponse.text();
        throw new Error(`Redis set error: ${errorDetails}`);
      }

      // 2. Устанавливаем TTL 14 дней (1209600 секунд)
      const expireResponse = await fetch(
        `${process.env.KV_REST_API_URL}/expire/${encodeURIComponent(uuid)}/1209600`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );

      if (!expireResponse.ok) {
        const errorDetails = await expireResponse.text();
        throw new Error(`Redis expire error: ${errorDetails}`);
      }

      const dataUrl = `${process.env.VERCEL_URL || 'https://rh-results-viewer.vercel.app'}/api/getData?uuid=${uuid}`;

      res.status(200).json({ 
        status: 'success',
        message: 'import successful',
        dataUrl: dataUrl,
        yourData: data
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        status: 'error',
        message:'error.message',
        error: error.message 
      });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      status: 'success',
      message: 'GET endpoint works' 
    });
  }
};




// export default async (req, res) => {
//   // Читаем тело запроса вручную




      
//   let body = '';
//   req.on('data', chunk => body += chunk);
  
//   req.on('end', async () => {
//     try {
//       // Парсим JSON
//       const data = JSON.parse(body);
      
//       // Проверяем наличие event_uuid
//       if (!data.event_uuid) {
//         return res.status(400).json({ error: 'Missing event_uuid in payload' });
//       }

//       // Формируем команду для Redis
//       const command = {
//         command: [
//           'SET',
//           `event:${data.event_uuid}`,
//           JSON.stringify(data),
//           'EX',
//           '2592000' // 30 дней в секундах
//         ]
//       };

//       // Отправляем в Redis
//       const redisResponse = await fetch(process.env.REDIS_REST_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.REDIS_REST_TOKEN}`
//         },
//         body: JSON.stringify(command)
//       });

//       if (!redisResponse.ok) {
//         throw new Error(`Redis error: ${await redisResponse.text()}`);
//       }

//       res.status(200).json({
//         status: 'success',
//         saved_uuid: data.event_uuid
//       });

//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ 
//         error: error.message,
//         details: error.stack 
//       });
//     }
//   });

//       console.log('Request body:', body);
// console.log('Redis URL:', process.env.REDIS_REST_URL);
// console.log('Redis command:', command);
// };
