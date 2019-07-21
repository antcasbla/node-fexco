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

When('it is required to CREATE its new traffic info of a plane {string} which come from {string} and go to {string} with {string} and the traffic info does not exist', function (plane, originAirport, destinationAirport, info) {
    this.plane = plane
    this.originAirport = originAirport
    this.destinationAirport = destinationAirport
    this.info = info

})
Then('traffic info is created {string}', function (expectedAnswer) {
    var params = {plane: this.plane,
        originAirport: this.originAirport,
        destinationAirport: this.destinationAirport,
        info: this.info}
    return rpc.post('/post-traffic-info', params);
})

After(function() {
    TrafficInfo.remove({});
});
