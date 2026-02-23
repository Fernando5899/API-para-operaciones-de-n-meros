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

// Función auxiliar para validar números
const validarNumeros = (n1, n2) => {
    return (n1 !== undefined && n1 !== null && n1 !== '') && 
           (n2 !== undefined && n2 !== null && n2 !== '');
}

const validarArea = (base, altura) => {
    return (base !== undefined && base !== null && base !== '') &&
           (altura !== undefined && altura !== null && altura !== '');
}

const validarDatos = (...valores) => {
    return valores.every(valor => valor !== undefined && valor !== null && valor !== '');
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

// Esto es para las areas de las figuras 
// Triangulo
app.post('/area-triangulo', (req, res) => {
    const {base, altura} = req.body;
    if (!validarArea(base, altura)) {
        return res.status(400).send({ error: "Faltan números"});
    }
    const resultado = (parseFloat(base) * parseFloat(altura)) / 2 ;
    res.json({ resultado:resultado });
});

// Cuadrado 
app.post('/area-cuadrado', (req, res) => {
    const {base, altura} = req.body;
    if (!validarArea(base, altura)) {
        return res.status(400).send({ error: "Faltan números"});
    }
    const resultado = parseFloat(base) * parseFloat(altura);
    res.json({ resultado:resultado });
});

// rectangulo
app.post('/area-rectangulo', (req, res) => {
    const {base, altura} = req.body;
    if (!validarArea(base, altura)) {
        return res.status(400).send({ error: "Faltan números"});
    }
    const resultado = (parseFloat(base) * parseFloat(altura)) / 2 ;
    res.json({ resultado:resultado });
});

// Circulo
app.post('/area-circulo', (req, res) => {
    const {radio} = req.body;

    if(!validarDatos(radio)) {
        return res.status(400).send({ error: 'Falta el radio del circulo'})
    }

    const resultado = Math.PI * Math.pow(parseFloat(radio), 2);

    res.json({ resultado: resultado})
});

//Esto es para el perimetro de las figuras 
// Triangulo
app.post('perimetro-triangulo', (req, res) => {
    const {lado1, lado2, lado3} = req.body;
    if(!validarDatos(lado1, lado2, lado3)) {
        return res.status(400).send({ error: 'Faltan lados del triangulo'})
    }
    const resultado = parseFloat(lado1) + parseFloat(lado2) + parseFloat(lado3);
    res.json({ resultado: resultado})
});

// Cuadrado
app.post('perimetro-cuadrado', (req, res) => {
    const {lado1} = req.body;
    if(!validarDatos(lado)) {
        return res.status(400).send({ error: 'Ingresa la longitud de un lado del cuadrado'})
    }
    const resultado = parseFloat(lado) * 4;
    res.json({ resultado: resultado})
});

// Rectangulo
app.post('perimetro-rectangulo', (req, res) => {
    const {base, altura} = req.body;
    if(!validarDatos(base, altura)) {
        return res.status(400).send({ error: 'Faltan datos para el calculo del perimetro'})
    }
    const resultado = (parseFloat(base) + parseFloat(altura)) * 2;
    res.json({ resultado: resultado})
});

// Circulo
app.post('/perimetro-circulo', (req, res) => {
    const { radio } = req.body;
    if (!validarDatos(radio)) {
        return res.status(400).send({ error: "Falta el radio del círculo" });
    }
    const resultado = 2 * Math.PI * parseFloat(radio);
    res.json({ resultado: resultado });
});

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});