const eventModel = require('../models/event-model');



const postEvents = async (req, res) => {
  console.log(req.body)
  try {
    const user = req.body;
    const clash = await userModel.findOne({email:user.email})
    if (clash) {
      console.log('user already exists');
      res.status(409).send({ error: '409', message: 'User already exists' })
    }
    else {
      const savedUser = await userModel.create(user);
      res.status(200).json(savedUser)
    }
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
}




module.exports = { postEvents };