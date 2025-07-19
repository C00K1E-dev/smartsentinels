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
    const { code, packageType = 'bronze' } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    // Define different prompts based on package type
    const getPromptForPackage = (pkg, code) => {
        const basePrompt = `You are Smart Sentinel, an AI Agent that is an expert in Solidity language. You will analyze this smart contract and generate a report with findings in a professional, succinct, and informative manner.`;
        
        switch (pkg) {
            case 'bronze':
                return `${basePrompt} Focus on basic security vulnerabilities, common issues, and gas optimization. Provide a concise report suitable for basic security review. In the end, grade the smart contract on a scale from 1 to 10 where 1 being the highest risk and 10 being a perfect smart contract. Also provide the numbers of risks, errors, recommendations and vulnerabilities found:\n\n${code}`;
            
            case 'silver':
                return `${basePrompt} Perform a comprehensive analysis including advanced security patterns, detailed vulnerability assessment, gas optimization, reentrancy checks, and compliance verification. Provide detailed explanations and recommendations. In the end, grade the smart contract on a scale from 1 to 10 where 1 being the highest risk and 10 being a perfect smart contract. Also provide detailed statistics of risks, errors, recommendations and vulnerabilities found:\n\n${code}`;
            
            case 'gold':
                return `${basePrompt} Conduct an enterprise-grade security audit including advanced threat modeling, complete architecture review, economic attack vectors, formal verification suggestions, and comprehensive security recommendations. Provide detailed remediation steps, priority levels, and implementation guidance. Include risk assessment matrix and detailed compliance analysis. In the end, grade the smart contract on a scale from 1 to 10 where 1 being the highest risk and 10 being a perfect smart contract. Also provide comprehensive statistics and categorized breakdown of all findings:\n\n${code}`;
            
            default:
                return `${basePrompt} Analyze this smart contract and provide findings:\n\n${code}`;
        }
    };

    // Set different token limits based on package
    const getTokenLimitForPackage = (pkg) => {
        switch (pkg) {
            case 'bronze': return 600;
            case 'silver': return 1200;
            case 'gold': return 2000;
            default: return 400;
        }
    };

    try {
        let completedResponse = '';
        let streamComplete = false;

        while (!streamComplete) {
            try {
                const response = await axios.post(OLLAMA_API_URL, {
                    model: 'bronzesentinel',
                    prompt: getPromptForPackage(packageType, code),
                    max_tokens: getTokenLimitForPackage(packageType),
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

        res.json({ 
            reply: completedResponse.trim(),
            packageType: packageType,
            timestamp: new Date().toISOString()
        });

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
