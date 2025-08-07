// filepath: c:\Users\razer\Desktop\smartsentinels\server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Environment configuration
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY; // Add this to Vercel env variables
const OLLAMA_BASE_URL = isProduction 
    ? process.env.OLLAMA_API_URL || 'http://86.122.74.26:11434'
    : 'http://localhost:11434';

// Configure Ollama API URL
const OLLAMA_API_URL = `${OLLAMA_BASE_URL}/api/generate`;

// Log environment status
console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`API Base URL: ${OLLAMA_BASE_URL}`);

// Log which URL we're using
console.log(`Using Ollama API URL: ${OLLAMA_API_URL}`);

// Configure CORS for different environments
const corsOptions = {
    origin: '*', // Allow all origins for testing
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
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
                // Configure request headers
                const headers = {
                    'Content-Type': 'application/json',
                    ...(OLLAMA_API_KEY && { 'Authorization': `Bearer ${OLLAMA_API_KEY}` })
                };

                // Log request attempt (excluding sensitive data)
                console.log(`Attempting to call Ollama API at ${OLLAMA_API_URL}`);
                console.log(`Package Type: ${packageType}`);

                const response = await axios.post(OLLAMA_API_URL, {
                    model: 'bronzesentinel',
                    prompt: getPromptForPackage(packageType, code),
                    max_tokens: getTokenLimitForPackage(packageType),
                    stream: true
                }, {
                    headers,
                    responseType: 'stream',
                    timeout: 30000, // 30 second timeout
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
                const errorMessage = innerError.response?.data || innerError.message || 'Unknown error';
                console.error("Error within request:", {
                    message: errorMessage,
                    url: OLLAMA_API_URL,
                    status: innerError.response?.status,
                    packageType,
                    environment: isProduction ? 'production' : 'development'
                });
                
                streamComplete = true; // Stop the loop on error
                
                // Send a more informative error message
                const userMessage = isProduction
                    ? "Error connecting to AI service. Please check your network connection and try again."
                    : `Error processing request: ${errorMessage}`;
                    
                completedResponse += `\n${userMessage}`;
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
