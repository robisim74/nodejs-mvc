import express, { Application } from 'express';
import { engine } from 'express-handlebars';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

import { index } from './app.controller';

const app: Application = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const environment = process.env.NODE_ENV;
const port = process.env.PORT || 8080;
const nonce = crypto.randomBytes(16).toString('base64');

// Set the view engine to handlebars using html extension
app.engine('html', engine(
	{ extname: '.html', defaultLayout: undefined }
));
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, 'public')))
// Security
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			'connect-src': environment === 'production' ? ["'self'"] : ["'self'", "ws://localhost:3000"],
			'script-src': ["'self'", `'nonce-${nonce}'`]
		},
	})
);

/**
 * Primary app routes
 */
app.get('/', (req, res) => index(req, res, nonce));

app.listen(port, () => {
	console.info(`Server listening on http://localhost:${port}`);
});
