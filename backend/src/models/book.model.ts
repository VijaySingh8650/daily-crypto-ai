import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    author: {type: String, trim: true},
    title: {type: String, trim: true},
    genre: {type: String, trim: true},
    description: {type: String, trim: true},
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // ✅ References the "User" model
        required: true 
    }
}, {
    timestamps: true,
});

export default mongoose.model("Book", bookSchema);