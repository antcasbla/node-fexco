Feature: Get traffic info which does exist

  Scenario: Get traffic info which does exist
    When it is required to GET the traffic info of a plane {string} which is stored at {string} coming from {string} and going to {string} and the traffic info does exist
    Then traffic info is sent {string}

