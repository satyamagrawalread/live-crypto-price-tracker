const mongoose = require('mongoose');

const cryptoInfoSchema = new mongoose.Schema({
    name: String,
    rate: Number,
    volume: Number,
    cap: Number,
    liquidity: Number,
    timestamp: { type: Date, default: Date.now }
});

mongoose.model("CryptoInfo", cryptoInfoSchema);