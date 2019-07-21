require('../../server/config/config');
const {When, Then} = require('cucumber');
const {After, Before} = require('cucumber');
const axios = require('axios');

let TrafficInfo = require('../../server/models/trafficInfo');
let jsonValues = require('../dummy/trafficInfos.json');

const rpc = axios.create({
    //baseURL: process.env.urlHost + ":" + process.env.port // I've also tried 'http://localhost:7076'
    baseURL: 'https://node-fexco.herokuapp.com',
    proxy: false,
    data: '../dummy/trafficInfos.json'
})

Before(function() {
    TrafficInfo.remove({});
    TrafficInfo.insertMany(jsonValues, function(err,result) {
        if (err) {
            console.log("ERROR: "+err)
        }
    });
});

When('it is required to CREATE its new traffic info of a plane {string} which come from {string} and go to {string} with {string} and the traffic info does exist', function (plane, originAirport, destinationAirport, info) {
    this.plane = plane
    this.originAirport = originAirport
    this.destinationAirport = destinationAirport
    this.info = info

})
Then('an error for the creating is sent {string}', function (expectedAnswer) {
    return rpc.post('/post-traffic-info', this.plane, this.originAirport, this.destinationAirport, this.info);
})

After(function() {
    TrafficInfo.remove({});
});
