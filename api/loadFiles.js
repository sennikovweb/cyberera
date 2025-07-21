import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();


export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const files = await redis.get("FILES");

    if (!files) {
      return res.status(200).json({
        status: "success",
        files: [],
        message: "No files found",
      });
    }

    return res.status(200).json({
      status: "success",
      files, // это будет массив объектов
    });
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}