const express = require('express');
const app  = express();
const morgan = require('morgan'); // Muestra las solicitudes
const cors = require('cors'); // Permite conexiones externas al servidor

// Configuración del sevidor en el puerto 3000
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2); // Habilitamos JSON

app.use(morgan('dev')); // Cargar morgan maneja errores
app.use(express.urlencoded({extended:false}));
app.use(express.json()); // Manejar el formato JSON
app.use(cors()); // Permitir conexiones externas

app.get('/', (req, res) => {
    res.json(
        {
            "Title": "Hola Mundo esta es mi primera API"
        }
    )
});

// Para poder sumar
app.post('/sumar', (req, res) => { // https://localhost:3000/sumar
    const {num1, num2} = req.body; // Se declaran los datos de entrada

    // Validar que se hayan enviado los números que no esten vacios
    if (!num1 || !num2) {
        return res.status(400).send({ error: 'Faltan números para sumar'})
    }

    // Sumar los números
    const resultado = num1 + num2;

    // Enviar el resultado al front

    res.send({ resultado });
});

// Para poder restar
app.post('/resta', (req, res) => {
    const {num1, num2} = req.body;

    // Validar que se hayan enviado los numeros que no esten vacios
    if (!num1 || !num2) {
        return res.status(400).send({ error: "Faltan números para restar" })
    }

    // Restar los dos numeros
    const resta = num1 - num2

    // Enviar los datos al front
    res.send({ resta })
});

// Para poder multiplicar
app.post('/multiplicacion', (req, res) => {
    const {num1, num2} = req.body;

    // Validar que se hayan enviado los numeros que no esten vacios 
    if(!num1 || !num2) {
        return res.status(400).send({ error: "Faltan números para multiplicar" })
    }

    // Multiplicar los dos numeros
    const multiplicacion = num1 * num2

    // Enviar los datos al front
    res.send({ multiplicacion })
});

// Para poder dividir
app.post('/division', (req, res) => {
    const {num1, num2} = app.body;

    // Validar que se hayan enviado los numeros que no esten vacios
    if(!num1 || !num2) {
        return res.status(400).send({ error: "Faltan numeros para dividir" })
    }

    // Validar que el segundo numero no sea cero porque no se puede dividir entre cero 
    if(num2 === 0) {
        return res.status(400).send({ error: "No se puede dividir entre cero" })
    }

    // Dividimos los dos numeros
    const division = num1 / num2

    // Enviar los datos al front
    res.send({ division })
});


app.listen(app.get('port'), () => {
    console.log("Servidor en puerto 3000")
});
