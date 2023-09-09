import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import bcrypt from 'bcrypt'
import { Role } from "./role.entity"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @BeforeInsert()
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10)
      }
    }
    @Column()
    password: string

    @Column()
    email: string

    @ManyToOne(() => Role, role => role.users, { cascade: true, eager: true })
    @JoinColumn()
    role: Role;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;
}

