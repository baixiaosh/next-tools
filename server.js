const Koa = require('koa');
const next = require('next');
const json = require('koa-json');
const Router = require('koa-router');
const Sequelize = require('sequelize');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sequelize = new Sequelize('NEXT-Tool', 'admin', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    }
});

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('/api', async ctx => {
        console.log(ctx.query);
        let users = await User.findAll();
        ctx.body = users;
    });

    router.post('/api/:id', async ctx => {
        let user = await User.findOne({
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
