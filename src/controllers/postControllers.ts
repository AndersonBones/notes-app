import { NextFunction, Request, Response } from "express";
import UserService from '../services/UsersService'
import * as NoteService from '../services/NotesService'
import dotenv from 'dotenv'

dotenv.config();
let expiresCookie = Date.now()+ 1000 * 3600 * 24 * 7;

export const loginValidate = async (req:Request, res:Response) => {
    let Unauthorized = false;
    console.log(req.body)

    if(req.body.password && req.body.email){
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await UserService.findByEmail(email);

        if(user && UserService.matchPassword(password, user.password)){
            
            
            const token = await UserService.genToken({id:user.id});
            res.status(201).cookie('token', token, {expires:new Date(expiresCookie),httpOnly:true}).redirect('/dashboard')
            return;
        } else{
            Unauthorized = true;
            res.status(401).render('pages/login', {Unauthorized, message:'Incorrect email or password'})
        }

    }
}

export const registerValidate = async (req:Request, res:Response) => {
    if(req.body.name && req.body.email && req.body.password){
        let name: string = req.body.name;
        let email: string = req.body.email;
        let password: string = req.body.password;

       let newUser = await UserService.register(name, email, password);

       if(newUser instanceof Error){ // precisa informar se já existe a conta
            return res.status(401).json({error:newUser.message})
       }else{
        const token = await UserService.genToken({id:newUser.id})
        res.status(201).cookie('token', token, {expires:new Date(expiresCookie),httpOnly:true}).redirect("/dashboard");
       }
    }else{
        res.status(401).render('pages/error')
    }
}

// Retornar apenas os dados atualizados sem a necessidade de redirecionar o usuário
// capturar um evento de clique e com o AJAX fazer uma requisição ao servidor conforme a necessidade
// o AJAX retornará o dado atualizado e atualizará a página sem refresh

export const addNotes = async (req:Request, res:Response) => {
    let id:number = Number(req.user);
    console.log(req.body)
    if(req.body.note && id){
        
        let note:string = req.body.note;
        
        
        let user = await NoteService.addNotes(note, id);
        
        if(user instanceof Error){
            res.status(401).json({error:true, msg:user.message})
        }else{
            
            res.status(201).json({error:false, user})
        }
    }else{
        res.status(401).json({error:'Dados não enviados'})
    }
}

export const deleteNotes = async (req:Request, res:Response) => {
    let id:number = Number(req.user);

    
    if(req.params.index && id){
        let indexNote = Number(req.params.index);
        let user = await NoteService.deleteNotes(indexNote, id);

        if(user instanceof Error){
            res.status(401).json({error:true, msg:user.message})
        }else{
            res.status(201).json({error:false, user})
        }
    }else{
        res.status(401).json({error:true, msg:'Dados não enviados'})
    }
}


export const editNotes = async (req:Request, res:Response) => {
    let id:number = Number(req.user);

    if(req.params.index && id && req.body.note){
        let indexNote = Number(req.params.index);
        let note = req.body.note;

        let user = await NoteService.editNotes(indexNote, id, note);

        if(user instanceof Error){
            res.status(401).json({error:true, msg:user.message})
        }else{
            res.status(201).json({error:false, user})
        }
    }else{
        res.status(401).json({error:true, msg:'Dados não enviados'})
    }
}