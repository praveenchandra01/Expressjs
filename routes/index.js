const router = require('express').Router();
const apiKeyMiddleware = require('../middlewares/api_key');

// router.use(apiKeyMiddleware); //Router-level middleware
 
router.get('/',(req,res)=>{
    // res.send('<h1>Hello from express....</h1>');
    // res.sendFile(path.resolve(__dirname) + '/index.html');
    res.render('index',{
        title: 'My Home page',
        para: 'Sending data from backend to template engine'
    })
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'My About page',
        para: 'Sending data from backend to template engine'
    });
})

// router.get('/api/products',[Middleware_1, Middleware_2],(req,res)=>{  //we can pass multiple middleware like this
router.get('/middleware/api/products',apiKeyMiddleware,(req,res)=>{   //Individual Router-level middleware
    res.json([
    {
        id: '123',
        name: 'Chrome'
    },
    {
        id: '124',
        name: 'Firefox'
    } ])
})
// middleware/api/products?api_key=1234567

module.exports = router;