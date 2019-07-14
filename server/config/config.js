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

mongodb://<dbuser>:<dbpassword>@ds249137.mlab.com:49137/air-traffic

process.env.URLDB = urlDB;

//=========================
//        AMQP
//=========================
let urlAMQP;

if(process.env.NODE_ENV === 'dev'){
    urlAMQP = 'amqp://localhost';
}else{
    urlAMQP = process.env.AMQP_URI;
}

process.env.urlAMQP = urlAMQP;