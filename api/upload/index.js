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




import { createClient } from 'redis';

// Автоматически использует REDIS_URL из переменных окружения
const redis = createClient({
  url: process.env.REDIS_URL
});

// Обработчик API
export default async (req, res) => {
  // Подключаемся к Redis при каждом запросе (не идеально, но просто для старта)
  await redis.connect().catch(err => {
    console.error('Redis connect error:', err);
    return res.status(500).json({ error: 'Redis connection failed' });
  });

  try {
    const { event_uuid, ...data } = req.body;
    
    if (!event_uuid) {
      return res.status(400).json({ error: 'Missing event_uuid' });
    }

    // Сохраняем данные
    await redis.set(
      `event:${event_uuid}`,
      JSON.stringify(data),
      { EX: 2592000 } // TTL 30 дней в секундах
    );

    res.status(200).json({
      status: 'success',
      saved_uuid: event_uuid
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await redis.disconnect(); // Закрываем соединение
  }
};
