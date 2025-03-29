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
       res.status(200).json({ message: validateSchema.error?.message, status: 400});
       return;
   }


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(200).json({ message: 'User already exists', status: 400 });
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
      status: 201,
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
       res.status(200).json({ message: validateSchema.error?.message, status: 401 });
       return;
   }
    

    // Find user
    const user = await User.findOne({ email});

    if (!user) {
       res.status(200).json({ message: 'Invalid credentials', status: 401 });
       return;
    }

        // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
       res.status(200).json({ message: 'Invalid credentials', status: 401 });
       return;
    }


        // Generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        status: 200,
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
      res.status(200).json({ message: 'User not found', status: 404 });
      return;
    }

    res.json(user);

  } catch (error) {
    next(error);
  }
}; 