Feature: Generate INCIDENT message

  Scenario: Generate INCIDENT message
    Given a plane {String} which has a remarkable incident (Delayed or Cancelled) come from {String} and go to {String}
    When it is stored
    Then the traffic info is sent to a queue