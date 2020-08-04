var path=require('path')
var express=require('express')
var hbs=require('hbs')
var geocode = require('./utils/geocode.js')
var forecast = require('./utils/forecast.js')
// console.log(__dirname)
// console.log(__filename)

var directorypath=path.join(__dirname,'../public')
var viewpath=path.join(__dirname,'/templates/views')
var partialpath=path.join(__dirname,'/templates/partial')
 //console.log(viewpath)
hbs.registerPartials(partialpath)

var app=express()
app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(directorypath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'Hitesh',
        degree:'B. Tech.'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Hittu',
        about:'I am hitesh and a newbie in the field of software development'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Hitesh Jangir',
        std:'Mnit Jaipur',
        helptext:'I will we happy to help you'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        msg:'HELP PAGE NOT FOUND'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('<h1>Help Page</h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({error:'Please input an address'})
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => 
    {
        if (error) {
            return res.send(error)
        }

        forecast(longitude,latitude, (error, { temperature, feelslike }) => {
            if (error) {
                return res.send(error)
            }
                
            return res.send({
                address:req.query.address,
                temperature:temperature,
                feelslike_temperature:feelslike
            })
        })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send('<h1>Pleasev provide a search</h1>')
    }
    res.send({
        products:['Tekken','Mario']
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        msg:'404:PAGE NOT FOUND!'
    })
})

app.listen(3000,()=>{
    console.log('Server is on at port 3000')
})



// geocode(address, (error, { latitude, longitude, location }) => {
//     if (error) {
//         return console.log(error)
//     }

//     forecast(latitude, longitude, (error, { temperature, feelslike }) => {
//         if (error) {
//             return console.log(error)
//         }

//         console.log(location)
//         console.log('Weather Data: The Temparetur is ' + temperature + ' Degrees but It feels like it is ' + feelslike + ' Degrees.')