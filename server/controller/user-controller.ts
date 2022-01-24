import { Request, Response } from 'express';
import userModel from '../models/user-model';

const postUsers = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const user = req.body;
    const clash = await userModel.findOne({ email: user.email });
    if (clash) {
      console.log('user already exists');
      res.status(409).send({ error: '409', message: 'User already exists' });
    } else {
      const savedUser = await userModel.create(user);
      res.status(200).json(savedUser);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUser = async (req: Request, res: Response) => {
  const identifier = req.body.email;
  const user = await userModel.findOne({ email: identifier });
  console.log(user);
  res.send(user);
};

const getUsers = async (req: Request, res: Response) => {
  const users = await userModel.find();

  res.status(200).json(users);
};

export default { postUsers, getUser, getUsers };
