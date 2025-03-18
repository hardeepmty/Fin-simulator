const Collectible = require("../../models/collectible");

exports.getAllCollectibles = async (req, res) => {
  try {
    const collectibles = await Collectible.find(); // Fetch collectibles from DB
    res.json(collectibles);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
