import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { CheckCircle, GripVertical, X } from 'lucide-react-native';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Drink 1 Gallon of Water Per Day...', completed: false },
    { id: '2', text: 'Walk 1 Mile...', completed: false },
    { id: '3', text: 'Perform Mobility', completed: false },
    { id: '4', text: 'Eat Clean Daily', completed: false },
    { id: '5', text: 'Lose 20lbs', completed: false },
  ]);

  const handleTaskChange = (id, newText) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    const newId = (Math.max(...tasks.map(t => parseInt(t.id)), 0) + 1).toString();
    setTasks(prevTasks => [...prevTasks, { id: newId, text: 'New task...', completed: false }]);
  };

  const deleteTask = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => setTasks(prevTasks => prevTasks.filter(task => task.id !== id)) }
      ]
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <GripVertical size={20} color="gray" />
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
        <CheckCircle size={24} color={item.completed ? 'green' : 'gray'} />
      </TouchableOpacity>
      <TextInput
        style={styles.taskInput}
        value={item.text}
        onChangeText={(newText) => handleTaskChange(item.id, newText)}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <X size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily To-Do List</Text>
      <FlatList
        data={tasks.filter(task => !task.completed)}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />

      {tasks.some(task => task.completed) && (
        <View style={styles.completedSection}>
          <Text style={styles.subtitle}>Completed</Text>
          <FlatList
            data={tasks.filter(task => task.completed)}
            renderItem={renderTask}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            style={styles.taskList}
          />
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskList: {
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  taskInput: {
    flex: 1,
    marginLeft: 12,
    padding: 0,
    fontSize: 16,
  },
  completedSection: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TodoList;
