import express from 'express';
import Accountcontroller from '../controllers/account.controller';
import authorize from '../middleware/userValidator';

const accountRoute = express.Router();

accountRoute.post('/', authorize.checkUser, Accountcontroller.createAccount);


export default accountRoute;