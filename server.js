const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log-info', (req, res) => {
    const { latitude, longitude, userAgent } = req.body;
    console.log('Visitor Info:', {
        latitude,
        longitude,
        userAgent
    });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
