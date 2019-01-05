const express = require('express')
const hbs = require('hbs')
const fs  = require('fs')

const app = express()

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine','hbs')

// creating server log via middleware
// app.use((req, res, next)=>{
    //     const log = `${Date().toString()}: ${req.method} ${req.url}`
    //     console.log(log)
    //     fs.appendFile('server.log',log + '\n',(err)=>{
        //         if(err){
            //             console.log('Found error:',err)
            //         }
            //     })
            //     next()
            // })
            
app.use((req, res, next)=>{
    res.render('maintenance.hbs')
    // next()
})

//this must be moved under the maintenance middleware, otherwise user can still see the static
app.use(express.static(__dirname + '/public'))
            
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase()
})

//setting handlers
app.get('/', (req, res)=>{
    // res.send('<h1>hello express</h1>')
    // res.send({
    //     name:'budi',
    //     likes: ['beach', 'guitar', 'ukulele']
    // })
    res.render('home.hbs',{
        pageTitle: 'Home',
        welcomeMsg: 'Welcome to my homepage' 
    })

})



app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About',
    })
})




app.get('/bad', (req, res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    })
})

app.get('/*', (req, res)=>{
    res.send('nothing here. go back!!!')
})

//listening to port
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})