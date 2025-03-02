// Example Node.js backend (api/gemini.js)
const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(express.json());

const PROJECT_ID = 'YOUR_PROJECT_ID';
const LOCATION = 'YOUR_LOCATION'; // e.g., 'us-central1'
const MODEL_NAME = 'gemini-pro';

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({ model: MODEL_NAME });

app.post('/api/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.json({ result: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});