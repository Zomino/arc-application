import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  foodCost: { type: String, required: true },
  drinksCost: { type: String, required: false },
  totalCost: { type: String, required: true },
  creator: { type: String, required: true },
  arcs: { type: {}, required: true },
  arcsPaid: { type: {}, required: true },
  arcItems: { type: {}, required: true },
  arcFirstNames: { type: {}, required: true },
  arcNameArray: { type: [], required: true },
});

export default mongoose.model('eventModel', eventSchema);
