const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacao = require('./util/cotacao')

// Configurando o express
const app = express()

// Apresenta todas as opções do path
//console.log(path)
// Apresenta uma pasta especifica
//console.log(path.join(__dirname, '../public'))

// Recupera o caminho da pasta onde ficarão todos os arquivos estaticos
const publicDirectory = path.join(__dirname, '../public')
const pathView = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')


// Configurando o handlebars
app.set('view engine', 'hbs')

// Conteúdo necessário para o path views
app.set('views', pathView);

// Conteúdo necessário para o path partials
hbs.registerPartials(pathPartials)

// Informa ao node para usar os arquivos estaticos dentro de publicDirectory
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotacao',
        author: 'Diego Nunes'
    })
})


app.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre Nós',
        author: 'Diego Nunes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Diego Nunes'
    })
})

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({
            error : {
                message : 'O ativo deve ser informado como query parameter',
                code : 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacao(symbol, (err, body) => {
        if(err){

            return res.status(err.code).json({error : {
                message : 'Not Found',
                code : err.code
            }})
        }

        console.log(body)
        res.status(200).json(body)
    }) 
})

app.get('*', (req, res) => {
    //res.send('404')
    res.render('404', {
        title: '404',
        errorMesage: 'Página não encontrada'
    })
})

const port = process.env.port || 3000

// Informa a porta que o servidor vai ouvir, no caso a padrão é 3000 e a função que será executada ao final
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})