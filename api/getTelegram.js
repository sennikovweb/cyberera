import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // или конкретный домен
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader('Access-Control-Allow-Credentials', 'true');  // если нужны куки
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(204).end(); // No Content
  }
  setCorsHeaders(res);

  const body = req.body;
  console.log("bodybodybody", body);
}
