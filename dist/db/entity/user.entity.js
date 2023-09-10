var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, JoinTable, OneToOne, CreateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./role.entity.js";
import { Profile } from "./profile.entity.js";
let User = class User extends BaseEntity {
    id;
    username;
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    password;
    email;
    role;
    createdAt;
    profile;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    ManyToMany(() => Role, role => role.users, { eager: true }),
    JoinTable(),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
__decorate([
    CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    OneToOne(() => Profile, profile => profile.user, { cascade: true, eager: true }),
    JoinColumn(),
    __metadata("design:type", Profile)
], User.prototype, "profile", void 0);
User = __decorate([
    Entity()
], User);
export { User };
