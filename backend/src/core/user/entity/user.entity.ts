import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'
import { randomUUID } from 'node:crypto'

import { compare, hash } from '../../../shared/utils/password'
import { validateCreation, validateUpdate } from './user.validation'

export interface UserOutput {
  id: string
  name: string
  username: string
  createdAt: Date
  updatedAt: Date
}

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid')
  id: string

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'username' })
  username: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @BeforeInsert()
  validateCreation(): void {
    this.id = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
    const validated = validateCreation(this)
    this.username = validated.username
    this.password = hash(validated.password)
  }

  @BeforeUpdate()
  validateUpdate(): void {
    this.updatedAt = new Date()
    const validated = validateUpdate(this)
    this.username = validated.username ?? this.username
    this.password = validated.password
      ? hash(validated.password)
      : this.password
  }

  verifyPassword(value: string): boolean {
    return compare(value, this.password)
  }

  toOutput(): UserOutput {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
