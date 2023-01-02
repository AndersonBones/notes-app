import sequelize from '../instances/pg';
import User from '../models/Users'
import Notes from '../models/Notes'
import { NextFunction, Request, Response } from "express";


export const ConnectDB = async (req:Request, res:Response, next:NextFunction) => {
    try {
        await sequelize.authenticate();
        User.sync();
        Notes.sync();
        res.status(200)
        console.log('Connection has been established successfully.');
        next();
    } catch (error) {
        res.status(400).render('pages/error')
        console.error('Unable to connect to the database:', error);
    }
}