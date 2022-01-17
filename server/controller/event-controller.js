const eventModel = require('../models/event-model');



const postEvents = async (req, res) => {
  console.log(req.body)
  try {
    const event = req.body
    const savedEvent = await eventModel.create(event);
    console.log('saved event', savedEvent)
      res.status(200).json(savedEvent)
    }

  catch (error) {
    console.log(error);
    res.sendStatus(500)
}
}




module.exports = { postEvents }