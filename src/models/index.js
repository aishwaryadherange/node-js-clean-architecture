import { Sequelize } from 'sequelize';
import userModel from './d_user.model.js';
import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

);

const modelDefiners = [userModel];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
if (process.env.NODE_ENV == 'uat' || process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'dev') {
    sequelize.sync({ alter: false });
}

export default sequelize;