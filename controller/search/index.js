exports.getSearchResult = (req,res) =>{
    let url = require('url');
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;


    res.send(query);
};