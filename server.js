const serve = require('koa-static-server');
const Koa = require('koa');

const app = new Koa();

app.use(serve({ rootDir: 'dist' }));
app.listen(process.env.PORT || 3002);
