import sequelize from '../instances/pg';
import { Model, DataTypes } from 'sequelize';



export interface NotesInstance extends Model{
    note_id:number,
    content:string[]
}

const notes = sequelize.define<NotesInstance>('notes', {
    note_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    content:{
        type:DataTypes.ARRAY(DataTypes.TEXT),
    }
},
{timestamps:false}
)


export default notes


