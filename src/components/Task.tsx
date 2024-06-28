/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import TaskModel from '../models/Task.ts';

interface Props {
  onLongPress: () => void;
  checked: (task: TaskModel) => void;
  task: TaskModel;
}

function Task(props: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onLongPress={props.onLongPress}
      style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.task.title}</Text>
        <Text style={styles.description}>{props.task.description}</Text>
      </View>
      <BouncyCheckbox
        style={styles.checkbox}
        onPress={() => {
          let task = props.task;
          task.completed = !task.completed;
          props.checked(task);
        }}
        isChecked={props.task.completed}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  container: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  textContainer: {
    width: '90%',
  },
  checkbox: {
    width: '10%',
  },
});

export default Task;
