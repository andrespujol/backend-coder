const express = require('express');
const apiRoutes = require('./routers/index');
const PORT = process.env.PORT || 8080;

const { ProductsApi } = require('./models/index');
const { products } = require('./data/data');
const productsApi = new ProductsApi([]);

const { engine } = require('express-handlebars');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views/hbs');
app.get('/productos', (req, res) => {
    productsData = productsApi.getAll();
    res.render('body', {
        products: productsData
    });
});

app.post('/productos', (req, res) => {
    const product = { title, thumbnail, price } = req.body;
    if (isNaN(product.price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    }
    const productAdded = productsApi.addProduct({ ...product, price: +price })
    res.redirect('/')
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})

