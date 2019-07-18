Feature: Modify a traffic info

  Scenario: Modify a traffic info which does exist
    Given a plane {String} which was stored at {String} coming from {String} and going to {String}
    When it is required to MODIFY its new info to {String} and the traffic info did exist
    Then info is modified

  Scenario: Modify a traffic info which does not exist
    Given a plane {String} which was stored at {String} coming from {String} and going to {String}
    When it is required to MODIFY its new info to {String} and the info did not exist
    Then an error is sent

  Scenario: Modify a traffic info which does exist
    Given a plane {String} which come from {String} and go to {String}
    When it is required to MODIFY its new info to {String} is not 'On time', 'Delayed' or 'Cancelled' and the info did exist
    Then an error is sent