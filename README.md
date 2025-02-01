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

![server](https://github.com/user-attachments/assets/ad3fc9b4-40c8-4b1a-871e-cbc07d70db63)


error-handler.ts

![errorHandler](https://github.com/user-attachments/assets/6f645cff-6960-4371-a1bf-8a862f92b9c7)


LeadsController.ts

![controller](https://github.com/user-attachments/assets/88dba794-09ab-4ff0-a77d-200cbb1959c3)


LeadsRequestSchema.ts

![schema](https://github.com/user-attachments/assets/f51cf236-410f-49f9-a3d6-da5c1925248d)


LeadsService.ts

![service](https://github.com/user-attachments/assets/1d28e296-9c90-4ae6-bc77-f9d0f0b7d8de)


LeadsRepository.ts

![repository](https://github.com/user-attachments/assets/9a378fcd-338f-499a-9fbf-581e5cec5623)


PrismaLeadsRepository.ts

![prismaRepository](https://github.com/user-attachments/assets/2825c229-8d62-4268-a4bd-5da65d8ba827)



## Main tools/technologies:
* TypeScript/JavaScript
* Node.js
* PostgreSQL
* Prisma ORM
* Insomnia (for route testing)
