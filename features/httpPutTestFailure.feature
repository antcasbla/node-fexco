Feature: Modify a traffic info which does not exist

  Scenario: Modify a traffic info which does not exist
    When it is required to MODIFY its new traffic info of a plane "VLG74KB" which was stored at "2019-07-01" coming from "SVQ" and going to "VLC" with "Cancelled" and the traffic info did not exist
    Then an error for the updating is sent "{ \"ok\": false, \"err\": {\"message\": \"TrafficInfo not found\"}"