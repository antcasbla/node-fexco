const express = require('express');

const _ = require('underscore');

const keyInfo = 'messages.info';

const keyIncident = 'messages.incident';

const amqp = require('amqplib/callback_api');

let app = express();

let TrafficInfo = require('../models/trafficInfo');

// Sending messages
async function sendTrafficInfoMessage(trafficInfo) {
    amqp.connect(process.env.urlAMQP, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var key = trafficInfo.incident ? keyIncident : keyInfo;
            var exchange = 'topic_logs';

            channel.assertExchange(exchange, 'topic', {
                durable: false
            });
            var msg;
            if(trafficInfo.incident) {
                msg = "WARNING : plane: " + trafficInfo.plane + ", origin airport: " + trafficInfo.originAirport + ", destination airport: " + trafficInfo.destinationAirport + ", travel date: " + trafficInfo.travelDate + ", info: "+trafficInfo.info;
            }else{
                msg = "plane: " + trafficInfo.plane + ", origin airport: " + trafficInfo.originAirport + ", destination airport: " + trafficInfo.destinationAirport + ", travel date: " + trafficInfo.travelDate + ", info: "+trafficInfo.info;
            }
            channel.publish(exchange, key, Buffer.from(msg));
            console.log(" [x] Sent %s: '%s'", key, msg.toString());
        });

    });
}

//I have done calls to database directly from Controller because of the way things are done in Node.js

//======================
//   get-traffic-info
//======================
app.get('/get-traffic-info/:plane/:originAirport/:destinationAirport/:travelDate', (req, res) =>{

    let plane = req.params.plane;
    let originAirport = req.params.originAirport;
    let destinationAirport = req.params.destinationAirport;
    let travelDate = req.params.travelDate;

    TrafficInfo.findOne({plane, originAirport, destinationAirport, travelDate, deleted: false}, 'plane originAirport destinationAirport travelDate info')
        .exec((err, trafficInfo) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            //If trafficInfo does not exist
            if(!trafficInfo){
                return res.status(400).json({
                    ok: false,
                    err : {
                        message: 'TrafficInfo not found',
                    }
                });
            }

            res.json({
                ok: true,
                trafficInfo
            });

        });
});

//======================
//   post-traffic-info
//======================

app.post('/post-traffic-info', (req, res) => {

    let body = req.body;

    let trafficInfo = new TrafficInfo({
        plane: body.plane,
        originAirport: body.originAirport,
        destinationAirport: body.destinationAirport,
        info: body.info,
        incident: body.incident
    });

    TrafficInfo.findOne({plane: trafficInfo.plane, originAirport: trafficInfo.originAirport, destinationAirport: trafficInfo.destinationAirport, travelDate: trafficInfo.travelDate, deleted: false})
        .exec((err, trafficInfoDB) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            //If trafficInfo does already exist
            if(trafficInfoDB){
                return res.status(400).json({
                    ok: false,
                    err : {
                        message: 'TrafficInfo already created',
                    }
                });
            } else {
                trafficInfo.save((err, trafficInfoDB) => {

                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }

                    // Publisher AMQP
                    sendTrafficInfoMessage(trafficInfoDB).then(res.json({ok: true, trafficInfo: trafficInfoDB}), console.error)

            });
            }
    });
});

//======================
//   put-traffic-info
//======================

// Only info and incident can be modified

app.put('/put-traffic-info', (req, res) => {

    let body = _.pick(req.body, ['plane', 'originAirport', 'destinationAirport', 'travelDate', 'info', 'incident']);

    //{new: true} it returns updated object
    //runValidators: true to make validations defined in the model
    TrafficInfo.findOneAndUpdate({plane: body.plane, originAirport: body.originAirport, destinationAirport: body.destinationAirport, travelDate: body.travelDate, deleted: false},
        body,
        {new: true, runValidators: true},
        (err, trafficInfoDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //If trafficInfo does not exist
        if(!trafficInfoDB){
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'TrafficInfo not found'
                }
            });
        }

        // Publisher AMQP
        sendTrafficInfoMessage(trafficInfoDB).then(res.json({ok: true, trafficInfo: trafficInfoDB}), console.error)

    });

})

//======================
//  delete-traffic-info
//======================
app.delete('/delete-traffic-info', (req, res) => {

    let body = _.pick(req.body, ['plane', 'originAirport', 'destinationAirport', 'travelDate']);
    body.deleted = true;

    //{new: true} it returns updated object
    //runValidators: true to make validations defined in the model
    TrafficInfo.findOneAndUpdate({plane: body.plane, originAirport: body.originAirport, destinationAirport: body.destinationAirport, travelDate: body.travelDate, deleted: false},
        body,
        {new: true, runValidators: true},
        (err, trafficInfoBD) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //If trafficInfo does not exist
            if(!trafficInfoBD){
                return res.status(400).json({
                    ok: false,
                    err : {
                        message: 'TrafficInfo not found'
                    }
                });
            }

            res.json({
                ok: true,
                trafficInfo: trafficInfoBD
            });
        });
})

module.exports = app;