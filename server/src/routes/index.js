const categoryRouter = require('./category.route');
const brandRouter = require('./brand.route');
const productRouter = require('./product.route');
const authRouter = require('./auth.route');
const cartRouter = require('./cart.route');
const orderRouter = require('./order.route');
const chatRouter = require('./chat.route');

function route(app) {

app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/chat', chatRouter);

}

module.exports = route;