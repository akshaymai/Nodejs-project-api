

var request = require('request');
request('https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=77292d75f7ec46b28d93a34af4779738', function (error, response, body) {
 const data=JSON.parse(body)
  
  const datas= data.articles
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
  
    // dbo.collection("TodayNews").insertMany(datas, function(err, res) {
    //   if (err) throw err;
    //   console.log("Data inserted sucessfully",res.insertedCount)
    //   db.close();
    // });
 
    var myquery = { _id: "5e1f0c0f7fdda00f2c4d10ad" };
    var newvalues = { $set: { author: "Akshay Maity"} };
  dbo.collection("TodayNews").updateOne(myquery,newvalues,function (err,res){
  
    if(err) throw err;
    else
    console.log("data update sucessfully:");
db.close()

  })

})

});
 
 