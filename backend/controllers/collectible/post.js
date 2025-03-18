const User = require("../../models/user");
const Collectible = require("../../models/collectible");

exports.buyAsset = async (req, res) => {
  try {
    const { collectibleId, quantity } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log(user)

    const collectible = await Collectible.findById(collectibleId);
    if (!collectible) return res.status(404).json({ error: "Collectible not found" });

    let totalPrice = collectible.price;
    let totalDailyReturn = collectible.dailyReturn;
    let totalStatusPoints = collectible.statusPoints;

    // If it's Gold, allow buying multiple quantities
    if (collectible.type === "Gold") {
      if (!quantity || quantity <= 0) return res.status(400).json({ error: "Invalid quantity" });
      totalPrice *= quantity;
      totalDailyReturn *= quantity;
      totalStatusPoints *= quantity;
    }

    if (user.vcBalance < totalPrice) {
      return res.status(400).json({ error: "Not enough VC to buy this item" });
    }

    // Deduct VC and add the collectible to the user's inventory
    user.vcBalance -= totalPrice;
    user.socialStatus += totalStatusPoints;
    user.ownedCollectibles.push({
      collectibleId: collectible._id,
      name: collectible.name,
      category: collectible.type,
      price: totalPrice,
      dailyReturn: totalDailyReturn,
      statusPoints: totalStatusPoints,
      purchaseDate: new Date(),
    });

    await user.save();
    res.json({ message: "Purchase successful", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
