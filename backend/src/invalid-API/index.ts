import { Response, Request } from "express";


export const InvalidAPI = (req: Request, res: Response)=>{
    res.status(400).json({error: "Invalid API endpoint."});
};
