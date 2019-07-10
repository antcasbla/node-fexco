Feature: Generate INFO message

  Scenario: Generate INFO message
    Given a plane {String} which has a non remarkable incident (On time) come from {String} and go to {String}
    When it is stored
    Then the traffic info is sent to a queue