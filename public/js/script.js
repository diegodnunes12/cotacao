

const cotacoesForm = document.querySelector('form')
const h3 = document.querySelector('h3')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')
const p4 = document.querySelector('#p4')

cotacoesForm.addEventListener('submit', (event) => {
    event.preventDefault()

    h3.innerText = 'Buscando...' 

    const ativo = document.querySelector('input').value

    if(!ativo){
        h3.innerText = 'O ativo deve ser informado'
        return
    }

    fetch(`/cotacoes?ativo=${ativo}`).then( (res) => {
        res.json().then( (data) => {
            if(data.error){
                h3.innerText = `Alguma coisa deu errado`
                p1.innerText = `${data.error.message} | código ${data.error.code}`
            }
            else{
                h3.innerText = data.symbol
                p1.innerText = `Price Open: ${data.price_open}`
                p2.innerText = `Price: ${data.price}`
                p3.innerText = `Price High: ${data.day_high}`
                p4.innerText = `Price Low: ${data.day_low}`
            }
        })
    } )


    console.log('form')
})