const ErrorHandler = require("../Errors/ErrorHandler");

function apiKey(req,res,next){
    const api_key = "1234567";
    const user_apiKey = req.query.api_key;
    if(user_apiKey && user_apiKey===api_key){
        next();
    }else{
        // res.json({message:"Not allowed!"})
        next(ErrorHandler.forbiddenError('Api key is not valid!'));
    }
}
module.exports = apiKey;