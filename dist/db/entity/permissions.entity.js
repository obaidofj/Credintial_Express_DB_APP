var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
let Permissions = class Permissions extends BaseEntity {
    id;
    name; // "create_post," "edit_user," "delete_comment"
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Permissions.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Permissions.prototype, "name", void 0);
Permissions = __decorate([
    Entity()
], Permissions);
export { Permissions };
