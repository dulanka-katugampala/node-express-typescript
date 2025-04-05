import { Request, Response, NextFunction } from "express";

const authSignup = function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.status(200).json({
        message: 'huuu'
    });
}

export { authSignup };