import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { uuid } = req.body;
    if (!uuid) {
      return res.status(400).json({ success: false, message: "UUID required" });
    }

    // Удаляем сам файл
    await redis.del(uuid);

    // Чистим индекс FILES
    const filesRaw = await redis.get("FILES");
    let filesList = Array.isArray(filesRaw) ? filesRaw : [];
    filesList = filesList.filter((entry) => entry.uuid !== uuid);
    await redis.set("FILES", filesList);

    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
