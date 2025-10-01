export default async function handler(req, res) {
    const { region, name, tag } = req.query;
    const apiKey = process.env.HENRIK_API_KEY;
  
    // DEBUG ONLY: check if env is read
    if (!apiKey) {
      return res.status(500).json({ error: "Env var HENRIK_API_KEY is missing!" });
    }
  
    try {
      const url = `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  }
  