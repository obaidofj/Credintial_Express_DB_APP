import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    firstName: string 

    @Column({ nullable: false })
    lastName: string 

    @Column()
    dateOfBirth: string 

    user:User

}

