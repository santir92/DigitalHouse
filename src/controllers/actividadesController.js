const fs = require('fs');
const path = require('path');

//esta variable nos muestra donde se encuntra la data de los productos
//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//esta variable hace que se pueda leer el archivo json
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {


create: (req, res) => {
    res.render('form-crear-actividad')
},
/*store: (req, res) => {
    let datos = req.body;

    let idNuevoProducto = (products[products.length-1].id)+1;
	let imagenNuevoProducto = 'qqqqq.jpg';

	let nuevoProducto ={
		"id": idNuevoProducto,
		"nombre": datos.nombre,
		"precio": parseInt(datos.precio),
		"calorias": parseInt(datos.calorias),
		"categoria": datos.categoria,
		"descripcion": datos.descripcion,
		"image": imagenNuevoProducto
	};

    //los valores que tomamos del formulario lo enviamos a products para guardarlo de manera logica
    products.push(nuevoProducto);
    // y aca lo guardamos de manera fisica
	fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');
    // una vez agregado el producto volvemos a una vista en este caso el home
	res.redirect('/');
},*/

update: (req, res) => {
	res.render('form-actualizar-actividad')
}

}
module.exports = controller;