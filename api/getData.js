export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { uuid } = req.query;
      
      if (!uuid) {
        return res.status(400).json({ 
          success: false,
          error: 'Не указан UUID' 
        });
      }
      
      // Получаем данные из Redis
      const redisResponse = await fetch(`${process.env.REDIS_REST_URL}/get/${uuid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REDIS_REST_TOKEN}`
        }
      });
      
      if (!redisResponse.ok) {
        throw new Error('Данные не найдены в Redis');
      }
      
      const data = await redisResponse.json();
      
      res.status(200).json({ 
        success: true,
        data: data
      });
      
    } catch (error) {
      res.status(404).json({ 
        success: false,
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ 
      success: false,
      error: 'Метод не разрешен' 
    });
  }
};
