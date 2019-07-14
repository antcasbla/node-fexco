# Spanish Air Traffic Monitoring (Option 1: The API and the Front-End Consumer)

<H4>Description</h4>

It is needed a new information system for managing Spanish air traffic (52 airports).
An air traffic controller must get, add, modify or delete new information about air traffic from his airport.
And any traveller must receive a notification in real time, whether INFO or INCIDENTS in the Spanish air traffic. 

<H4>Functional Requirements</H4>

* An air traffic controller must get, add, modify or delete new information about air traffic from his airport
* Any traveller must receive a notification in real time, whether INFO(on time) or INCIDENTS(delayed or cancelled) about air traffic


<H4>Non Functional Requirements</H4> 

* Non Spring-based project 
* Concurrency of 50 users (24/7) 
* An average user operation duration of 10 minutes 
* Service with 3 HTTP endpoints for CRUD 
* Service with 2 AMQP endpoints for notifications and alerts
* OPTIONAL: Endpoints documentation
* OPTIONAL: Security in endpoints
* OPTIONAL: User roles