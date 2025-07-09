// // Простейший обработчик POST-запросов
// export default async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const data = req.body; // Получаем данные от плагина
      
//       // Просто логируем и возвращаем успех
//       console.log('Received data:', JSON.stringify(data, null, 2));
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Данные успешно сохранены',
//         yourData: data // Эхо-ответ для проверки
//       });
      
//     } catch (error) {
//       res.status(500).json({ 
//         success: false,
//         error: error.message 
//       });
//     }
//   } else if(req.method === 'GET') {
//     res.status(200).json({ 
//       success: true,
//       message: 'GET Работает' 
//     });
//   }
// };




// Простейший вариант без зависимостей
export default async (req, res) => {
  try {
    const data = req.body;
    const event_uuid=data[event_uuid];
    if (!event_uuid) {
      return res.status(400).json({ error: 'Missing event_uuid' });
    }

    // Используем fetch для работы с Redis REST API
    const redisResponse = await fetch(process.env.REDIS_REST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REDIS_REST_TOKEN}`
      },
      body: JSON.stringify({
        command: ['SET', `event:${event_uuid}`, JSON.stringify(data), 'EX', '2592000']
      })
    });

    if (!redisResponse.ok) {
      throw new Error('Redis operation failed');
    }

    res.status(200).json({ 
      status: 'success',
      saved_uuid: event_uuid
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
