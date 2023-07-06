import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import dotenv from 'dotenv'
import Notes from '../models/Notes'
import Users from '../models/Users'
import NotesService from "../services/UsersService";
import { NextFunction, Request, Response } from "express";

dotenv.config();


const NotAuthorized = {status:401, error:'Unauthorized'}

const options = { // regras para a geração do token
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN as string
}

passport.use(new JWTStrategy(options, async (payload, done)=>{ // procura o usuário no banco de dados utilizando o id como identificador
    let user = await NotesService.findById(payload.id);

    if(user){
        return done(null, user.id) // retorna o id do usuário
    }else{
        return done(NotAuthorized, false); // retorna uma mensagem de erro
    }   
}))

export const privateAuth = (req:Request, res:Response, next:NextFunction) =>{ // verifica se o client tem o token de autenticação

    const token = req.cookies.token as string;
    let Unauthorized = false;
    
    if(token){ // caso o client tenha o token
        
        req.headers.authorization = `Bearer ${token}`; // passa o token para o header da requisição, devolvendo para o servidor

        const authFunction = passport.authenticate('jwt', (err, user)=>{ // verifica se o usuario foi localizado
            if(user){
                req.user = user; // devolve as informações do usuário para o servidor
                
                next() // realiza a autenticação
            }else{
                Unauthorized = true;
                next(Unauthorized)
                
            }
        })

        authFunction(req, res, next); // executa a função
    }else{
        res.status(401).redirect('/login')
 
    }
}
