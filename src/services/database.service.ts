import {
  DEBUG,
  enablePromise,
} from "react-native-sqlite-storage";
import {
  Connection,
  createConnection,
} from "typeorm";
import ExampleEntity from "../entities/Example";

export default class DatabaseService {
  private static connection: Connection;
  public static async init() {
    DEBUG(true);
    enablePromise(true);
    this.connection = await createConnection({
      type: "react-native",
      database: "example.db",
      entities: [ExampleEntity],
      location: "default",
      logging: ["error", "query", "schema"],
      synchronize: true,
    });
  }
  public static async close() {
    await this.connection.close();
  }
}
