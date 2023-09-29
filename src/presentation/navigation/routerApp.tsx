// In App.js in a new project

import * as React from "react";
import { View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import MyTextInput from "../components/my-text-input";
import { Avatar, Card, IconButton } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import useTaskStore from "../store/task-store";
import { useEffect } from "react";
import { Task } from "../../task";

function TaskListcreen({ navigation }) {
  //const [checked, setChecked] = React.useState(false);
  const { tasks, fetchTasks, toggleTaskDone, deleteTask } = useTaskStore();
  useEffect(() => {
    fetchTasks(); // Llamar a la función para obtener las tareas de la API
  }, []);

  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        paddingTop: 40,
        width: Dimensions.get("screen").width,
      }}
    >
      <Button
        icon="pencil"
        mode="contained"
        onPress={() => navigation.navigate("AddTask")}
      >
        Add Task
      </Button>
      <FlashList
        data={tasks}
        estimatedItemSize={200}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: Dimensions.get("screen").height / 2,
            }}
          >
            <Text variant="titleSmall">Create your first task.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              { flex: 1, alignItems: "center" },
              item.completed ? { backgroundColor: "#dddcdc" } : null,
            ]}
          >
            <Card.Title
              title={item.title}
              subtitle=""
              left={(props) => (
                <RadioButton.Android
                  value="first"
                  status={item?.completed ? "checked" : "unchecked"}
                  onPress={() => toggleTaskDone(item.id)}
                />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => deleteTask(item.id)}
                />
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
function AddTaskScreen({ navigation }) {
  const { addTask } = useTaskStore();
  const [newTask, setNewTask] = React.useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const task = { id: Date.now(), title: newTask, completed: false };
      addTask(task);
      setNewTask("");
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ width: 300, marginVertical: 20 }}
        label="title"
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />

      <View style={{ flexDirection: "row", gap: 50 }}>
        <Button
          icon="cancel"
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          cancel
        </Button>
        <Button
          icon="content-save-all"
          mode="contained"
          onPress={handleAddTask}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RouterApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="taskList" component={TaskListcreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RouterApp;
