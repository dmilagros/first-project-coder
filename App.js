import { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";

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

  const onHandlerDeleteItem = (id) => {
    setItemList((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
    setItemSelected({});
    setModalVisible(!modalVisible);
  };

  const onHandlerModal = (id) => {
    //setItemSelected(itemList.filter((item) => item.id === id)[0]);  --> que tome el primero del filtrado
    setItemSelected(itemList.find((item) => item.id === id));
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.screen}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalTitle}>
              <Text>Mi modal</Text>
            </View>
            <View style={styles.modalMessage}>
              <Text>¿Estás seguro que desea borrar?</Text>
            </View>
            <View style={styles.modalMessage}>
              <Text style={styles.modalItem}>{itemSelected.value}</Text>
            </View>
            <View style={styles.modalButton}>
              <Button
                onPress={() => onHandlerDeleteItem(itemSelected.id)}
                title="Confirmar "
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingese aquí"
          style={styles.input}
          onChangeText={onHandlerChangeItem}
          value={textItem}
        />
        <Button
          title="ADD"
          onPress={onHandlerAddItem}
          disabled={textItem.length < 1 ? true : false}
        />
      </View>
      <FlatList
        data={itemList}
        renderItem={(data) => (
          <TouchableOpacity
            onPress={() => onHandlerModal(data.item.id)}
            style={styles.item}
          >
            <View style={styles.itemList}>
              <Text>{data.item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
        showVerticalScrollIndicator={false} // para ocultar el scroll vertical, pero sigue funcionando
        keyExtractor={(item) => item.id}
        /* renderItem={(data) => (
          <TouchableOpacity onPress={onHandlerDelete.bind(this, data.item.id)}>
            <View style={styles.itemList}>
              <Text>{data.item.value}</Text>
            </View>
          </TouchableOpacity>
        )} */
      />
      {/* <View>
        {itemList.map((item) => (
          <View style={styles.item} key={item.value}>
            <Text>Item Name: {item.value}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: "10%",
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
    marginTop: "10%",
    height: 50,
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    marginTop: 15,
  },
  modalItem: {
    fontSize: 30,
  },
});
