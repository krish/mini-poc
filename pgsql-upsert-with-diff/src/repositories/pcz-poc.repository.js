"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PczPocRepository = void 0;
const typeorm_1 = require("typeorm");
const pcz_poc_entity_1 = require("../entities/pcz-poc.entity");
let PczPocRepository = class PczPocRepository extends typeorm_1.Repository {
    bulkInsert(records) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = this.createQueryBuilder()
                .insert()
                .into(pcz_poc_entity_1.PczPoc)
                .values(records)
                .onConflict(`("style", "sku") DO UPDATE SET "price" = excluded."price", "diff" = "pcz-poc"."price" <> excluded."price"`);
            yield qb.execute();
        });
    }
};
PczPocRepository = __decorate([
    (0, typeorm_1.EntityRepository)(pcz_poc_entity_1.PczPoc)
], PczPocRepository);
exports.PczPocRepository = PczPocRepository;
