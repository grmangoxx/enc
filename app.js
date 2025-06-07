const express = require('express');
const encryptCardData = require('./src/encrypt');
const { generate_risk_data } = require('./src/utils/risk'); // Import generate_risk_data

const app = express();
const port = 3000; // You can choose any port

// Middleware to parse JSON bodies
app.use(express.json());

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

        // Generate risk data
        const riskData = generate_risk_data(userAgent);

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
        // Include both encryptedData and riskData in the response
        res.json({ encryptedData: encryptedResult, riskData: riskData }); 
    } catch (error) {
        console.error("Processing error:", error); // Changed log message for clarity
        res.status(500).json({ error: 'Failed to process request.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Encryption server listening at http://localhost:${port}`);
});