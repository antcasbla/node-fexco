require('../../server/config/config');
const {When, Then} = require('cucumber');
const axios = require('axios');
const {After, Before} = require('cucumber');

let TrafficInfo = require('../../server/models/trafficInfo');
let jsonValues = require('../dummy/trafficInfos.json');

const rpc = axios.create({
    //baseURL: process.env.urlHost + ":" + process.env.port // I've also tried 'http://localhost:7076'
    baseURL: 'https://node-fexco.herokuapp.com',
    proxy: false
})

Before(function() {
    TrafficInfo.remove({});
    TrafficInfo.insertMany(jsonValues, function(err,result) {
        if (err) {
            console.log("ERROR: "+err)
        }
    });
});

When('it is required to DELETE the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does not exist', function (plane, travelDate, originAirport, destinationAirport) {
    this.plane = plane
    this.travelDate = travelDate
    this.originAirport = originAirport
    this.destinationAirport = destinationAirport

})
Then('an error for the deleting is sent {string}', function (expectedAnswer) {
    return rpc.delete('/delete-traffic-info', this.plane, this.originAirport, this.destinationAirport, this.travelDate);
})

After(function() {
    TrafficInfo.remove({});
});