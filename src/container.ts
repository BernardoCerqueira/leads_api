import { LeadsController } from "./controllers/LeadsController";
import { GroupController } from "./controllers/GroupsController";
import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./prisma/PrismaGroupRepository";
import { PrismaCampaignRepository } from "./prisma/PrismaCampaignsRepository";
import { PrismaCampaignLeadsRepository } from "./prisma/PrismaCampaignLeadsRepository";

export const leadsRepository = new PrismaLeadsRepository()
export const groupsRepository = new PrismaGroupsRepository()
export const campaignRepository = new PrismaCampaignRepository()
export const campaignLeadsRepository = new PrismaCampaignLeadsRepository()

export const leadsController = new LeadsController(leadsRepository)
export const groupsController = new GroupController(groupsRepository)
export const groupLeadsController = new GroupLeadsController(groupsRepository, leadsRepository)
export const campaignController = new CampaignController(campaignRepository)
export const campaignLeadsController = new CampaignLeadsController(leadsRepository, campaignLeadsRepository)