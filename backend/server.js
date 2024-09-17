const express = require('express');
const axios = require('axios');
const Ticker = require('./Ticker');
const connectDB = require('./db');
const app = express();
const PORT = 3000;

connectDB();

async function fetchAndStoreData() {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = Object.values(response.data).slice(0, 10);
       
        await Ticker.deleteMany();

        const tickerData = tickers.map(ticker => ({
            name: ticker.name,
            last: parseFloat(ticker.last),
            buy: parseFloat(ticker.buy),
            sell: parseFloat(ticker.sell),
            volume: parseFloat(ticker.volume),
            base_unit: ticker.base_unit
        }));

        await Ticker.insertMany(tickerData);
        console.log('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


app.get('/tickers', async (req, res) => {
    try {
        const tickers = await Ticker.find();
        res.json(tickers);
        // console.log({tickers});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from database' });
    }
});

fetchAndStoreData();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
