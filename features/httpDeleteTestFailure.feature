Feature: Delete traffic info which does not exist

  Scenario: Delete traffic info which does not exist
    When it is required to DELETE the traffic info of a plane "VLG74KB" which is stored at "2019-06-14" coming from "SVQ" and going to "VLC" and the traffic info does not exist
    Then an error for the deleting is sent "{ \"ok\": false, \"err\": {\"message\": \"TrafficInfo not found\"}"
