import express,{ErrorRequestHandler} from 'express'
import { ConnectDB } from './middlewares/DBconnection';
import path from 'path' 
import { NextFunction, Request, Response } from "express";
import routes from './routes/index'
import cookieParser from 'cookie-parser';
import passport from 'passport'

const app = express();

app.use(cookieParser()) // set cookies

app.use(passport.initialize()); // middleware 

// set static files
app.use(express.static(path.join(__dirname, '../public')));

// set template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(routes)

app.use((Request, Response)=>{
    Response.status(404).render('pages/error')
})

const errorHandler:ErrorRequestHandler = (err, req, res, next)=>{
    if(err.status){
        res.status(err.status);
    }else{
        res.status(400)
    }

    if(err.message){
        res.json({error:err.message})
    }
    if(err){
        res.status(401).redirect('/login')
    }
}

app.use(errorHandler);

app.listen(process.env.PORT || 3333)