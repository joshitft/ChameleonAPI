
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

exports.errorHandler = (err,req,res) =>{
    /*
        use "err.message" for custom error handling
    */
   let statusCode = 500;
    if(err.message == "content not found")
        {
            statusCode = 400;
            console.log(err.message)
        }
    else
        console.log(err);
    res.status(statusCode).send({success:false, data: false});
}