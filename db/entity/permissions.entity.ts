import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Permissions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string  // "create_post," "edit_user," "delete_comment"

}

