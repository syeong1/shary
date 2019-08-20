const NAVER_CLIENT_ID     = 'yce4qlo07o'
const NAVER_CLIENT_SECRET = 'NhCdEtu13Zfr2MB9UreEnhRhPEWjEvFKMk4s5ull'
const request = require('request');

var map = {
    getMap: (req, res) => {
        const option = {
            query  : req.query.name,
            coordinate: req.query.coordinate
        }
        console.log('request query = ' + req.query.query);
        console.log('request coordinate = ' + req.query.coordinate);
        request.get({
            uri:'https://naveropenapi.apigw.ntruss.com/map-place/v1/search', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
            qs :option,
            headers:{
              'X-NCP-APIGW-API-KEY-ID':NAVER_CLIENT_ID,
              'X-NCP-APIGW-API-KEY':NAVER_CLIENT_SECRET
            }
          }, function(err, response, body) {
            console.log(body);
            res.send(body);
          });
    }
}

module.exports = map;


// routes.get('/map',(req, res, next) => {
//     const option = {
//         query  : req.query.name,
//         coordinate: req.query.coordinate
//     }
//     console.log('request query = ' + req.query.query);
//     console.log('request coordinate = ' + req.query.coordinate);
//     request.get({
//         uri:'https://naveropenapi.apigw.ntruss.com/map-place/v1/search', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
//         qs :option,
//         headers:{
//           'X-NCP-APIGW-API-KEY-ID':NAVER_CLIENT_ID,
//           'X-NCP-APIGW-API-KEY':NAVER_CLIENT_SECRET
//         }
//       }, function(err, response, body) {
//         console.log(body);
//         res.send(body);
//       });

// })