import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";

export default function App() {
  const [textItem, setTextItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onHandlerChangeItem = (t) => setTextItem(t); //nombre de variable no semantico

  const onHandlerAddItem = () => {
    setItemList((currentItems) => [
      ...currentItems, //traer todos los items que contienes
      { id: itemList.length + 1, value: textItem }, //ademas agregar un nuevo item
    ]);
    /* setItemList((currentItems) => [
      ...currentItems, //traer todos los items que contienes
      { id: Math.random() * 10, value: textItem }, //ademas agregar un nuevo item
    ]); */
    // setItemList({ ...currentItems, id: Math.random() * 10, value: textItem }); --> esto es lo mismo que el anterior
    setTextItem("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingese aquí"
          style={styles.input}
          onChangeText={onHandlerChangeItem}
          value={textItem}
        />
        <Button title="ADD" onPress={onHandlerAddItem} />
      </View>
      <View>
        {itemList.map((item) => (
          <View style={styles.item} key={item.value}>
            <Text>Item Name: {item.value}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
    height: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop: '10%',
    height: 50
  }
});
