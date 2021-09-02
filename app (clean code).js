const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mainRouter = require('./routes/index.js')

app.use(express.static('public')); 

app.set('view engine','ejs');

app.use('en',mainRouter);

app.use(express.json())

app.get('/',(req,res)=>{
    // res.send('<h1>Hello from express....</h1>');
    // res.sendFile(path.resolve(__dirname) + '/index.html');
    res.render('index', {
        title: 'My Home page',
        para: 'Sending data from backend to template engine'
    })
})

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));