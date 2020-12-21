const mongoose = require('mongoose');
require('dotenv').config();
const username=process.env.MongoDB_USERNAME;
const password=process.env.MongoDB_PASSWORD;
const database=process.env.MongoDB_DBNAME;

console.log(username+' '+password+' '+database);
const URI='mongodb+srv://'+username+':'+password+'@cluster0.bemvw.mongodb.net/<'+database+'>?retryWrites=true&w=majority';
connectMongoDB=()=>{

    return new Promise((resolve, reject)=>{
       mongoose.connect(URI, {useNewUrlParser: true, 
                            useCreateIndex: true, 
                          useUnifiedTopology: true, 
                          useFindAndModify: false}).then(()=>{
         resolve('Connected successfully');
       }).catch((err)=>{
         reject(err);
       })


    })

}
module.exports={
  connectMongoDB
}