/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: ____Meetpal Singh____________ Student ID: __125926212_ Date: _2023/2/3_________
*
* Cyclic Web App URL: _______________https://inquisitive-battledress-pig.cyclic.app/
*
* GitHub Repository URL: _________https://github.com/meetpal0001/web322-app.git
*
********************************************************************************/


var express = require("express");
var path = require("path");
var blog=require("./blog-service");

var app = express();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.redirect("/about");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });

  app.get("/blog", function(req,res){
    blog.getPublishedPosts().then(function(posts){
    res.json(posts);
    })
    .catch(function(err){
    res.json({"message":err});
    });
  });

  app.get("/posts", function(req,res){
    blog.getAllPosts().then(function(posts){
        res.json(posts);
        })
        .catch(function(err){
        res.json({"message":err});
        });
  });

  app.get("/categories", function(req,res){
    blog.getCategories().then(function(categories){
        res.json(categories);
        })
        .catch(function(err){
        res.json({"message":err});
        });
  });


  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

// setup http server to listen on HTTP_PORT

blog.initialize().then(function(){
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(reason){
    console.log(reason);
});