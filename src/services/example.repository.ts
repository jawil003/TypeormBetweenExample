import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
} from "typeorm";
import ExampleEntity from "../entities/Example";

@EntityRepository(ExampleEntity)
export default class ExampleRepository extends AbstractRepository<
  ExampleEntity
> {
  public async save(entity: ExampleEntity) {
    await this.manager.save(entity);
  }

  public create(entity: ExampleEntity) {
    return this.manager.create<ExampleEntity>(
      "ExampleEntity",
      entity,
    );
  }

  public async findAll(
    options?: FindManyOptions<ExampleEntity>,
  ) {
    return await this.manager.find<ExampleEntity>(
      "ExampleEntity",
      options,
    );
  }
}
