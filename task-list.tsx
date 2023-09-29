import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function TaskList() {
  const DATA = [
    {
      id: 0,
      title: "First Item",
    },
    {
      id: 1,
      title: "Second Item",
    },
  ];
  function goAddTask() {
    // console.log("go to new task");
  }
  function markDoneTaskById(id: Number) {
    //console.log("mark done task", id);
  }
  function deleteTaskById(id: number) {
    //console.log("delete task", id);
  }
  return (
    <View
      style={{
        backgroundColor: "red",
        height: Dimensions.get("screen").height,
        paddingTop: 40,
        width: Dimensions.get("screen").width,
      }}
    >
      <FlashList
        data={DATA}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => markDoneTaskById(item.id)}>
              <Text>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTaskById(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: "white",
          marginBottom: 20,
          marginLeft: 20,
        }}
        onPress={goAddTask}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
