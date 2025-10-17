Anime Streaming — Vercel Fullstack (final)

Deploy steps:
1. Create a Vercel project and upload this repo or import via GitHub.
2. In Vercel project settings -> Environment Variables, set:
   - JWT_SECRET (random string)
   - Either CLOUDINARY_URL (cloudinary://API_KEY:API_SECRET@CLOUD_NAME)
     OR CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
3. Deploy. Visit / (main site) and /admin.html for admin upload page.

Admin login (prefilled on admin page):
- Email: markjavier1648@gmail.com
- Password: password

Notes:
- This is a demo. Replace lowdb with a real DB and tighten auth for production.
