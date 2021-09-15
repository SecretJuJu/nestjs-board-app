import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;
}
