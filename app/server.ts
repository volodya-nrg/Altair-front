import 'zone.js/dist/zone-node';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';

import {AppServerModule} from './src/main.server';
import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';
import {environment} from './src/environments/environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/app/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
    const httpProxy = require('http-proxy');

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', ngExpressEngine({
        bootstrap: AppServerModule,
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);
    server.set('strict routing', true);

    var router = express.Router();
    var apiProxy = httpProxy.createProxyServer();

    router.all('/api/**', (req, res) => {
        apiProxy.web(req, res, {target: environment.apiServer});
    });

    // Serve static files from /browser
    router.get('*.*', express.static(distFolder, {
        maxAge: '1y',
    }));
    router.get('\\S+\/$', function(req, res) {
        return res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length));
    });
    router.get('/', (req, res) => {
        res.redirect(301, '/main');
    });
    router.get(/^\/(main|login|register|cat|cat\/.+|info\/.+|ad\/[a-z0-9_-]+_\d+)$/, (req, res) => {
        res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
    });
    router.get('*', (req, res) => {
        res.sendFile(distFolder + '/' + indexHtml + '.html');
    });

    server.use(router);

    return server;
}

function run() {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
