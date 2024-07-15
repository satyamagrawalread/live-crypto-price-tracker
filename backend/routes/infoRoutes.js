require('dotenv').config();
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const CryptoInfo = mongoose.model('CryptoInfo');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function getRecentEntries(cryptoName) {
    return await CryptoInfo.aggregate([
      { $match: { name: cryptoName } },
      { $sort: { timestamp: -1 } },
      { $limit: 2 },
      { $project: { _id: 1 } }
    ]);
}

async function deleteOldEntries(cryptoName) {
    const recentEntries = await getRecentEntries(cryptoName);
    const recentIds = recentEntries.map(entry => entry._id);
  
    await CryptoInfo.deleteMany({
      name: cryptoName,
      _id: { $nin: recentIds }
    });
}

const fetchCryptoInfo = async (cryptoCode) => {
    const data = await fetch('https://api.livecoinwatch.com/coins/single', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY
        },
        body: JSON.stringify({
            "currency": "USD",
            "code": cryptoCode,
            "meta": true
        })
    }
    ).then((res) => {
        if(!res.ok) {
            throw new Error("API Failed");
        }
        return res.json();
    }).then((data) => {
        // console.log(data);
        // return res.status(200).send(data);
        return data;
    }).catch((error) => {
        console.error(error);
    })

    const newData = {}
    newData.name = data.name;
    newData.rate = data.rate;
    newData.volume = data.volume;
    newData.cap = data.cap;
    newData.liquidity = data.liquidity;
    // console.log(newData);
    try {
        const cryptoInfo = new CryptoInfo(newData);
        await cryptoInfo.save();
    } catch (error) {
        console.error(error);
    }
}



router.get('/getRecentInfo', async (req, res) => {
    console.log("Entered getRecentInfo");
    const { name } = req.query;
    console.log(name);
    const cryptoData = await CryptoInfo.find({ name: name }).sort({ timestamp: -1 }).limit(20);
    console.log(cryptoData);
    return res.status(200).send({data: cryptoData})
})

router.post('/getCryptoInfo', async (req, res) => {
    console.log("Entered getCryptoInfo");
    const data = await fetch('https://api.livecoinwatch.com/coins/single', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY
        },
        body: JSON.stringify({
            "currency": "USD",
            "code": "BTC",
            "meta": true
        })
    }
    ).then((res) => {
        if(!res.ok) {
            throw new Error("API Failed");
        }
        return res.json();
    }).then((data) => {
        // console.log(data);
        // return res.status(200).send(data);
        return data;
    }).catch((error) => {
        console.error(error);
    })

    const newData = {}
    newData.name = data.name;
    newData.rate = data.rate;
    newData.volume = data.volume;
    newData.cap = data.cap;
    newData.liquidity = data.liquidity;
    console.log(newData);
    try {
        const cryptoInfo = new CryptoInfo(newData);
        await cryptoInfo.save();
    } catch (error) {
        console.error(error);
        return res.status(422).send({error: "Something went wrong"});
    }
    return res.status(200).send(data);
})

module.exports = router;