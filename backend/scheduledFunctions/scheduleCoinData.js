const CronJob = require("node-cron");
const {
  deleteOldEntries,
  fetchCoinInfo,
} = require("../services/fetchCoinData.service");

const coinsCodeList = ["BTC", "ETH", "SOL", "USDT", "BNB"];

const codeToCoinName = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  USDT: "Tether",
  BNB: "BNB",
};
exports.initScheduledJobs = () => {
  const fetchingJob = CronJob.schedule("*/10 * * * * *", () => {
    coinsCodeList.map((coinCode) => {
      fetchCoinInfo(coinCode);
    });
  });

  const deletingJob = CronJob.schedule("*/2 * * * *", () => {
    coinsCodeList.map((coinCode) => {
      deleteOldEntries(codeToCoinName[coinCode]);
    });
  });

  fetchingJob.start();
  deletingJob.start();
};
