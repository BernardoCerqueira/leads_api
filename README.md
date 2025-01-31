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

## Code Screenshots

You can check some parts of the code here:

server.ts

![server](https://github.com/user-attachments/assets/95336045-a9ca-41ba-8ec2-8979612d1cec)


error-handler.ts

![errorHandler](https://github.com/user-attachments/assets/b9171044-6b00-4e88-9b82-f000fd5767ea)


LeadsController.ts

![controller](https://github.com/user-attachments/assets/3dbc5b23-66bd-4278-b096-55a8a95efa03)


LeadsRequestSchema.ts

![schema](https://github.com/user-attachments/assets/f56ed7ac-f67d-41dd-92a9-c4fc48a05ee4)


LeadsService.ts

![service](https://github.com/user-attachments/assets/68f7e7cc-1f4a-4b0d-b612-b9262556c257)


LeadsRepository.ts

![repository](https://github.com/user-attachments/assets/53126943-9fec-483f-845f-95950fd288de)


PrismaLeadsRepository.ts

![prismaRepository](https://github.com/user-attachments/assets/3aa69b9e-9087-40a1-bd41-e107ec1669b9)



## Main tools/technologies:
* TypeScript/JavaScript
* Node.js
* PostgreSQL
* Prisma ORM
* Insomnia (for route testing)
