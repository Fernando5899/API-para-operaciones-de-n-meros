const express = require('express');
const app  = express();
const morgan = require('morgan');
const cors = require('cors'); 

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors()); // Importante para que el HTML pueda "hablar" con la API

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ "Title": "Hola Mundo esta es mi primera API" });
});

// Función auxiliar para validar números (incluyendo el 0)
const validarNumeros = (n1, n2) => {
    return (n1 !== undefined && n1 !== null && n1 !== '') && 
           (n2 !== undefined && n2 !== null && n2 !== '');
}

// 1. SUMAR
app.post('/sumar', (req, res) => {
    const {num1, num2} = req.body;
    if (!validarNumeros(num1, num2)) {
        return res.status(400).send({ error: 'Faltan números' });
    }
    const resultado = parseFloat(num1) + parseFloat(num2);
    res.json({ resultado: resultado }); // Siempre devolvemos "resultado"
});

// 2. RESTAR
app.post('/resta', (req, res) => {
    const {num1, num2} = req.body;
    if (!validarNumeros(num1, num2)) {
        return res.status(400).send({ error: "Faltan números" });
    }
    const resultado = parseFloat(num1) - parseFloat(num2);
    res.json({ resultado: resultado }); // Devolvemos "resultado" en lugar de "resta"
});

// 3. MULTIPLICAR
app.post('/multiplicacion', (req, res) => {
    const {num1, num2} = req.body;
    if (!validarNumeros(num1, num2)) {
        return res.status(400).send({ error: "Faltan números" });
    }
    const resultado = parseFloat(num1) * parseFloat(num2);
    res.json({ resultado: resultado });
});

// 4. DIVIDIR
app.post('/division', (req, res) => {
    const {num1, num2} = req.body;
    if (!validarNumeros(num1, num2)) {
        return res.status(400).send({ error: "Faltan números" });
    }
    if (parseFloat(num2) === 0) {
        return res.status(400).send({ error: "No se puede dividir entre cero" });
    }
    const resultado = parseFloat(num1) / parseFloat(num2);
    res.json({ resultado: resultado });
});

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});