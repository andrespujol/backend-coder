const express = require ('express')
const app = express ()
const fs = require ('fs');
const path = require ('path')
const PORT = 3000

let visitas = 0


class Contenedor {

    constructor(file) {
        this.file = file
    }
    show() {
        let products = fs.readFileSync("./" + this.file, 'utf-8')
        const data = (JSON.parse(products, null, 2))
        return data
    }
    showRandom() {
        let data = this.show()
        let random = Math.floor((Math.random() * 5) + 1); 
        let result = data.filter( producto => producto.id === random)
        return result
    }
    async save(producto) {
        let newId = 1
        let objeto = {}
        
        let data = await this.show()
        let archivo = JSON.parse(JSON.stringify(data))
        
        if(!data) {
            producto.id = newId
            objeto = [producto]
        } else {
            producto.id = archivo[archivo.length - 1].id + 1
            objeto = producto
        }
        archivo.push(objeto)
        
        await this.write(archivo, "Agregado!")
    }
    async getById(num) {
        let data = await this.show()
        let object = JSON.parse(JSON.stringify(data))
        console.log(object)
        let result = object.filter( producto => producto.id == num)
        console.log(result)
        
    }
    
    async getAll() {
        let data = await this.show()
        let object = JSON.parse(JSON.stringify(data))
        
        return object
    }
    
    async deleteById(num) {
        let data = await this.show()
        let object = JSON.parse(JSON.stringify(data))
        let producto = object.find( producto => producto.id == num)
        
        if(producto) {
            let index = object.indexOf(producto)
            console.log(index)
            object.splice(index, 1)
            await this.write(object, `producto con ID: ${num} eliminado`)
        } else {
            console.log(`no existe el producto con ID: ${num} `)
        }
    }
    
    async deleteAll() {
        let array = []
        await this.write(array, "Se eliminaron todos los productos")
    }
    async showRandom() {
    let data = await this.show()
    let object = JSON.parse(JSON.stringify(data))
    let random = Math.floor((Math.random() * 5) + 1); 
    let result = object.filter( producto => producto.id == random)
    return result
}
}
let container = new Contenedor('./productos.json')


app.get('/',(req, res) => {
    
    res.send('<h1>Desafío 3</h1>')
})
app.get('/visitas',(req, res) => {
    res.send(`La cantidad de visitas es ${++visitas}`)
})
app.get('/productos',(req, res) => {
    res.sendFile(path.resolve(__dirname, './productos.json'))
})
app.get('/productoRandom',async (req, res) => {
    const random = await container.showRandom()
    res.send(random)
})

async function consultarDesafio() {
    const newProduct = {
        id: 5,
        title: "campera",
        price: 8500,
        stock: 5,
        pictureUrl: "https://i.ibb.co/qp2R7wn/4.jpg",
        category: "Campera",
        description: "Campera negro"
    }

    await container.save(newProduct)
}

const server = app.listen(PORT, () => {
    console.log(`Corriendo en el servidor ${server.address().port}`);
})

module.exports = { Contenedor }