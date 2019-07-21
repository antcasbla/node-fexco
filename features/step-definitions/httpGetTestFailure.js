require('../../server/config/config');
const {When, Then} = require('cucumber');
const {After, Before} = require('cucumber');
const axios = require('axios');

let TrafficInfo = require('../../server/models/trafficInfo');
let jsonValues = require('../dummy/trafficInfos.json');

const rpc = axios.create({
    baseURL: process.env.urlHost,
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

When('it is required to GET the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does not exist', function (plane, travelDate, originAirport, destinationAirport) {
    this.plane = plane
    this.travelDate = travelDate
    this.originAirport = originAirport
    this.destinationAirport = destinationAirport

})
Then('an error for the getting is sent {string}', function (expectedAnswer) {
    return rpc.get(`/get-traffic-info/${this.plane}/${this.originAirport}/${this.destinationAirport}/${this.travelDate}`);
})

After(function() {
    TrafficInfo.remove({});
});
