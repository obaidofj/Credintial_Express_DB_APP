import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { User } from "./user.entity.js";
import { Permissions } from "./permissions.entity.js";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string // "admin," "user," "editor"

    @ManyToMany(() => Permissions, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permissions[];
  
    users: User[];
    
}

