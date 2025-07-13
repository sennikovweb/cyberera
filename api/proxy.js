// Импортируем современный Fetch API (в Vercel он доступен без дополнительных установок)
// (Раньше требовался 'node-fetch', но теперь можно использовать встроенный 'fetch')

// Эта функция будет обрабатывать все запросы к нашему эндпоинту /api/proxy
export default async function handler(req, res) {
  // --- 1. Проверяем метод запроса (разрешаем только GET) ---

  res.setHeader("Access-Control-Allow-Origin", "https://sharikovstepan.github.io");
  //   res.setHeader("Access-Control-Allow-Origin", "*"); //для лоакльной проверки
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTION");

  if (req.method !== "GET") {
    res.status(405).json({ error: "Только GET-запросы разрешены!" });
    return; // Прекращаем выполнение функции
  }

  // --- 2. Получаем путь к файлу из query-параметра ---
  // Пример запроса: /api/proxy?path=docs/file.txt
  const filePath = req.query.path;

  if (!filePath) {
    res.status(400).json({ error: "Укажите параметр ?path=... в URL" });
    return;
  }

  // --- 3. Формируем URL к файлу в GitHub ---
  // (Замени 'username' и 'репозиторий1' на свои значения)
  const githubRawUrl = `https://raw.githubusercontent.com/sharikovstepan/results-jsons/main/${filePath}`;

  // --- 4. Делаем запрос к GitHub с аутентификацией ---
  try {
    // Отправляем GET-запрос к GitHub
    const response = await fetch(githubRawUrl, {
      headers: {
        // Если репозиторий приватный, добавляем токен
        Authorization: `token ${process.env.GH_TOKEN}`,
        // GitHub требует указать User-Agent
        "User-Agent": "vercel-proxy",
      },
    });

    // --- 5. Проверяем, успешен ли запрос ---
    if (!response.ok) {
      // Если GitHub вернул ошибку (например, 404)
      throw new Error("GitHub ответил с ошибкой:", `${response.status} ${response.statusText}`);
    }

    // --- 6. Получаем содержимое файла ---
    const fileContent = await response.text(); // Для текстовых файлов
    // Если файл бинарный (например, картинка), можно использовать:
    // const fileBuffer = await response.arrayBuffer();

    // --- 7. Возвращаем результат клиенту ---
    res.status(200).send(fileContent);
  } catch (error) {
    // --- 8. Обрабатываем ошибки ---
    console.error("Ошибка прокси:", error);
    res.status(500).json({
      error: "Не удалось загрузить файл",
      details: error.message,
    });
  }
}
