const { db, read } = require('../utils/db');
module.exports = async (req, res) => {
  await read();
  const id = req.query.id;
  const video = (db.data.videos||[]).find(v=>v.id===id);
  if (!video) return res.status(404).json({ error:'video not found' });
  res.json({ url: video.hlsUrl, expiresIn: 3600 });
};
