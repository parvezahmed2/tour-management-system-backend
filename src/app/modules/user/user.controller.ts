/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
 
 
 




/**
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // throw new Error("Fake error")
        throw new AppError(httpStatus.BAD_REQUEST, "fake error")
        const user = await userServices.createUser(req.body)
       
        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
           
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error : any){
        console.log(error)
         next(error)
    }
}

*/


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const user = await userServices.createUser(req.body)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    })
})

const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user
    const payload = req.body;
    const user = await userServices.updateUser(userId, payload, verifiedToken )


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Creted Successfully",
        data: user
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers =  catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const result = await userServices.getAllUsers()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All user Retrived Successfully",
        data: result.data,
        meta : result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}