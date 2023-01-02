import Users from '../models/Users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const register = async (name:string, email: string, password: string) => {
    const hash = bcrypt.hashSync(password, 10);
    let hasUser = await Users.findOne({where:{email}});

    if(!hasUser){
        let newUser = await Users.create({name, email, password:hash})
        return newUser;
    }else{
        return new Error('E-mail já existe')
    }
    
}

const findByEmail = async (email: string) => {
    return await Users.findOne({where:{email}});
}

const findById = async (id:string) => {
    return await Users.findOne({where:{id}})
}

const matchPassword = (passTxt:string, hash:string) =>{
    return bcrypt.compareSync(passTxt, hash);
}

const genToken = async (data:object) => {
    return jwt.sign(data, process.env.SECRET_TOKEN as string, {expiresIn:'7d'});
}

export default {findByEmail, findById, matchPassword, genToken, register}