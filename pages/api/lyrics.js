export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or set your domain instead of '*'
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const { artist, title } = req.query;
  
    if (!artist || !title) {
      return res.status(400).json({ error: 'Missing artist or title' });
    }
  
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const data = await response.json();
  
      if (data.lyrics) {
        res.status(200).json({ lyrics: data.lyrics });
      } else {
        res.status(404).json({ error: 'Lyrics not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch lyrics' });
    }
  }
  