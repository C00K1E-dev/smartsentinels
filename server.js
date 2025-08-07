// filepath: c:\Users\razer\Desktop\smartsentinels\server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Ollama API URL based on environment
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || (() => {
    // Check if we're in production (Vercel)
    if (process.env.VERCEL) {
        return 'http://86.122.74.26:11434/api/generate';  // Production AI agent
    }
    return 'http://localhost:11434/api/generate';  // Local development
})();

// Log which URL we're using
console.log(`Using Ollama API URL: ${OLLAMA_API_URL}`);

// Configure CORS for different environments
const corsOptions = {
    origin: process.env.VERCEL 
        ? ['https://smartsentinels.vercel.app', 'https://www.smartsentinels.com']  // Add your Vercel deployment URLs
        : 'http://localhost:3000',  // Local development
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/process-code', async (req, res) => {
    const { code, packageType = 'bronze' } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    // Define different prompts based on package type
    const getPromptForPackage = (pkg, code) => {
        const basePrompt = `You are Smart Sentinel, an advanced AI Agent with deep expertise in Solidity smart contract analysis, leveraging techniques inspired by Slither and MythX analysis engines, enriched with custom AI/NLP capabilities for contextual understanding. Your analysis combines static analysis, symbolic execution, and pattern recognition to deliver comprehensive security assessments.`;
        
        switch (pkg) {
            case 'bronze':
                return `${basePrompt}

Analyze this smart contract focusing on:
1. Basic security vulnerabilities and common attack vectors
2. Gas optimization opportunities
3. Basic code quality and best practices

Format your response in this order:
1. Final Security Grade (1-10, where 1 is highest risk)
2. Statistics Summary (Number of: Critical Risks, High Risks, Optimizations, Best Practice Violations)
3. Key Findings Summary

Contract for analysis:\n\n${code}`;
            
            case 'silver':
                return `${basePrompt}

Perform a comprehensive analysis focusing on:
1. Advanced security patterns and vulnerability detection
2. Detailed gas optimization analysis
3. Reentrancy and access control issues
4. Business logic vulnerabilities
5. Contract upgradeability risks

Format your response in this order:
1. Final Security Grade (1-10, where 1 is highest risk)
2. Detailed Statistics (Critical/High/Medium/Low risks, Optimizations, Recommendations)
3. Key Findings Summary with Risk Levels
4. Optimization Recommendations

Contract for analysis:\n\n${code}`;
            
            case 'gold':
                return `${basePrompt}

Conduct an enterprise-grade security audit including:
1. Advanced threat modeling and attack vectors
2. Complete architecture review
3. Economic attack scenarios
4. Formal verification considerations
5. Cross-contract vulnerability analysis
6. Token economics security (if applicable)
7. Integration risk assessment

Format your response in this order:
1. Final Security Grade (1-10, where 1 is highest risk)
2. Comprehensive Statistics Matrix (By risk level, category, and impact)
3. Executive Summary of Critical and High Risks
4. Detailed Findings with Impact Analysis
5. Remediation Priority List

Contract for analysis:\n\n${code}`;
            
            default:
                return `${basePrompt} Analyze this smart contract and provide a basic security assessment:\n\n${code}`;
        }
    };

    // Set different token limits based on package
    const getTokenLimitForPackage = (pkg) => {
        switch (pkg) {
            case 'bronze': return 1000;
            case 'silver': return 2500;
            case 'gold': return 5000;
            default: return 1000;
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
