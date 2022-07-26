import expressAsyncHandler from "express-async-handler";
import Note from "../models/notesModel.js";

export const getNotes = expressAsyncHandler(async (req,res)=>{
    const notes = await Note.find({user:req.user._id});
    res.json(notes);
})

export const createNote = expressAsyncHandler(async (req,res)=>{
    const {title,content,category} = req.body;
    if(!title || !content || !category){
        res.status(400);
        throw new Error("Fill all fields");

    }else{
        //req.user from authMiddleware
        const note = new Note({user:req.user._id,title,content,category});
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
})

export const getNoteById =expressAsyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if(note){
        res.json(note);
    }else{
        res.status(404).json({message:"note not found"});
    }

})

export const updateNote = expressAsyncHandler(async(req,res)=>{
    const {title,content,category} = req.body;
    const note = await Note.findById(req.params.id);

    if(note.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("you cant Edit it");
    }
    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    }else{
        res.status(404);
        throw new Error("No note found");
    }
})

export const deleteNote = expressAsyncHandler(async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("you cant Edit it");
    }
    if(note){
        await note.remove();
        res.json({message:"Note deleted"})
    }else{
        res.status(404);
        throw new Error("Note not found");
    }
})