require('../../server/config/config');
const {Given, When, Then} = require('cucumber');
//var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
const axios = require('axios');

const rpc = axios.create({
    //baseURL: process.env.urlHost + ":" + process.env.port // I've also tried 'http://localhost:7076'
    baseURL: 'https://node-fexco.herokuapp.com',
    proxy: false
})

/**getTrafficInfo(plane, originAirport, destinationAirport, travelDate){
    return axios
        .get(`/get-traffic-info/${plane}/${originAirport}/${destinationAirport}/${travelDate}`)
        .then(res => res.data)
        .catch(error => console.log(error));
}*/

var mongoose = require('mongoose');
//require('sinon-mongoose');

//Importing our TrafficInfo model for our unit testing.
let TrafficInfo = require('../../server/models/trafficInfo');

let HttpController = require('../../server/controllers/httpController');

/*var options = {
    host : 'http://localhost:3000',
    path:  `/get-traffic-info/${this.plane}/${this.originAirport}/${this.destinationAirport}/${this.travelDate}`,
    json: true,
    headers: {
        "content-type": "application/json",
        "accept": "application/json"
    },
}*/


    // Test will pass if we fail to get a TrafficInfo
    /*it("should return error", function(done){
        var TrafficInfoMock = sinon.mock(TrafficInfo);
        var expectedResult = "{ \"ok\": false, \"err\": {\"message\": \"TrafficInfo not found\"}";
        TrafficInfoMock.expects('find').yields(expectedResult, null);
        HttpController.get
        TrafficInfo.find(function (err, result) {
            TrafficInfoMock.verify();
            TrafficInfoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });*/
    /**Given(/^$/, function () {

    })*/
    When('it is required to GET the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does not exist', function (plane, travelDate, originAirport, destinationAirport) {
        this.plane = plane
        this.travelDate = travelDate
        this.originAirport = originAirport
        this.destinationAirport = destinationAirport

    })
    Then('an error is sent {string}', function (expectedAnswer) {
    //var call = process.env.urlHost+`http://localhost:3000/get-traffic-info/${this.plane}/${this.originAirport}/${this.destinationAirport}/${this.travelDate}`;
        return rpc.get(`/get-traffic-info/${this.plane}/${this.originAirport}/${this.destinationAirport}/${this.travelDate}`);

    })
