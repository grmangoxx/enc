const express = require('express');
const encryptCardData = require('./src/encrypt');
const { generate_risk_data } = require('./src/utils/risk'); // Import generate_risk_data

const app = express();
const port = 3000; // You can choose any port

// Middleware to parse JSON bodies
app.use(express.json());

// Function to detect card type based on BIN ranges
function detectCardType(cardNumber) {
    // Remove any spaces or non-numeric characters
    const cleanCard = cardNumber.replace(/\D/g, '');
    
    // Visa: starts with 4
    if (/^4/.test(cleanCard)) {
        return "visa";
    } 
    // Mastercard: starts with 51-55, 22-27
    else if (/^(5[1-5]|2[2-7])/.test(cleanCard)) {
        return "mc";
    }
    // Discover: starts with 6011, 644-649, 65
    else if (/^(6011|64[4-9]|65)/.test(cleanCard)) {
        return "discover";
    }
    
    return "unknown";
}

app.post('/encrypt', (req, res) => {
    const { card, month, year, cvc, adyenKey, stripeKey, domain, version } = req.body; 

    // Basic validation
    if (!card || !month || !year || !cvc || !adyenKey || !stripeKey || !domain) {
        return res.status(400).json({ 
            error: 'Missing required parameters. Please provide card, month, year, cvc, adyenKey, stripeKey, and domain. Version is optional.' 
        });
    }

    try {
        // Get User-Agent from headers
        const userAgent = req.headers['user-agent'];
        
        // Get client IP address
        const ip = req.headers['x-forwarded-for'] || 
                   req.socket.remoteAddress || 
                   req.connection.remoteAddress;

        // Generate risk data and get deviceFingerprint
        const { riskDataForPayload, deviceFingerprint } = generate_risk_data(userAgent);
        
        // Decode the base64 client data to extract browser information
        const clientDataStr = Buffer.from(riskDataForPayload.riskData.clientData, 'base64').toString();
        const clientData = JSON.parse(clientDataStr);
        
        // Detect card type
        const cardType = detectCardType(card);

        // Create browser info object
        const browserInfo = {
            colorDepth: clientData.components.colorDepth || 24,
            language: clientData.components.language || "en-US",
            screenHeight: clientData.components.screenHeight || 800,
            screenWidth: clientData.components.screenWidth || 1280,
            userAgent: userAgent,
            timeZoneOffset: clientData.components.timezoneOffset || -420
        };

        const encryptedResult = encryptCardData(
            card,
            month,
            year,
            cvc,
            adyenKey,
            stripeKey,
            domain,
            version 
        );
        
        // Include all required information in the response
        res.json({ 
            encryptedData: encryptedResult, 
            riskData: riskDataForPayload,
            deviceFingerprint: deviceFingerprint,
            cardType: cardType,
            browserInfo: browserInfo,
            ip: ip
        }); 
    } catch (error) {
        console.error("Processing error:", error); 
        res.status(500).json({ error: 'Failed to process request.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Encryption server listening at http://localhost:${port}`);
});