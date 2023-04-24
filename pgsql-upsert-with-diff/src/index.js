"use strict";
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
const typeorm_1 = require("typeorm");
const pcz_poc_entity_1 = require("./entities/pcz-poc.entity");
const pcz_poc_repository_1 = require("./repositories/pcz-poc.repository");
function runQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'testdb',
            entities: [pcz_poc_entity_1.PczPoc],
            synchronize: true,
        });
        const repository = connection.getCustomRepository(pcz_poc_repository_1.PczPocRepository);
        const records = [
            { style: 'st001', sku: 'sku001', price: 100 },
            { style: 'st001', sku: 'sku002', price: 101 },
            { style: 'st001', sku: 'sku003', price: 102 },
            // add more records here...
        ];
        yield repository.bulkInsert(records);
        yield connection.close();
    });
}
runQuery();
