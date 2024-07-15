require('dotenv').config();
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const CryptoInfo = mongoose.model('CryptoInfo');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;




router.get('/getRecentInfo', async (req, res) => {
    const { name } = req.query;
    const cryptoData = await CryptoInfo.find({ name: name }).sort({ timestamp: -1 }).limit(20);
    return res.status(200).send({data: cryptoData})
})

module.exports = router;
