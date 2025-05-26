const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const geoip = require('geoip-lite');
const useragent = require('express-useragent');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(useragent.express());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log-info', (req, res) => {
    const { latitude, longitude } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const ua = req.useragent;

    const visitorInfo = {
        latitude,
        longitude,
        ip,
        city: geo?.city,
        region: geo?.region,
        country: geo?.country,
        timezone: geo?.timezone,
        browser: ua.browser,
        version: ua.version,
        os: ua.os,
        platform: ua.platform,
        source: ua.source
    };

    console.log('Visitor Info:', visitorInfo);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
