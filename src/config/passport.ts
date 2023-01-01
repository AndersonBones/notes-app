import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import dotenv from 'dotenv'
import Notes from '../models/Notes'
import Users from '../models/Users'
import NotesService from "../services/UsersService";
import { NextFunction, Request, Response } from "express";

dotenv.config();


const NotAuthorized = {status:401, error:'Unauthorized'}

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN as string
}

passport.use(new JWTStrategy(options, async (payload, done)=>{
    let user = await NotesService.findById(payload.id);

    if(user){
        return done(null, user.id)
    }else{
        return done(NotAuthorized, false);
    }   
}))

export const privateAuth = (req:Request, res:Response, next:NextFunction) =>{

    const token = req.cookies.token as string;
    let Unauthorized = false;
    
    if(token){
        

        req.headers.authorization = `Bearer ${token}`;

        const authFunction = passport.authenticate('jwt', (err, user)=>{
            if(user){
                req.user = user;
                
                next()
            }else{
                Unauthorized = true;
                next(Unauthorized)
                
            }
        })

        authFunction(req, res, next);
    }else{
        res.status(401).redirect('/login')
 
    }
}