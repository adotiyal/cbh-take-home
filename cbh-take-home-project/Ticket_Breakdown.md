# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket 1:

#### Task:

A facility can assign an external id to an internal id for an agent.
This would require a db table where we can map a facility id and internal agent id to a new external agent id.

#### Implementation details:

Perform database migration to add a new table agent_external _id. This table will have the following columns:
facility_id, agent_internal_id, external_id.

facility_id and agent_internal_id together will be unique and will act as the primary key for the table. The reason is that an agent can work for multiple facilities and if an agent worked for a facility then facility_id and agent_internal_id together denotes the  relationship.

#### Acceptance criteria:

The agent_external _id table should created in dev, QA and prod env.

#### Effort:

2 days


### Ticket 2:

#### Task: 

Since facilities can generate external_id for an agent we need to create an API interface that can perform this action. Also create an API to get agent_internal_id for a given agent_external_id.

#### Implementation details:

Create an POST API in backend service with the following functionality.
Request: POST with the form details as facility_id, agent_internal_id, agent_external_id.
Action: Save facility_id, agent_internal_id, external_id as a row in agent_external _id table. This assumes that Ticket 1 have been done and there is already a agent_external _id table in the db.
Response: HTTP_OK 200 if request is processed successfully else send back HTTP ERROR codes depending on the error types.

Also create a GET API in the backend service with the following functionality.
Request: GET  Input:  agent_external_id

Action: Search for the  external _id in agent_external_id table. Send back the agent_internal _id .
Response: HTTP_OK 200 if request is processed successfully else send back HTTP ERROR codes depending on the error types.


#### Acceptance criteria:

The code changes along with unit tests should be merged to main branch. Testing should be done in Dev env to make sure the API is working as expected.

#### Effort:

4 days


### Ticket 3:

#### Task:

Since facilities can assign an external_id to an agent the front end should have a feature that facilities can use to perform this action.

#### Implementation details:

Front end changes to create a feature where a facility can choose an agent and assign an external id to it. This means the front end should show all the agents that are assigned to a facility. Use the existing API to get agent_internal_id for a facility(this API will internally use getShiftsByFacility  to get agent metadata). 
When a facility assigns an external_agent_id to an agent call the API that is implemented in Ticket 2 to save the mapping.


#### Acceptance criteria:

The code changes along with unit tests should be merged to main branch. Testing should be done in Dev env to make sure a facility can assign an external_id to the agent_internal_id from  front end and the mapping is saved to the DB in dev.

#### Effort:

5 days


### Ticket 4:

#### Task:

Since the repost needs to use external_id perform the code change to use external_id in generateReport.

#### Implementation details:

generateReport function is currently generating report for the facility. This function uses internal_id for the agent. We need to change the function to use external_id for the agent. Use the GET API implemented in Ticket 3 to GET an external_id for an internal_id for agents. This will means find all the agent internal_id in the report, find external_id for each of the agent internal_id and replace the internal_id to external_id wherever needed.
Use feature flag to add this feature in backend. This will make sure we are able to of testing for selective facilities first before making it GA for all facilities.

#### Acceptance criteria:

The code changes along with unit tests should be merged to main branch. Testing should be done in Dev env. Test for a facility by enabling the feature flag for a facility. Do the same in QA and Prod. Once we are sure the functionality is working GA the feature to all facilities.

#### Effort:

7 days.