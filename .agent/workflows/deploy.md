---
description: How to deploy the Vite application to Vercel
---
1. Ensure you have the [Vercel CLI](https://vercel.com/download) installed.
2. Run `vercel login` to authenticate.
3. Link your project:
   ```bash
   vercel link
   ```
4. Deploy to production:
   ```bash
   vercel --prod
   ```
// turbo
5. Or use the automated CI/CD by pushing to the main branch:
   ```bash
   git add .
   git commit -m "Vite + React industrial setup"
   git push origin main
   ```
