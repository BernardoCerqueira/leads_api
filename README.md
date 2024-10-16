# Leads API

The Leads API enables full CRUD (Create, Read, Update, Delete) operations for Leads, Groups, and Campaigns, allowing smooth management of these entities.

## Key Features

* Leads and Groups:
  * Add or remove Leads from Groups.
  * Retrieve all Leads or specific Leads within a Group.
* Leads and Campaigns:
  * Perform similar operations as with Groups (add/remove Leads, retrieve Leads).
  * Additionally, update the status of a Lead within a specific Campaign.

* Advanced Filtering & Pagination:
  * The routes for "Get All Leads", "Get All Leads from a Campaign", and "Get All Leads from a Group" support pagination and filters (e.g., by name).
  
The API has its own dedicated database to store all data related to Leads, Groups, and Campaigns.

## Main tools/technologies:
* TypeScript/JavaScript
* Node.js
* PostgreSQL
* Prisma ORM
* Insomnia (for route testing)
