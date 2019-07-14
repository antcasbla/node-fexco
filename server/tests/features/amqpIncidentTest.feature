Feature: Generate INCIDENT message

  Scenario: Generate INCIDENT message
    Given a plane {String} which has a remarkable incident (Delayed or Cancelled) was stored at {String} coming from {String} and going to {String}
    When it is required to INCIDENT message
    Then the traffic info is sent to a queue
