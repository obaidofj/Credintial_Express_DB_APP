import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, ManyToOne, JoinTable,OneToOne, CreateDateColumn, ManyToMany, JoinColumn } from "typeorm"
import bcrypt from 'bcrypt'
import { Role } from "./role.entity.js"
import { Profile } from "./profile.entity.js"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    username: string

    @BeforeInsert()
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10)
      }
    }
    @Column({ nullable: false })
    password: string

    @Column()
    email: string

    @ManyToMany(() => Role, role => role.users, {  eager: true })
    @JoinTable()
    roles: Role[];
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @OneToOne(() => Profile, profile => profile.user, { cascade: true, eager: true })
    @JoinColumn()
    profile:Profile
}

