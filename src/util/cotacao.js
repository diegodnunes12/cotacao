const request = require('request')

const api_token = 'xOpTn9sbVQQnWzd2UP9tAwY0I5QZhPDqw9HofdP3e8n3Vv08SiQ96CuGdjLa'

const cotacao = (symbol, callback) => {   

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({url: url, json: true}, (err, response) => {
        if(err){
            callback({
                message : `Something went wrong ${err}`,
                code : 500
            }, undefined)
           
        }
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                message : `No data found`,
                code : 404
            }, undefined)
        }else{
            const parseJson = response.body.data[0]

            const {symbol, price_open, price, day_high, day_low} = parseJson

            callback(undefined, {symbol, price_open, price, day_high, day_low})     
        }   
    })
}

module.exports = cotacao