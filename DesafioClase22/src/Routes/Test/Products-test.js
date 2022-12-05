import { Router } from "express";
import { MockService } from '../../services/index.js';
import { successResponse } from "../../utils/index.js";
import {HTTP_STATUS} from './constants/api.constants.js'
const router = Router();
const service= new MockService()

router.get("/", (req,res)=>{
  const users = service.getAll(req.query.cant);
  const response = successResponse(users);
  res.status(HTTP_STATUS.OK).json(response);
});

export {router as routerTest};
