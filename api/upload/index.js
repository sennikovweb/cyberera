export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Получаем IP-адрес пользователя для идентификации
      const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      // Проверяем количество запросов от этого IP в Redis
      const rateLimitKey = `rate_limit:${userIP}`;
      const rateLimitResponse = await fetch(
        `${process.env.KV_REST_API_URL}/get/${encodeURIComponent(rateLimitKey)}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );
      
      let currentCount = 0;
      if (rateLimitResponse.ok) {
        const countData = await rateLimitResponse.json();
        currentCount = parseInt(countData.result || '0', 10);
      }
      
      // Если превышен лимит - возвращаем ошибку
      if (currentCount >= 10) {
        res.status(429).json({
          status: 'failed',
          error: 'Too many requests. Limit is 10 requests per minute.'
        });
        return;
      }
      
      // Увеличиваем счетчик запросов и устанавливаем TTL 60 секунд
      await fetch(
        `${process.env.KV_REST_API_URL}/multi/set/${encodeURIComponent(rateLimitKey)}/${currentCount + 1}/ex/60`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );

      
      const data = req.body;
      const uuid = data["event_uuid"];
      // console.log('data', data)
      // console.log('dataSting', JSON.stringify(data))

      // Сохраняем данные в Upstash Redis через REST API
      const redisResponse = await fetch(
        `${process.env.KV_REST_API_URL}/set/${uuid}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // Тело запроса - ваши данные
        }
      );

      if (!redisResponse.ok) {
        const errorDetails = await redisResponse.text();
        throw new Error(`Redis error: ${errorDetails}`);
      }

      // Формируем URL для доступа к данным
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
        status: 'failed',
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
