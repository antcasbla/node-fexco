Feature: Get traffic info

  Scenario: Get traffic info which does exist
    Given a plane {String} which is stored at {Date} coming from {String} and going to {String}
    When it is required to GET the traffic info and the traffic info does exist
    Then traffic info is sent

  Scenario: Get traffic info which does not exist
    Given a plane {String} which is stored at {Date} coming from {String} and going to {String}
    When it is required to GET the traffic info and the traffic info does not exist
    Then empty traffic info is sent