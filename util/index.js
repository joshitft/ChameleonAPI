const multer = require('multer'),
    AuthenticateResult = require('./../authenticate/Result'),
    path = require('path');


//This function will return you the date and time in the following format: YYYY:MM:DD:HH:MM:SS.
exports.getDateTime = () => {

    const date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

exports.Error = (erroString) =>{
    return new Error(erroString)
}

exports.sendResponse = (statusCode,msg,res) =>{
    /*
        use "err.message" for sending response
    */
    let result = new AuthenticateResult(statusCode, msg, null);
    res.status(statusCode).send(result);
}

exports.errorHandler = (statusCode,err,res) =>{
    //    use "err.message" for custom error handling

    let result = new AuthenticateResult(statusCode, null, err);
    res.status(statusCode).send(result);
}

function multerInit(){
    return multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, './public/images/uploads')
        },
        filename: (req, file, cb)=> {
            let fileArr = file.originalname.split('.');
            cb(null, fileArr[0] + '-' + Date.now() + path.extname(file.originalname))
        }
    });
};

exports.Multer = {
    upload : ()=>{
        storage = multerInit();
        return multer({storage : storage});
    }
}