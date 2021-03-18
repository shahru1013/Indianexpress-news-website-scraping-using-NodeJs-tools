const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
const express_obj = express();
const port = process.env.PORT || 4000;
express_obj.listen(port,console.log(`start at ${port}`));
express_obj.use(cors());
express_obj.get('/data',(req,res)=>{
    sendData(res);
});
function sendData(res){
    let newsBody = [],newsLink=[],imageLink = [];
    request('https://indianexpress.com/',(error,response,html)=>{
        if(!error){
            giveit(html,newsBody,newsLink,imageLink,res);
        }
     });
}

function giveit(htm,newsBody,newsLink,imageLink,res){
    const $ = cheerio.load(htm);
    const divn = $('.other-article .story-image');
    let image =  divn.find('img');
    let link =  divn.find('a');
    image.each((index,element)=>{
        newsBody.push($(element).attr('alt'));
        newsLink.push($(link[index]).attr('href'));
        imageLink.push("https://"+$(element).attr('src'));
        if(index === image.length-1){
            let data = {
                newsBody,
                newsLink,
                imageLink
            }
            res.send(data);
        }
   })
}
