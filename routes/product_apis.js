const router = require('express').Router();
const ErrorHandler = require('../Errors/ErrorHandler');
const apiKey = require('../middlewares/api_key');
let products = require('../productData');


router.get('/products',(req,res)=>{
    res.render('product',{
        title: 'My Product page'
    })
})


//Get All Product details
router.get('/api/products',(req,res)=>{
    res.json(products);
})


//Get Single Product details
router.get('/api/products/:productId',(req,res)=>{
    const singleItem = products.find((product)=> req.params.productId === product.id)
    res.json(singleItem)
})


// Post request handle
// router.post('/api/products',apiKey,(req,res,next)=>{
router.post('/api/products',(req,res,next)=>{
    // try{
    //     console.log(city);
    // }catch(err){
    //     next(ErrorHandler.serverError(err.message));
    // }

    const {name, price,} = req.body;
    if(!name || !price){
        next(ErrorHandler.validationError('Name and price feilds are required!'));
        // throw new Error('All fields are required');
        // return res.status(422).json({error: 'All Fields are required.'})
        return
    }
    const product = {
        id : (products.length+1).toString(),
        name,
        price
    } 
    products.push(product)
    res.json(product);
})


// Update Product PUT reqest handle
router.put('/api/products/:productId',(req,res)=>{
    const {name, price} = req.body;
    if(!name || !price){
        return res.status(422).json({error: 'All Fields are required.'})
    }
    const updatedProduct= {
         id : req.params.productId,
         name,
         price  
    }
    let index = products.findIndex((product)=>{ return product.id === req.params.productId})
    if(index>=0){
        products[index] = updatedProduct;
        res.json(products)
    }
    else {
    res.status(404)
    }
})


// Delete request Handle
router.delete('/api/products/:productId',(req,res)=>{
    products = products.filter((product)=> req.params.productId !== product.id)
    res.json(products)
    
})

module.exports = router;