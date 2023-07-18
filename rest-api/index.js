let express=require('express'),
path=require('path'),
mongoose=require('mongoose'),
cors=require('cors'),
bodyParser=require('body-parser'),
mongoDb=require('./database/db');
const createError = require('http-errors');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("Database connected successfully!!")
},
error=>{
    console.log("Database error: "+error)
})

const bookRoute=require('./node-backend/routes/book.routes');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors({
    origin: 'http://localhost:4200' // Replace with your frontend URL
  }));
  const staticPath = path.join(__dirname, '.dist','bookshop');
  app.use(express.static(staticPath));

app.use('/api',bookRoute);

const port=process.env.port || 8000;
app.listen(port,()=>{
    console.log("Listening port is: "+port)
});
app.use((req,res,next)=>{
    next(createError(404));
});

app.get('/',(req,res)=>{
    res.send('invalid end point');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

app.use(function(err,req,res,next){
    console.log(err);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});