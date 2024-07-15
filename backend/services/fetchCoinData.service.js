require('dotenv').config();
const mongoose = require('mongoose');
const CryptoInfo = mongoose.model('CryptoInfo');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function getRecentEntries(cryptoName) {
    return await CryptoInfo.aggregate([
      { $match: { name: cryptoName } },
      { $sort: { timestamp: -1 } },
      { $limit: 20 },
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

const fetchCoinInfo = async (cryptoCode) => {
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
        return data;
    }).catch((error) => {
        console.error(error);
    })
    if(!data?.name) return;

    const newData = {}
    newData.name = data.name;
    newData.rate = data.rate;
    newData.volume = data.volume;
    newData.cap = data.cap;
    newData.liquidity = data.liquidity;
    try {
        const cryptoInfo = new CryptoInfo(newData);
        await cryptoInfo.save();
    } catch (error) {
        console.error(error);
    }
}

fetchCoinInfo('BTC');

module.exports = { getRecentEntries, deleteOldEntries, fetchCoinInfo}