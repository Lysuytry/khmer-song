import express from 'express';
import logger from 'morgan';
import body from 'body-parser';
import 'dotenv/config';
import {fliterQuery} from './common/query';
import {sequelize} from './common/sequelize-connection';

const app = express();

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false}));

app.use((req, res, next) => {
    //bind query
    fliterQuery(req);
    //for response success
    res.success = (data, options, code = 200) => {
        return typeof data === 'object' ? res.status(code).json({data, options}) : res.status(code).json(data);;
    };
    //for response error
    res.fail = (message, code = 500) => {return res.status(code).json(message); };
    //parse to next
    next();

});

app.get('/', (req, res) => {
    console.log('hello from route 1');
    return res.json({something: 'sssss'});
});

export default app;
