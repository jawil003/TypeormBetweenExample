import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class ExampleEntity {
  @PrimaryGeneratedColumn()
  _id?: string;
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  startDate!: Date;
}
