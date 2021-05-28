import express, { Application } from 'express';
import http from 'http';
import path from 'path';

import * as appController from './app.controller';

const app: Application = express();
const server = http.createServer(app);

// Set the view engine to hbs
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, 'public')))

/**
 * Primary app routes
 */
app.get("/", appController.index);

const PORT = 8080;
server.listen(PORT);

server.on('listening', () => {
	console.info('Listening on http://localhost:' + PORT);
});
