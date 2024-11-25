const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "../front-end")));

const products = [
    { id: 1, name: "Laptop Gamer", price: 1500.99, description: "Potente laptop para gaming", category: "Electrónica" },
    { id: 2, name: "Audífonos Bluetooth", price: 50.99, description: "Alta calidad de sonido", category: "Accesorios" },
    { id: 3, name: "Teclado Mecánico", price: 75.49, description: "Teclado RGB con switches azules", category: "Electrónica" },
    { id: 4, name: "Mouse Gamer", price: 25.99, description: "Ergonómico y preciso", category: "Accesorios" },
    { id: 5, name: "Silla Gamer", price: 250.99, description: "Cómoda y resistente", category: "Muebles" },
    { id: 6, name: "Monitor Gamer", price: 400, description: 'Monitor de 27"', category: "Electrónica" },
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:category", (req, res) => {
   const category = req.params.category.toLowerCase();
   const filteredProducts = products.filter(
       product => product.category.toLowerCase() === category
   );
   res.json(filteredProducts);
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/");
});
