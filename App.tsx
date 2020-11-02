import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import {
  getCustomRepository,
  getManager,
  LessThanOrEqual,
  Raw,
} from "typeorm/browser";
import data from "./src/data/data";
import ExampleEntity from "./src/entities/Example";
import DatabaseService from "./src/services/database.service";
import ExampleRepository from "./src/services/example.repository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MoreThanOrEqual } from "typeorm";
dayjs.extend(utc);

const App: React.FC = () => {
  const [examples, setExamples] = useState<
    ExampleEntity[]
  >();
  useEffect(() => {
    (async () => {
      //Init DB
      await DatabaseService.init();

      await getManager().clear("example_entity");

      //Populate DB
      const exampleRepository = getCustomRepository(
        ExampleRepository,
      );
      for (const d of data) {
        const result = exampleRepository.create(
          d,
        );
        await exampleRepository.save(result);
        //FIXME: If Between Filter is cleared the Entries are found but with it not!
        const foundData = await exampleRepository.findAll(
          {
            where: {
              startDate: Raw(
                (alias) =>
                  `${alias} >= "${dayjs(
                    new Date(
                      2017,
                      3,
                      10,
                      12,
                      50,
                      30,
                    ),
                  )
                    .utc()
                    .format(
                      "YYYY-MM-DD HH:mm:ss.SSS",
                    )}" AND ${alias} <= "${dayjs(
                    new Date(
                      2019,
                      3,
                      3,
                      10,
                      22,
                      30,
                    ),
                  )
                    .utc()
                    .format(
                      "YYYY-MM-DD HH:mm:ss.SSS",
                    )}"`,
              ),
            },
          },
        );

        //This is a working example:
        /*const foundData = await exampleRepository.findAll();*/
        setExamples(foundData);
      }
    })();
    return () => {
      async () => {
        await DatabaseService.close();
      };
    };
  }, []);
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        {examples && examples.length > 0 ? (
          examples?.map((e) => (
            <Text>{e.name}</Text>
          ))
        ) : (
          <Text>There are no Entries</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  inner: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
});

export default App;
