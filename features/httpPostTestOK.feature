Feature: Create a new traffic info which does not exist

  Scenario: Create a new traffic info which does not exist
    When it is required to CREATE its new traffic info of a plane "VLG74KB" which come from "VLC" and go to "BCN" with "On time" and the traffic info does not exist
    Then traffic info is created "{\"ok\": true, \"trafficInfo\": { \"info\": \"On time\", \"incident\": false, \"plane\": \"VLG74KB\", \"originAirport\": \"VLC\", \"destinationAirport\": \"BCN\", \"__v\": 0}}"