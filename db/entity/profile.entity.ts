import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string 

    @Column()
    lastName: string 

    @Column()
    dateOfBirth: string 


}

