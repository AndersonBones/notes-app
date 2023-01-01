import sequelize from '../instances/pg';
import { Model, DataTypes } from 'sequelize';

export interface UserInstance extends Model {
    id:number,
    name:string,
    email:string,
    password:string
}

const users = sequelize.define<UserInstance>('users', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{timestamps:false}
)


export default users;