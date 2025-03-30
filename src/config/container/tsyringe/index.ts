import { container } from "tsyringe";

import { GiftControllerImpl } from "../../../modules/gift/api/controllers/impl/GiftControllerImpl";
import { GuestControllerImpl } from "../../../modules/guest/api/controllers/impl/GuestControllerImpl";

import { GiftServiceImpl } from "../../../modules/gift/business/services/impl/GiftServiceImpl";
import { GuestServiceImpl } from "../../../modules/guest/business/services/impl/GuestServiceImpl";

import { GiftRepositoryImpl } from "../../../modules/gift/database/repositories/impl/typeorm/repositories/GiftRepositoryImpl";
import { GuestRepositoryImpl } from "../../../modules/guest/database/repositories/impl/typeorm/repositories/GuestRepositoryImpl";

container.register("GiftController", {useClass: GiftControllerImpl});
container.register("GuestController", {useClass: GuestControllerImpl});

container.register("GiftService", {useClass: GiftServiceImpl});
container.register("GuestService", {useClass: GuestServiceImpl});

container.register("GiftRepository", {useClass: GiftRepositoryImpl});
container.register("GuestRepository", {useClass: GuestRepositoryImpl});
