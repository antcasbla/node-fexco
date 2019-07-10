Feature: Create a new traffic info

  Scenario: Create a new traffic info which does not exist
    Given a plane {String} which come from {String} and go to {String}
    When it is required to CREATE its new info to {String} and the info does not exist
    Then info is created

  Scenario: Create a new traffic info which does exist
    Given a plane {String} which come from {String} and go to {String}
    When it is required to CREATE its new info to {String} and the info does exist
    Then an error is sent