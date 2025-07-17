
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

// Клиент подхватит REDIS_URL и REDIS_TOKEN из process.env
const redis = Redis.fromEnv()

const RATE_LIMIT = 10
const WINDOW_SEC = 60
const TTL_DATA_SEC = 60 * 60 * 24 * 14  // 14 дней

export const POST = async (req) => {
  try {
    const userIP = req.headers.get('x-forwarded-for') || 'unknown'
    const rateKey = `rate_limit:${userIP}`

    // 1) RATE LIMIT
    const cnt = await redis.incr(rateKey)
    if (cnt === 1) {
      await redis.expire(rateKey, WINDOW_SEC)
    }
    if (cnt > RATE_LIMIT) {
      return NextResponse.json(
        { status: 'error', message: `Too many requests (${RATE_LIMIT}/min)` },
        { status: 429 }
      )
    }

    // 2) SAVE DATA
    const body = await req.json()
    const uuid = body.event_uuid
    if (!uuid) {
      return NextResponse.json(
        { status: 'error', message: 'event_uuid is required' },
        { status: 400 }
      )
    }

    // Сохраняем JSON-строку вместе с TTL 14 дней
    await redis.set(uuid, JSON.stringify(body), { ex: TTL_DATA_SEC })

    const host = process.env.VERCEL_URL ?? req.headers.get('host')
    const protocol = host?.startsWith('http') ? '' : 'https://'
    const dataUrl = `${protocol}${host}/api/getData?uuid=${uuid}`

    return NextResponse.json(
      {
        status: 'success',
        message: 'Data saved',
        dataUrl,
        yourData: body,
      },
      { status: 200 }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { status: 'error', message: e.message },
      { status: 500 }
    )
  }
}

// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url)
//   const uuid = searchParams.get('uuid')
//   if (!uuid) {
//     return NextResponse.json(
//       { status: 'error', message: 'UUID is required' },
//       { status: 400 }
//     )
//   }
//   const stored = await redis.get(uuid)
//   if (stored === null) {
//     return NextResponse.json(
//       { status: 'error', message: 'Not found' },
//       { status: 404 }
//     )
//   }
//   return NextResponse.json(
//     { status: 'success', data: JSON.parse(stored) },
//     { status: 200 }
//   )
// }






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


