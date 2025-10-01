// File: /api/valorant-mmr.js

export default async function handler(req, res) {
    const { region, name, tag } = req.query;
  
    // Read Henrik API key from env
    const apiKey = process.env.HENRIK_API_KEY;
  
    // Check if env exists
    if (!apiKey) {
      return res.status(500).json({ error: "Env var HENRIK_API_KEY is missing!" });
    }
  
    // Construct Henrik API URL
    const url = `https://api.henrikdev.xyz/valorant/v2/mmr/${encodeURIComponent(
      region
    )}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`;
  
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
  
      // If Henrik responds 401, return a clean error
      if (response.status === 401) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Henrik API key may be invalid or expired",
        });
      }
  
      // Forward Henrik JSON data
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      // Catch network or parsing errors
      res.status(500).json({
        error: "Proxy error",
        message: err.message || "Unknown error",
      });
    }
  }
  