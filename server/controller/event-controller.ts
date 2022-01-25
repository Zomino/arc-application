import { Request, Response } from 'express';
import eventModel from '../models/event-model';

const postEvent = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const savedEvent = await eventModel.create(event);
    res.status(200).json(savedEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getEventsList = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const eventList = await eventModel.find({});
    const userEvents = eventList.filter((event) => (event.arcs[user]));
    res.status(200).json(userEvents);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getEvent = async (req: Request, res: Response) => {
  try {
    const id = req.body.event;
    const currentEvent = await eventModel.find({ _id: id });
    res.status(200).json(currentEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updatePayment = async (req: Request, res: Response) => {
  try {
    const { event, user } = req.params;
    const updatedEvent = await eventModel.findById(event);
    const { arcsPaid } = updatedEvent;
    arcsPaid[user] = true;
    await eventModel.findByIdAndUpdate(event, { arcsPaid });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  postEvent,
  getEventsList,
  getEvent,
  updatePayment,
};
