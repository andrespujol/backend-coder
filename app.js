const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require ('fs');
const path = require ('path')
const { Contenedor } = require ('./desafio')

let container = new Contenedor('./productos.json')

const productRandom = container.showRandom(2)


app.get('/',(req, res) => {
    
    res.send('<h1>Desafío 4</h1>')
})
app.get('/api/productos', async(req, res) => {
    const product = await container.show()
    res.send(product)
})
app.get('/api/productos/:id', async(req, res) => {
    const productId = await container.getById()
    console.log(productId)
    res.send(productId)
})
app.post('/productoRandom', async(req, res) => {
    const addProduct = await container.save()
    res.send(addProduct)
})
app.put('/api/productos/:id', async(req, res) => {
    const addProduct = await container.save()
    res.send(addProduct)
})
app.delete('/productoRandom', async(req, res) => {
    const deleteProduct = await container.deleteById()
    res.send(deleteProduct)
})


const connectedServer = app.listen (PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`)
});

connectedServer.on('error', (error) => {
    console.log(error.message)
});

