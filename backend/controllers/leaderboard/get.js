const User = require("../../models/user");


exports.leaderBoard = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          vcBalance: 1,
          role: 1,
          socialStatus: 1,
          collectiblesCount: {
            $cond: {
              if: { $isArray: "$ownedCollectibles" },
              then: { $size: "$ownedCollectibles" },
              else: 0
            }
          },
          collectiblesValue: {
            $cond: {
              if: { $isArray: "$ownedCollectibles" },
              then: { $sum: "$ownedCollectibles.price" },
              else: 0
            }
          },
          stocksValue: {
            $cond: {
              if: { $isArray: "$stocks" },
              then: {
                $reduce: {
                  input: "$stocks",
                  initialValue: 0,
                  in: { $add: ["$$value", { $multiply: ["$$this.shares", "$$this.purchasePrice"] }] }
                }
              },
              else: 0
            }
          },
          totalScore: {
            $add: [
              "$vcBalance",
              {
                $cond: {
                  if: { $isArray: "$ownedCollectibles" },
                  then: { $sum: "$ownedCollectibles.price" },
                  else: 0
                }
              },
              {
                $cond: {
                  if: { $isArray: "$stocks" },
                  then: {
                    $reduce: {
                      input: "$stocks",
                      initialValue: 0,
                      in: { $add: ["$$value", { $multiply: ["$$this.shares", "$$this.purchasePrice"] }] }
                    }
                  },
                  else: 0
                }
              },
              { $multiply: ["$socialStatus", 100] }
            ]
          }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 100 }
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error('Leaderboard Error:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};