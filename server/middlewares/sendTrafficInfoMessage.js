const express = require('express');

const _ = require('underscore');

var queue = 'infoMessages';

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

module.exports = {
    app,
    sendTrafficInfoMessage
};