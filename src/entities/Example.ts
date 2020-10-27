import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm/browser";

@Entity()
export default class ExampleEntity {
  @PrimaryGeneratedColumn()
  _id?: string;
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  startDate!: Date;
}
