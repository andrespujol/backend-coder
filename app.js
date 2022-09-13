class Usuario {
    constructor (nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(string){
        this.mascotas.push(string)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro) {
        this.libros.push(libro)
    }
    getBookNames(){
        return this.libros.map(libro=>libro.nombre)
    }
}

let nuevoUsuario = new Usuario ('Andrés', 'Pujol')

nuevoUsuario.addMascota("Bernie")
nuevoUsuario.addMascota("Negro")
nuevoUsuario.addMascota("Firu")

nuevoUsuario.addBook({
    nombre: "Harry Potter",
    autor: "J. K. Rowling"
})
nuevoUsuario.addBook({
    nombre: "El señor de los anillos",
    autor: "J. R. R. Tolkien"
})

console.log(nuevoUsuario.getFullName())
console.log(nuevoUsuario.countMascotas())
console.log(nuevoUsuario.getBookNames())