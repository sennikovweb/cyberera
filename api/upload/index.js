// Простейший обработчик POST-запросов
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body; // Получаем данные от плагина
      
      // Просто логируем и возвращаем успех
      console.log('Received data:', JSON.stringify(data, null, 2));
      
      res.status(200).json({ 
        success: true,
        message: 'Данные успешно сохранены',
        yourData: data // Эхо-ответ для проверки
      });
      
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ 
      success: false,
      error: 'Только POST-запросы!' 
    });
  }
};
