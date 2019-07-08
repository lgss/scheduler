# Scheduler proposal

## Background

The LGSS digital platform ethos lies in building flexible, secure and reusable components. One of the early platform components was a scheduling service that would enable us to build further services such as resource booking systems. Since building the initial service, we have faced challenges to facilitate a number of different style resource booking which has resulted in us understanding more & more about what could/should have been done in the initial instance.

## Intention

* Extract the existing scheduler service.
* Create a service that provides appointment scheduling services
* Identify the minimum viable functionality of a scheduling service
* Through this process identify further possibilities for services such as this; for example – providing a server-less service

## Technologies

* Rather than being built on proprietary technology, our intention is to build the scheduling service as a standalone web service. Our initial thought is a node.js web service.
* Our intention is to store data in a NoSQL database such as Mongo as this will allow for ease of connection and flexibility in schema.

## Functionality
* Create an appointment
* Create an availability for an appointment
* View a single appointment
* Update a booked appointment
* Update an availability for an appointment
* Delete a booked appointment
* Delete an availability for an appointment
* View a list of appointments associated to a resource
* View potential appointments based on a resource’s availability
