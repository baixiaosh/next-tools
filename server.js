const Koa = require('koa');
const next = require('next');
const json = require('koa-json');
const Router = require('koa-router');
const sequelize = require('./config/sequelize');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
        ctx.set('Cache-Control', 'no-store, must-revalidate');
        ctx.append('X-Powered-By', 'koa2');
        await next();
    });
    server.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });

    router.get('/api', async ctx => {
        let users = await sequelize.User.findAll();
        ctx.body = users;
    });

    router.post('/api/:id', async ctx => {
        let user = await sequelize.User.findOne({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = user;
    });

    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });
    server.use(json());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
