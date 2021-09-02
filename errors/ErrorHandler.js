class ErrorHandler {
    constructor(status, message){
        this.status = status;
        this.message = message; 
    }

//We use static methods bcoz there is not need to create class object for calling static method
    static validationError(message='All fields are required!') {  
        return new ErrorHandler(422,message)
    }

    static notFoundError(message='Not Found!') {  
        return new ErrorHandler(404,message)
    }

    static serverError(message='Internal error') {  
        return new ErrorHandler(500,message)
    }
    static forbiddenError(message='Not Allowed!') {  
        return new ErrorHandler(403,message)
    }

}

module.exports = ErrorHandler;