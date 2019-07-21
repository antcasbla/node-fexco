Feature: Create a new traffic info which does exist

  Scenario: Create a new traffic info which does exist
    When it is required to CREATE its new traffic info of a plane "VLG74KB" which come from "SVQ" and go to "VLC" with "On time" and the traffic info does exist
    Then an error for the creating is sent "{ \"ok\": false, \"err\": {\"message\": \"TrafficInfo already created\"}"