// api/explainDrug.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { drugName } = req.query;

    if (!drugName || typeof drugName !== "string") {
      return res.status(400).json({ error: "drugName parameter is required" });
    }

    // Your EC2 backend URL
    const EC2_BASE_URL =
      process.env.EC2_BASE_URL ||
      "http://13.200.149.16:8080"
    const response = await fetch(
      `${EC2_BASE_URL}/api/drugs/v1/explainDrug?drugName=${encodeURIComponent(
        drugName
      )}`
    );

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return res.status(500).json({
      error: "Failed to fetch drug information",
      details: errorMessage,
    });
  }
}
