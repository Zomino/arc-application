const userModel = require('../models/user-model');



const postUsers = async (req, res) => {
  console.log(req.body)
  try {
    const user = req.body;
    const savedUser = await userModel.create(user);
    res.status(200).json(savedUser)
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
}



module.exports = { postUsers };