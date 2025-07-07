// filepath: c:\Users\razer\Desktop\smartsentinels\server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';

app.use(cors());
app.use(bodyParser.json());

app.post('/process-code', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        let completedResponse = '';
        let streamComplete = false;

        while (!streamComplete) {
            try {
                const response = await axios.post(OLLAMA_API_URL, {
                    model: 'bronzesentinel',
                    prompt: `You are Smart Sentinel, an AI Agent that is an expert in Solidity language you will analyse this smartcontract and you will generate a report with the findings in a professional, succinct, and informative manner. In the end you will also grade the smart contract on a scale from 1 to 10 where  1 being the highest risk and 10 being a perfect smart contract and also you will say the numbers of  the risks the errors the recommendations and vulnerabilities:\n\n${code}`,
                    max_tokens: 400,
                    stream: true // Important: Enable streaming in the request
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    responseType: 'stream' // Important: Tell Axios to expect a stream
                });
                for await (const chunk of response.data) {
                    const decodedChunk = new TextDecoder().decode(chunk);
                    const lines = decodedChunk.split('\n').filter(line => line.trim() !== '');
                    for (const line of lines) {
                        try {
                            const parsed = JSON.parse(line);
                            if (parsed.response) {
                                completedResponse += parsed.response;
                            }
                            if (parsed.done) {
                                streamComplete = true;
                            }
                        } catch (jsonError) {
                            console.error("JSON parsing error:", jsonError, "Line:", line);
                            // Handle parsing errors, possibly by skipping the line
                        }
                    }
                }
            } catch (innerError) {
                console.error("Error within request:", innerError.response ? innerError.response.data : innerError);
                streamComplete = true; // Stop the loop on error
                completedResponse += "\nError processing part of the request. Check server logs.";
            }
        }

        res.json({ reply: completedResponse.trim() });

    } catch (error) {
        console.error('Outer Error calling Smart Sentinel API:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Failed to process the code',
            details: error.response ? error.response.data : 'No details available'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
