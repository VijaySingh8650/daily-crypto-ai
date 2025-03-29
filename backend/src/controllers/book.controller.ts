import { bookRegistrationSchema } from "../validation";
import Book from "../models/book.model";
import { NextFunction, Request, Response } from "express";

export const getAllBooks = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    
    try{

     

        const books  = await Book.find({userId: req?.user?.userId}).populate("userId", "name email");

        res.json(books);

    }
    catch(err){
        next(err);
    }
}

export const deleteTheBook = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    
    try{

        const {id} = req.params;

        const deleteBook = await Book.findByIdAndDelete({_id:id});

        if(!deleteBook){
            res.status(404).json({error: "Book not found"});
            return;
        }

        res.json({
            message:"Book Deleted successfully"
        });

    }
    catch(err){
        next(err);
    }
}


export const addNewBook = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    
    try{

        const {author, title, genre, description} = req.body;
        
         const validateSchema = bookRegistrationSchema.safeParse(req.body);
         
            if (!validateSchema.success) {
                res.status(400).json({ message: validateSchema.error?.message });
                return;
            }

        await Book.create({
            author,
            title,
            genre,
            description,
            userId: req?.user?.userId
        });

        res.json({
            message:"Book added successfully"
        });   

    }
    catch(err){
        next(err);
    }
}

export const updateABook = async(req:Request, res:Response, next:NextFunction):Promise<void> => {

    try{

        const {id} = req.params;

        const updateTheBook = await Book.findOneAndUpdate(
         {
             _id: id, userId: req?.user?.userId
         },
         {
             $set: req.body
         },
         {new: true, runValidators: true}
        );
 
        if(!updateTheBook){
 
           res.status(404).json({message:"Book not found"});
           return;
 
        }
        
        res.status(200).json({message:"Book Updated"});

    }
    catch(err){
        next(err);
    }

}