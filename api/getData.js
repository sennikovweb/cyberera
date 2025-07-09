export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { uuid } = req.query;
      
      if (!uuid) {
        return res.status(400).json({ 
          success: false,
          error: 'UUID parameter is required' 
        });
      }

      // Получаем данные из Upstash Redis
      const redisResponse = await fetch(
        `${process.env.KV_REST_API_URL}/get/${uuid}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );

      if (!redisResponse.ok) {
        throw new Error('Failed to fetch data from Redis');
      }

      const data = await redisResponse.json();
      
      res.status(200).json({ 
        success: true,
        data: data.result // Upstash возвращает данные в поле result
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
      error: 'Method not allowed' 
    });
  }
};
