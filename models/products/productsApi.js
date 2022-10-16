class ProductsApi {
    constructor(array) {
        this.productList = array;
    }
    getAll() {
        return this.productList;
    }
    getById(id) {
        return this.productList.find(e => e.id === id);
    }

    addProduct(product) {
        if (!this.productList.length) {
            product.id = 1;
        } else {
            product.id = this.productList.at(-1).id + 1;
        }
        this.productList.push(product);
        return product;
    }
    updateProduct(title, price, thumbnail, id) {
        const index = this.productList.findIndex((product) => product.id === id);
        if (index < 0) {
            return { success: false, status: 404, error: `El producto con el id: ${id} no existe` };
        } else {
            const newProduct = {
                ...this.productList[index],
                title,
                price,
                thumbnail
            }
            this.productList[index] = newProduct;
            return { success: true, result: newProduct };
        }
    }
    deleteProdById(id) {
        const index = this.productList.findIndex((product) => product.id === id);
        if (index < 0) {
            return { success: false, status: 404, error: `El producto con el id: ${id} no existe` };
        } else {
            this.productList = this.productList.filter((product) => product.id !== id);
            return {
                success: true, result: `El producto con el id: ${id} fue eliminado correctamente`
            };
        }
    }
};

module.exports = ProductsApi;