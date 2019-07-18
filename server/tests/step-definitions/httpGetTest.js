//const expect = require('chai').expect;

module.exports = function() {

    this.Given(/^a plane "([^"]*)" which is stored at "([^"]*)" coming from "([^"]*)" and going to "([^"]*)"$/, function (plane, travelDate, originAirport, destinationAirport) {
        return 0;
    })
    this.When(/^it is required to GET the traffic info and the traffic info does exist$/, function () {
        console.log("expression is ", expression)
        return 0;

    })
    this.Then(/^traffic info is sent$/, function (res) {
        console.log("expression is ", expression)
        return 0;

    })
}