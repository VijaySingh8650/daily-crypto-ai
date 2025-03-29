import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { userLoginSchema, userRegistrationSchema } from '../validation';


export const register = async (
  req: Request,
  res: Response,  next: NextFunction
):Promise<void> => {
  try {
    
   const {email, password, name} = req.body;

   const validateSchema = userRegistrationSchema.safeParse(req.body);

   if (!validateSchema.success) {
       res.status(400).json({ message: validateSchema.error?.message });
       return;
   }


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }


        // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

     res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    
 

  } catch (error) {
    
    next(error);
    
  }
};

export const login = async (
  req: Request,
  res: Response, next: NextFunction
): Promise<void> => {
  try {

    const {email, password} = req.body;

    const validateSchema = userLoginSchema.safeParse(req.body);

   if (!validateSchema.success) {
       res.status(400).json({ message: validateSchema.error?.message });
       return;
   }
    

    // Find user
    const user = await User.findOne({ email});

    if (!user) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

        // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }


        // Generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
  
      res.json({
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });

    

    
        
    

    
  } catch (error) {
    
    next(error);

}
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {



    const user = await User.findById(req?.user?.userId as string).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);

  } catch (error) {
    next(error);
  }
}; 