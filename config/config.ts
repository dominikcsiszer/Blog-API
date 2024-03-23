const dotenv = require('dotenv');
dotenv.config();

export interface IConfig {
    MONGODB_CONNECTION_URI: string;
    APP_NAME: string;
    PORT: number;
}

const CONFIG: IConfig = {
    MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,
    APP_NAME: "Blog API",
    PORT: parseInt(process.env.PORT ?? "3002"),
};

export default CONFIG;