const express = require('express');
const router = express.Router();
const { products } = require('../data/productos');
const ProductsHandler = require('../models/products/productsApi');
const productsList = new ProductsHandler(products);

router.get('/', (req, res) => {
    const products = productsList.getAll();
    res.json({ success: true, result: products });
})

router.get('/:id', (req, res) => {
    const id = +req.params.id
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Debe ingresar un numero' });
    }
    foundedProduct = productsList.getById(id);
    return res.json(
        foundedProduct ?
            { success: true, result: foundedProduct }
            :
            { error: `No se encuentra el producto con id: ${id}` }
    );
});

router.post('/', (req, res) => {
    const product = {
        title,
        price,
        thumbnail
    } = req.body;
    if (isNaN(price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    } else {
        product.price = +price;
        productAdded = productsList.addProduct(product);
        return res.json({ success: true, result: productAdded });
    }

})
router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const {
        title,
        price,
        thumbnail
    } = req.body;
    if (isNaN(price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (isNaN(id)) { return res.status(400).json({ error: 'Debe ingresar un numero' }); };
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    } else {
        isUpdatedProduct = productsList.updateProduct(title, +price, thumbnail, id);
        const { success, result, error, status } = isUpdatedProduct;
        if (success) {
            return res.json({ success, result });
        } else {
            return res.status(status).json({ success, error });
        }
    }

})

router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'Debe ingresar un numero' }); };
    const isDeletedProduct = productsList.deleteProdById(id);
    const { success, result, error, status } = isDeletedProduct;
    if (success) {
        return res.json({ success, result });
    } else {
        return res.status(status).json({ success, error });
    }
})

module.exports = router;