import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckCircle, GripVertical, X } from "lucide-react-native";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const inputRefs = useRef({});

  useEffect(() => {
    // Load tasks from AsyncStorage when the app is launched
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          // Default example tasks
          setTasks([
            {
              id: "1",
              text: "Example: Drink 1 Gallon of Water Per Day...",
              completed: false,
              isPlaceholder: true,
            },
            {
              id: "2",
              text: "Example: Walk 1 Mile...",
              completed: false,
              isPlaceholder: true,
            },
            {
              id: "3",
              text: "Example: Perform Mobility",
              completed: false,
              isPlaceholder: true,
            },
            {
              id: "4",
              text: "Example: Eat Clean Daily",
              completed: false,
              isPlaceholder: true,
            },
            {
              id: "5",
              text: "Example: Lose 20lbs",
              completed: false,
              isPlaceholder: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks to AsyncStorage whenever they change
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks", error);
      }
    };

    saveTasks();
  }, [tasks]);

  const handleTaskChange = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText, isPlaceholder: false } : task
      )
    );
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const newId = (
      Math.max(...tasks.map((t) => parseInt(t.id)), 0) + 1
    ).toString();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: newId,
        text: "New task...",
        completed: false,
        isPlaceholder: true,
      },
    ]);
  };

  const deleteTask = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () =>
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
      },
    ]);
  };

  const handleFocus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id && task.isPlaceholder
          ? { ...task, text: "", isPlaceholder: false }
          : task
      )
    );
  };

  const handleBlur = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? task.text.trim() === ""
            ? { ...task, text: getExampleText(id), isPlaceholder: true }
            : { ...task, isPlaceholder: false }
          : task
      )
    );
  };

  const getExampleText = (id) => {
    switch (id) {
      case "1":
        return "Example: Drink 1 Gallon of Water Per Day...";
      case "2":
        return "Example: Walk 1 Mile...";
      case "3":
        return "Example: Perform Mobility";
      case "4":
        return "Example: Eat Clean Daily";
      case "5":
        return "Example: Lose 20lbs";
      default:
        return "New task...";
    }
  };

  const renderTask = (item) => (
    <View key={item.id} style={styles.taskContainer}>
      <GripVertical size={20} color="gray" />
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <CheckCircle size={20} color={item.completed ? "green" : "gray"} />
      </TouchableOpacity>
      <TextInput
        ref={(ref) => (inputRefs.current[item.id] = ref)}
        style={[
          styles.taskInput,
          {
            color: item.isPlaceholder ? "#aeaeae" : "black",
            textDecorationLine: item.completed ? "line-through" : "none",
          },
        ]}
        value={item.text}
        onFocus={() => handleFocus(item.id)}
        onBlur={() => handleBlur(item.id)}
        onChangeText={(newText) => handleTaskChange(item.id, newText)}
        returnKeyType="done"
        blurOnSubmit={true}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <X size={15} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Goal List</Text>
        <Text style={styles.subtitle}>
          Enter any goals or tasks you would like to complete.
        </Text>
        <ScrollView style={styles.taskList}>
          {tasks.filter((task) => !task.completed).map(renderTask)}
        </ScrollView>

        {tasks.some((task) => task.completed) && (
          <View style={styles.completedSection}>
            <Text style={styles.subtitle}>Completed</Text>
            <ScrollView style={styles.taskList}>
              {tasks.filter((task) => task.completed).map(renderTask)}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    paddingLeft: 10,
  },
  taskList: {
    marginBottom: 16,
    color: "blue",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  taskInput: {
    flex: 1,
    marginLeft: 12,
    padding: 0,
    fontSize: 14,
  },
  completedSection: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 8,
    paddingLeft: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default TodoList;
