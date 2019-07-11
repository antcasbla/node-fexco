//=========================
//        PORT
//=========================
process.env.PORT = process.env.PORT || 3000;


//=========================
//        ENVIRONMENT
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=========================
//        DATABASE
//=========================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/air-traffic';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;