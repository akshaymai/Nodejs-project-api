


var request = require('request');
request('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=77292d75f7ec46b28d93a34af4779738', function (error, response, body) {
 

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    const datas=[body.articles];
    dbo.collection("TodayNews").insertMany(datas, function(err, res) {
      if (err) throw err;
      console.log("Data inserted sucessfully",res.insertedCount)
      db.close();
    });
  });

});
 
 