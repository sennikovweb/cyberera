import { Redis } from "@upstash/redis";

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
    const filesList = redis.get("FILES");
    const file = redis.get(req.body.uuid);

    console.log("filesList", filesList);
    console.log("file", file);
  } catch (error) {}
}
