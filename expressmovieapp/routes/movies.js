var mongoose=require( 'mongoose' );
var path=require( 'path' );
var express = require('express');
var router = express.Router();
var mongoose=require( 'mongoose' );
mongoose.connect('mongodb://localhost/moviedb');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
            // we're connected!
           console.log("mongo is fine");
});
var mongoSchema = mongoose.Schema({
Title: String,
Year:String,
Rated:String,
Released:String,
Runtime:String,
Genre:String,
Director:String,
Writer:String,
Actors:String,
Plot:String,
Language:String,
Country:String,
Awards:String,
Images:String,
Metascore:String,
imdbRating:String,
imdbVotes:String,
imdbID:String,
Type:String,
Response:String
});
var movie_model= mongoose.model('movie_model', mongoSchema);

/* GET home page. */
router.get('/findAll',function(req,res){
 return movie_model.find(function (err, movie) {
   if (err) {
     return console.log(err);

   } else {
     return res.json(movie);
    //  console.log(__dirname + '/assign.html');
    //  return res.sendFile(path.join(__dirname + '/assign.html'));
   }
 });
 //res.send('movies found!!');
});
var status='false';
router.post('/add/Title/:title/Year/:year/Rated/:rated/Director/:director/Lead_Actor/:lead_actor/Lead_Actress/:lead_actress',function(req,res){
 var movie = new movie_model({
   Title: req.params['title'],
   Year: req.params['year'],
   Rated: req.params['rated'],
   Director:req.params['director'],
Lead_Actor:req.params['lead_actor'],
Lead_Actress:req.params['lead_actress']
   });
 console.log('print');
 movie.save(function (err) {
   if (err) {
     console.log(err);
   } else {
     status='true';
     console.log('done');
     }
     });
     res.send(movie);
 });
router.delete('/delete/_id/:id',function(req,res){
 var id=req.params['id'];
 movie_model.findById(id,function(err,movie){
 return movie.remove(function(err){
   if(err){
     return err;
     console.log("movie could not be deleted");
   }else{
     console.log('removed');
     return res.send('');
   }
 });
});
 res.send('movie with '+id+' delete successfully');
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/insert',function(req,res){
console.log(req.body);
var movie=new movie_model({
   //movie.Title:req.body.Title,
   Title:req.body.Title,
   Year:req.body.Year,
   Rated:req.body.Rated,
   Released:req.body.Released,
    Runtime:req.body.Runtime,
    Genre:req.body.Genre,
    Director:req.body.Director,
    Writer:req.body.Writer,
    Actors:req.body.Actors,
    Plot:req.body.Plot,
    Language:req.body.Language,
    Country:req.body.Country,
    Awards:req.body.Awards,
    Images:req.body.Images,
    Metascore:req.body.Metascore,
    imdbRating:req.body.imdbRating,
    imdbVotes:req.body.imdbVotes,
    imdbID:req.body.imdbID,
    Type:req.body.Type,
   Response:req.body.Response
});
console.log(movie);
 movie.save(function(err){
   if(err){
     return console.log(err);
   }
   else{
     console.log('inserted');
   }
})
 res.send(movie);
//  res.send('movies added successfully');
});
router.delete('/Delete/Title',function(req,res){
 var name=req.body.Title;
 console.log(name);
 movie_model.findById(name,function(err,movie){
 return movie.remove(function(err){
   if(err){
     return err;
     console.log("movie could not be deleted");
   }else{
     console.log('removed');
    //  return res.send('');
   }
 });
});
// res.send('movie with '+name+' delete successfully');
});
router.put(function(req, res) {
        movie_model.findById(req.body.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            movie.Title = 'Hello';
            movie.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Movie updated!' });
            });
        });
    })
module.exports = router;
