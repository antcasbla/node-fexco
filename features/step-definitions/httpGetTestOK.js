const {Given, When, Then} = require('cucumber');
//var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
const axios = require('axios');

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
    When(/^it is required to GET the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does exist$/, function (plane, travelDate, originAirport, destinationAirport) {
        this.plane = plane
        this.travelDate = travelDate
        this.originAirport = originAirport
        this.destinationAirport = destinationAirport

    })
    Then(/^traffic info is sent {string}$/, function () {
        return this.actualAnswer = axios
            .get(`/get-traffic-info/${this.plane}/${this.originAirport}/${this.destinationAirport}/${this.travelDate}`);

    })