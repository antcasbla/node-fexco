Feature: Get traffic info which does not exist

  Scenario: Get traffic info which does not exist
    When it is required to GET the traffic info of a plane "VLG74KB" which is stored at "2019-07-16" coming from "SVQ" and going to "BCN" and the traffic info does not exist
    Then an error for the getting is sent "{ \"ok\": false, \"err\": {\"message\": \"TrafficInfo not found\"}"
