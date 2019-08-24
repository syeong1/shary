var Tv = require('../models/tv');
var config = require('../config/config')
var request = require("request");

exports.getTvData = (req, res) => {

    console.log(req.params.title)


    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/tv',
        qs:
        {
            language: 'ko-kr',
            api_key: config.apikey,
            query: req.params.title
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        return res.status(200).send(body);
    });

}