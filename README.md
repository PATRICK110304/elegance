<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Northline Commercial

## Administration

Le back-office est disponible sur `/admin`. Il exige une requête authentifiée par `Authorization: Bearer ADMIN_SECRET`; la valeur n'est jamais exposée au frontend. Ajoutez `ADMIN_SECRET` dans **Vercel → Project Settings → Environment Variables** pour les environnements Preview et Production, puis redéployez. Utilisez une valeur aléatoire longue (au moins 32 octets), différente par environnement, et ne la commitez jamais dans `.env` ou le dépôt.

Les endpoints protégés sont `/api/admin/products` (GET, POST, PUT, DELETE avec masquage logique) et `/api/admin/orders` (GET).

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ec58ba9c-f4f0-4945-9c9a-2b99772ad5ee

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
