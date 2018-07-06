import express from 'express';
import logger from 'morgan';
import body from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false}));

app.use((req, res, next) => {
    //1
    console.log('it is the first middleware that must go through before other');
    next();
});

app.get('/', (req, res) => {
    //2
    console.log('hello from route 1');
    return res.json({something: 'sssss'});
    // return ....
});

export default app;