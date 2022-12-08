const categoryRouter = require('./category.route');
const brandRouter = require('./brand.route');
const productRouter = require('./product.route');

function route(app) {

app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

}

module.exports = route;