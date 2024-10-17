import { LeadsController } from "./controllers/LeadsController";
import { GroupController } from "./controllers/GroupsController";
import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./prisma/PrismaGroupRepository";
import { PrismaCampaignRepository } from "./prisma/PrismaCampaignsRepository";
import { PrismaCampaignLeadsRepository } from "./prisma/PrismaCampaignLeadsRepository";
import { LeadsService } from "./services/LeadsService";
import { GroupsService } from "./services/GroupsService";
import { CampaignsService } from "./services/CampaignsService";
import { GroupLeadsService } from "./services/GroupLeadsService";
import { CampaignLeadsService } from "./services/CampaignLeadsService";

export const leadsRepository = new PrismaLeadsRepository()
export const groupsRepository = new PrismaGroupsRepository()
export const campaignRepository = new PrismaCampaignRepository()
export const campaignLeadsRepository = new PrismaCampaignLeadsRepository()

export const leadsService = new LeadsService(leadsRepository)
export const groupsService = new GroupsService(groupsRepository)
export const campaignsService = new CampaignsService(campaignRepository)
export const groupLeadsService = new GroupLeadsService(leadsRepository, groupsRepository)
export const campaignLeadsService = new CampaignLeadsService(leadsRepository, campaignLeadsRepository)

export const leadsController = new LeadsController(leadsService)
export const groupsController = new GroupController(groupsService)
export const groupLeadsController = new GroupLeadsController(groupLeadsService)
export const campaignController = new CampaignController(campaignsService)
export const campaignLeadsController = new CampaignLeadsController(campaignLeadsService)