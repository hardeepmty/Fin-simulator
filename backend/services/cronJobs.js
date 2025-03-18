const cron = require("node-cron");
const User = require("../models/user");

// Run every day at midnight (server time)
cron.schedule("0 0 * * *", async () => {
  try {
    // Fetch users who own at least one collectible
    const users = await User.find({ "ownedCollectibles.0": { $exists: true } });

    if (users.length === 0) {
      console.log("⚠️ No users with collectibles found.");
      return;
    }

    let updatedUsers = 0;

    for (let user of users) {
      let totalEarnings = user.ownedCollectibles.reduce((sum, asset) => sum + asset.dailyReturn, 0);

      if (totalEarnings > 0) {
        await User.updateOne(
          { _id: user._id },
          { $inc: { vcBalance: totalEarnings } }
        );
        updatedUsers++;
      }
    }

    console.log(`✅ Daily VC earnings distributed to ${updatedUsers} users!`);
  } catch (error) {
    console.error("❌ Error distributing daily earnings:", error);
  }
});
