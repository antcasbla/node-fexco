const express = require("express");

const app = express();

const keyInfo = 'messages.info';

const keyIncident = 'messages.incident';

const amqp = require('amqplib/callback_api');

const format = require('date-format');

let TrafficInfo = require('../models/trafficInfo');

// Sending messages
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

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
}

function searchMessages(res, incident){
    TrafficInfo.find({travelDate: format('yyyy-MM-dd', new Date()), deleted: false, incident: incident}, 'plane, originAirport, destinationAirport, info, travelDate')
        .exec( (err, trafficInfos) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // Publisher AMQP
            trafficInfos.forEach((element) => {
                sendTrafficInfoMessage(element)
            });

            TrafficInfo.count({estado: true}, (err, countTrafficInfos) => {
                res.json({
                    ok: true,
                    send: countTrafficInfos
                });
            });


        });
}
//======================
//  send-info-messages
//======================
app.post("/send-info-messages", (req, res) => {
    //searchMessages(res,false)

    TrafficInfo.find({travelDate: format('yyyy-MM-dd', new Date()), deleted: false, incident: false}, 'plane, originAirport, destinationAirport, info, travelDate')
        .exec( (err, trafficInfos) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // Publisher AMQP
/**            trafficInfos.forEach((element) => {
                sendTrafficInfoMessage(element)
            });
*/
           // res.json({trafficInfos})

            sendTrafficInfoMessage(trafficInfos[0])

            TrafficInfo.countDocuments({travelDate: format('yyyy-MM-dd', new Date()), deleted: false, incident: false}, (err, countTrafficInfos) => {
                res.json({
                    ok: true,
                    send: countTrafficInfos
                });
            });


        });
});

//======================
//send-incident-messages
//======================
app.post("/send-incident-messages", (req, res) => {
    searchMessages(res,true)
});


module.exports = app;