require('../../server/config/config');
const {When, Then} = require('cucumber');
const axios = require('axios');
const {After, Before} = require('cucumber');

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

When('it is required to DELETE the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does not exist', function (plane, travelDate, originAirport, destinationAirport) {
    this.plane = plane
    this.travelDate = travelDate
    this.originAirport = originAirport
    this.destinationAirport = destinationAirport

})
Then('an error for the deleting is sent {string}', function (expectedAnswer) {
    var params = {plane: this.plane,
        originAirport: this.originAirport,
        destinationAirport: this.destinationAirport,
        travelDate: this.travelDate}
    return rpc.post('/delete-traffic-info', params);
})

After(function() {
    TrafficInfo.remove({});
});