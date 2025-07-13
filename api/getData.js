// export default async (req, res) => {
//   // Устанавливаем CORS-заголовки для ответа API
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

//   // Обрабатываем OPTIONS-запрос (для CORS Preflight)
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   if (req.method === 'GET') {
//     try {
//       const { uuid } = req.query;

//       if (!uuid) {
//         return res.status(400).json({
//           success: false,
//           error: 'UUID parameter is required'
//         });
//       }

//       // Запрос к Redis (убираем ненужный CORS-заголовок)
//       const redisResponse = await fetch(
//         `${process.env.KV_REST_API_URL}/get/${uuid}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
//           }
//         }
//       );

//       if (!redisResponse.ok) {
//         throw new Error('Failed to fetch data from Redis');
//       }

//       const data = await redisResponse.json();

//       res.status(200).json({
//         success: true,
//         data: data.result
//       });

//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         error: error.message
//       });
//     }
//   } else {
//     res.status(405).json({
//       success: false,
//       error: 'Method not allowed'
//     });
//   }
// };

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://rh-results-viewer.vercel.app/");
  //   res.setHeader("Access-Control-Allow-Origin", "*");//для локальной проверки
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "GET") {
    try {
      const { uuid } = req.query;

      if (!uuid) {
        return res.status(400).json({
          success: false,
          error: "Не указан UUID",
        });
      }

      const redisResponse = await fetch(`${process.env.KV_REST_API_URL}/get/${uuid}`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!redisResponse.ok) {
        throw new Error("Данные не найдены в Redis");
      }

      const responseData = await redisResponse.json();

      // Если ключ не существует, Redis вернет { result: null }
      if (responseData.result === null) {
        return res.status(404).json({
          success: false,
          error: "Данные не найдены или истек срок хранения",
        });
      }

      // Парсим результат (если он пришел как строка)
      const data = typeof responseData.result === "string" ? JSON.parse(responseData.result) : responseData.result;

      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }
};
