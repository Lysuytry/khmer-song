import express from 'express';
import routeProduction from './production/production.route';

const admin = express();

admin.use('/productions', routeProduction);

export default admin;
