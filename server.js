const Koa = require('koa');
const next = require('next');
const json = require('koa-json');
const cors = require('koa2-cors');
const Router = require('koa-router');

const sequelize = require('./model/sequelize');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(cors());
  server.use(json());
  server.use(async (ctx, next) => {
    ctx.set('Cache-Control', 'no-store, must-revalidate');
    ctx.set('X-Powered-By', 'duia');
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

  router.get('/case/:id', async ctx => {
    const { id } = ctx.params;
    ctx.res.statusCode = 200; //更改状态码
    await app.render(ctx.req, ctx.res, '/case', { id });
    ctx.respond = false;
  });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
