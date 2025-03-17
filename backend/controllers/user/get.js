const User = require('../../models/user');

exports.getUser = async (req, res) => {
  try {
    const data = await User.findById(req.user._id);

    if (!data) {
      return res.status(404).json({ Error: 'User not found' });
    }


    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ Error: err.message });
  }
};