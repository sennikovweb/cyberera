const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });


export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const uuid = data["event_uuid"];
      console.log('Received data with uuid:', uuid);
      
      // Проверка наличия необходимых переменных окружения
      if (!process.env.REDIS_REST_URL || !process.env.REDIS_REST_TOKEN) {
        throw new Error('Redis credentials are not configured');
      }
      console.log('Redis URL:', process.env.REDIS_REST_URL);
      
      // Сохраняем данные в Redis
      const redisUrl = `${process.env.REDIS_REST_URL}/set/${uuid}`;
      console.log('Making request to Redis at:', redisUrl);
      
      const redisResponse = await fetch(redisUrl, {
        method: 'POST',
        agent,
        headers: {
          'Authorization': `Bearer ${process.env.REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      console.log('Redis response status:', redisResponse.status);
      
      if (!redisResponse.ok) {
        const errorText = await redisResponse.text();
        console.error('Redis error response:', errorText);
        throw new Error(`Redis error: ${errorText}`);
      }
      
      const redisData = await redisResponse.json();
      console.log('Redis response data:', redisData);
      
      // Формируем URL для доступа к данным
      const dataUrl = `${process.env.VERCEL_URL || 'https://rh-results-viewer.vercel.app'}/api/getData?uuid=${uuid}`;
      
      res.status(200).json({ 
        success: true,
        message: 'Данные успешно сохранены',
        dataUrl: dataUrl,
        yourData: data
      });
      
    } catch (error) {
      console.error('Full error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      success: true,
      message: 'GET Работает' 
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
