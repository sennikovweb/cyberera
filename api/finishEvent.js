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
    const filesList = await redis.get("FILES");
    const file = await redis.get(req.body.uuid);

    console.log("filesList", filesList);
    console.log("file", file);

    return res.status(200).json({ message: `file ${req.body.uuid} finished` });
  } catch (error) {
	console.error(error)
	return res.status(500).json({ message: `${error}` });
  }
}
