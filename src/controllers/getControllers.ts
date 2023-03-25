import { NextFunction, Request, Response } from "express";
import * as NotesService from '../services/NotesService'
import {NotesInstance} from '../models/Notes'

export const login = async (req:Request, res:Response) => {
    let Unauthorized = false;
    let message = '';

    res.status(200).render('pages/login', {Unauthorized, message})
}

export const register = async (req:Request, res:Response) => {
   res.status(200).render("pages/register") 
}

export const dashboard = async (req:Request, res:Response) => {
    

    let NotHaveNotes = "you still don't have any notes" as string
    let notes:string[] = [] ;
    let userID = 0;

    if(req.user){
        userID = req.user as number;
        
        let userNotes = await NotesService.getNotes(userID);
        
        if(userNotes instanceof Error){
            NotHaveNotes = userNotes.message as string;
        }else{
            notes = [...userNotes.content];
        }

    }else{
        res.status(401).render('pages/error')
    }

    
    res.status(201).render('pages/dashboard', {notes, userID, error:NotHaveNotes})

   
}

export const allNotes = async (req: Request, res:Response) => {
    let NotHaveNotes = "you still don't have any notes" as string
    let notes:string[] = [] ;
    let userID = 0;

    if(req.user){
        userID = req.user as number;
        
        let userNotes = await NotesService.getNotes(userID);
        
        if(userNotes instanceof Error){
            NotHaveNotes = userNotes.message as string;
        }else{
            notes = [...userNotes.content];
        }

    }else{
        res.status(401).json({error:true, msg:'Not authorization', NotHaveNotes})
    }

    res.status(201).json({error:false, notes, userID})
}

export const logout = async (req:Request, res:Response) => {
    res.status(200).clearCookie('token').redirect('/');
}