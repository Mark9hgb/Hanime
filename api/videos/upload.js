const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { db, read } = require('../utils/db');
const { verifyToken } = require('../utils/auth');
if (process.env.CLOUDINARY_URL) cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
async function uploadStream(buffer, public_id){
  return new Promise((resolve, reject)=>{
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'video', public_id, folder: 'anime_videos' }, (error, result)=>{
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const auth = req.headers.authorization || '';
  const token = auth.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'auth required' });
  if (payload.email !== 'markjavier1648@gmail.com') return res.status(403).json({ error: 'forbidden' });
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'invalid form' });
    if (!files.file) return res.status(400).json({ error: 'file required' });
    const file = files.file;
    const buf = require('fs').readFileSync(file.filepath);
    try{
      const pub = 'video_' + Date.now();
      const result = await uploadStream(buf, pub);
      await read();
      const vid = { id: 'vid_'+Date.now(), title: fields.title||result.original_filename, description: fields.description||'', hlsUrl: result.secure_url, published: true, createdAt: new Date().toISOString() };
      db.data.videos.push(vid);
      await db.write();
      res.json({ ok:true, video: vid });
    }catch(e){
      console.error(e);
      res.status(500).json({ error: 'upload failed', detail: e.message });
    }
  });
};
