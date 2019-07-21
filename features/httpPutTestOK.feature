Feature: Modify a traffic info which does exist

  Scenario: Modify a traffic info which does exist
    When it is required to MODIFY its new traffic info of a plane "VLG74KB" which was stored at "2019-07-18" coming from "SVQ" and going to "VLC" with "Cancelled" and the incident flag a 1, the traffic info did exist
    Then info is modified "{\"ok\": true, \"trafficInfo\": { \"info\": \"Cancelled\", \"incident\": false, \"plane\": \"VLG74KB\", \"originAirport\": \"SVQ\", \"destinationAirport\": \"VLC\", \"__v\": 0}}"