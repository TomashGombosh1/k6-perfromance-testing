import { config } from 'dotenv';

export const getUsers = () => {
    config();
    return process.env.USERS === undefined 
    ? 100 : process.env.USERS;
};

export const getDuration = () => {
    config();
    return process.env.DURATION === undefined 
        ? 30 : process.env.DURATION;
};

export const getBaseUrl = () => {
    config();
    return process.env.URL === undefined 
        ? "https://rc.qatestlab.com/" : process.env.URL;
}