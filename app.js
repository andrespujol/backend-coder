const express = require ('express')
const app = express ()
const fs = require ('fs');
const path = require ('path')
const PORT = 8080
class Contenedor {

    constructor(file) {
        this.file = file
    }
    async read() {
        try {
            let data = await fs.promises.readFile("./" + this.file, "utf-8")
            return data

        } catch (error) {
            throw Error("Error al leer el archivo")
        }
    }
    async write(objeto, msg) {
        try {
            await fs.promises.writeFile("./" + this.file, JSON.stringify(objeto, null, 2))
            console.log(msg)
        } catch (error) {
            throw Error("Error al escribir en el archivo")
        }
    }
    async save(producto) {
        let newId = 1
        let objeto = {}

        let data = await this.read()
        let archivo = JSON.parse(data)

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
        let data = await this.read()
        let object = JSON.parse(data)

        let result = object.filter( producto => producto.id == num)
        return result
    }

    async getAll() {
        let data = await this.read()
        let object = JSON.parse(data)

        return object
    }

    async deleteById(num) {
        let data = await this.read()
        let object = JSON.parse(data)

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

}

let contenedor = new Contenedor("productos.json")
let visitas = 0
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
    const random = await contenedor.showRandom()
    res.send(random)
})

async function consultarDesafio() {
    const newProduct = {
        id: 5,
        title: "Pantalón",
        price: 2500,
        stock: 5,
        pictureUrl: "https://i.ibb.co/qp2R7wn/4.jpg",
        category: "Pantalón",
        description: "Pantalón negro"
    }

    await contenedor.save(newProduct)

    console.log(await contenedor.getById(2))

    console.log(await contenedor.getAll())
}
consultarDesafio() 

const server = app.listen(PORT, () => {
    console.log(`Corriendo en el servidor ${server.address().port}`);
})