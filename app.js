
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));// apenas dados simples
app.use(bodyParser.json());//só recebe json

//Carrega as rotas
const indexRoute = require('./routes/index-route');

//Habilita o cors
app.use(function (req, res, next) {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, x-access-token');
    
    if (req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    
    next();
});

app.use("/", indexRoute);

//Quanto não encontrar rota
app.use((req, res, next) => {
    const err = new Error('Não encontrado');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

app.listen(3000, () =>{
    console.log("Operando na posta 3000");
})