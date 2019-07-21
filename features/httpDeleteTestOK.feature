Feature: Delete traffic info which does exist

  Scenario: Delete traffic info which does exist
    When it is required to DELETE the traffic info of a plane "VLG74KB" which is stored at "2019-07-18" coming from "SVQ" and going to "VLC" and the traffic info does exist
    Then traffic info is deleted "{\"ok\": true, \"trafficInfo\": { \"info\": \"On time\", \"incident\": false, \"plane\": \"VLG74KB\", \"originAirport\": \"SVQ\", \"destinationAirport\": \"VLC\", \"__v\": 0}}"
