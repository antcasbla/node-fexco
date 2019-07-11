const mongoose = require('mongoose');
const format = require('date-format');

let Schema = mongoose.Schema;

let permittedInfo = {
    values: ['On time', 'Delayed', 'Cancelled'],
    message: '{VALUE} is not permitted'
}

let trafficInfoSchema = new Schema({
    plane: {type: String, required: [true, 'Plane is mandatory']},
    originAirport: {type: String, required: [true, 'Origin airport is mandatory']},
    destinationAirport: {type: String, required: [true, 'Destination airport is mandatory']},
    info: {type: String, default: 'On time', enum: permittedInfo},
    travelDate: {type: String, default: format('yyyy-MM-dd', new Date()), required: [true, 'Travel date is mandatory']},
    // Soft delete, in order to delete the data only to the user's view
    deleted: {type: Boolean, required: false, default: false},
    incident: {type: Boolean, required: false, default: false}
});

// Removing 'deleted' field from JSON to show
trafficInfoSchema.methods.toJSON = function(){

    let trafficInfo = this;
    let trafficInfoObject = trafficInfo.toObject();
    delete trafficInfoObject.deleted;

    return trafficInfoObject;
}

module.exports = mongoose.model('trafficInfo', trafficInfoSchema);