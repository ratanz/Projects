import express, { response } from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

// Initialize the OpenAI client directly
const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openaiClient.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = response.data.data[0].b64_json;
        res.status(200).send({ photo: image });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
})


export default router;