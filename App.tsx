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
} from "typeorm/browser";
import data from "./src/data/data";
import { Between } from "typeorm/browser";
import ExampleEntity from "./src/entities/Example";
import DatabaseService from "./src/services/database.service";
import ExampleRepository from "./src/services/example.repository";

const App: React.FC = () => {
  const [examples, setExamples] = useState<
    ExampleEntity[]
  >();
  useEffect(() => {
    (async () => {
      //Init DB
      await DatabaseService.init();

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
              startDate: Between(
                new Date(2017, 3, 10, 12, 50, 30),
                new Date(2019, 3, 3, 10, 22, 30),
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
        await getManager().clear(ExampleEntity);
        await DatabaseService.close();
      };
    };
  }, []);
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        {examples ? (
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
