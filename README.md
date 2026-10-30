# EcoVenture

An interactive React app that helps children learn about sustainability through missions, quizzes, and classroom challenges.

## Local development

```bash
npm install
npm run dev
```

AI challenge generation uses the Gemini API. Create a local `.env` file and add your own key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env` files or API keys. The key must be configured locally or through the deployment platform.

## Build

```bash
npm run build
```
