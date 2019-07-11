const express = require('express');

//let {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

const _ = require('underscore');

let app = express();

let TrafficInfo = require('../models/trafficInfo');

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

    trafficInfo.save((err, trafficInfoDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            trafficInfo: trafficInfoDB
        })
    });
});

//======================
//   put-traffic-info
//======================

// Only info and incident can be modified

app.put('/put-traffic-info', (req, res) => {

    let body = _.pick(req.body, ['plane', 'originAirport', 'destinationAirport', 'travelDate', 'info', 'incident']);

    //TODO DATE

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