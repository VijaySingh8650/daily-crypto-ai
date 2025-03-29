import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, "sdlfhf");
    
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 