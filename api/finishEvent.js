import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method === "GET") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
  try {
    const currentUuid = req.body.uuid;
    const file = await redis.get(currentUuid);
    file.isFinished = true;
    await redis.set(currentUuid, file);

    await updateFileInFILES(currentUuid);

    return res.status(200).json({ message: `file ${req.body.uuid} finished` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `${error}` });
  }
}

async function updateFileInFILES(fileUuid) {
  // 2. Считываем текущий индекс файлов
  const filesRaw = await redis.get("FILES");

  let filesList = Array.isArray(filesRaw) ? filesRaw : [];

  //Находим объект файла
  const currentFile = filesList.find((file) => file.uuid == fileUuid);
  console.log("currentFile", currentFile);
  console.log("filesList", filesList);

  //меняем его isFinished
  currentFile.meta.isFinished = true;

  // Удаляем старую запись этого uuid
  filesList = filesList.filter((entry) => entry.uuid !== fileUuid);

  // Добавляем пкркднланную
  filesList.push({ currentFile });

  // Перезаписываем индекс файлов
  await redis.set("FILES", filesList);
}
