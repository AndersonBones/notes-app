import {Sequelize} from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL as string,{dialect:'postgres'}) // Example for postgres

export default sequelize