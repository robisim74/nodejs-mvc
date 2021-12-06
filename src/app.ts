import express, { Application } from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import { index } from './app.controller';

const app: Application = express();
const server = http.createServer(app);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the view engine to handlebars using html extension
app.engine('html', engine(
	{ extname: '.html', defaultLayout: undefined }
));
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, 'public')))

/**
 * Primary app routes
 */
app.get('/', index);

const PORT = 8080;
server.listen(PORT);

server.on('listening', () => {
	console.info('Listening on http://localhost:' + PORT);
});
