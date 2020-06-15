const express = require('express')

// Configurando o express
const app = express()

// Informa que quando cair na rota informada o res apresenta ao cliente e req envia ao server
app.get('', (req, res) => {
    res.send('Hello Minha App')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

// Informa a porta que o servidor vai ouvir, no caso a padrão é 3000 e a função que será executada ao final
app.listen('3000', () => {
    console.log('Server is up')
})