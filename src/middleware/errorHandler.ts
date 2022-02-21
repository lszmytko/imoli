import { NextFunction, Request, Response} from "express";
import { CustomError } from "../errors/CustomError";

const errorHandlerMiddleware = async (err: CustomError, req: Request, res: Response, next: NextFunction) =>{
    const {statusCode, message} = err;
    return res.status(statusCode).json({msg: message});
}

export default errorHandlerMiddleware;