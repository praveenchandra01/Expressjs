const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index.js')
const productRouter = require('./routes/product_apis.js')
const apiKeyMiddleware = require('./middlewares/api_key');
const ErrorHandler = require('./Errors/ErrorHandler.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); //For serving static files

app.use(express.json()) // for reciveing json data (AJAX req)
// app.use(express.urlencoded({extended:false})) // for reciveing data from Std. FORM (action,method) 

app.set('view engine','ejs');
// console.log(app.get('view engine')); //gives view engine
// app.set('views',path.resolve((__dirname) +'/templates'));
// console.log(app.get('views')); // gives path of views folder

app.use(productRouter);
app.use(mainRouter);
// app.use('/prefix',mainRouter);

// app.use(apiKeyMiddleware);  //Application-level middleware (global scope)

// Cutsom ErrorHandling middlware
app.use((req,res,next) => {
    res.json({message:'page not found! '})
});

// Express ErrorHandler middleware
app.use((err,req,res,next)=>{
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
    else{
        res.status(500).json({
            error: { 
                message: err.message,
                status: err.status 
            }
        })
    }
    // res.status(422).send(err.message)
    // next();
})

// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello from express....</h1>');
//     // res.sendFile(path.resolve(__dirname) + '/index.html');
//     res.render('index',{
//         title: 'My Home page',
//         para: 'Sending data from backend to template engine'
//     })
// })

app.get('/download',(req,res)=>{
    // res.download(path.resolve(__dirname) + '/about.html');
})

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));