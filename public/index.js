const axios = require('axios');

module.exports = {
    getTrafficInfo(plane, originAirport, destinationAirport, travelDate){
        return axios
            .get(`/get-traffic-info/${plane}/${originAirport}/${destinationAirport}/${travelDate}`)
            .then(res => res.data)
            .catch(error => console.log(error));
    }
};