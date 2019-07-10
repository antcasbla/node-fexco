Feature: Delete traffic info

  Scenario: Delete traffic info which does exist
    Given a plane {String} which is stored at {Date} coming from {String} and going to {String}
    When it is required to DELETE the traffic info and the traffic info does exist
    Then traffic info is deleted and sent back to user

  Scenario: Delete traffic info which does not exist
    Given a plane {String} which is stored at {Date} coming from {String} and going to {String}
    When it is required to DELETE the traffic info and the traffic info does not exist
    Then an error is sent