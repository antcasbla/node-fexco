const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let permittedInfo = {
    values: ['On time', 'Delayed', 'Canceled'],
    message: '{VALUE} is not permitted'
}

let trafficInfoSchema = new Schema({
    plane: {type: String, required: [true, 'Plane is mandatory']},
    originAirport: {type: String, required: [true, 'Origin airport is mandatory']},
    destinationAirport: {type: String, required: [true, 'Destination airport is mandatory']},
    info: {type: String, default: 'On time', enum: permittedInfo},
    travelDate: {type: Date, required: [true, 'Travel date is mandatory']},
    // Soft delete, in order to delete the data only to the user's view
    deleted: {type: Boolean, required: false, default: false},
    incident: {type: Boolean, required: false, default: false}
});

module.exports = mongoose.model('TrafficInfo', trafficInfoSchema);