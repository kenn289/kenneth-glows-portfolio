// File: /api/valorant-tracker.js

export default async function handler(req, res) {
  const { name, tag } = req.query;
  const apiKey = process.env.TRACKER_API_KEY; // set this in Vercel env

  if (!apiKey) {
    return res.status(500).json({ error: "Env var TRACKER_API_KEY is missing!" });
  }

  try {
    const url = `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${encodeURIComponent(
      name
    )}%23${encodeURIComponent(tag)}`;

    const response = await fetch(url, {
      headers: { "TRN-Api-Key": apiKey },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Tracker.gg request failed" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
