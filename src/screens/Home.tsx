/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Task from '../components/Task.tsx';
import TaskModel from "../models/Task.ts";
// @ts-ignore
import Plus from '../../src/resource/plus.svg';
import { Database } from "../database/Database.ts";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList.ts";
import { RouteProp } from "@react-navigation/native";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp
}

const Home: React.FC<Props> = ({ navigation, route }) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  // @ts-ignore
  const { taskAdded } = route.params || {};
  const database = new Database();

  useEffect(() => {
    loadTasks();
  }, [taskAdded]);

  const loadTasks = () => {
    setTasks(database.getTasks());
  };

  const removeTask = (task: TaskModel) => {
    database.removeTask(task.id);

    loadTasks();
  };

  return (
    <View
      testID={'homeScreen'}
      style={styles.background}>
      <View style={styles.statusBar}>
        <Text style={styles.heading}>Do Me!</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('AddTask')}>
          <View style={styles.icon}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {tasks.map((task:TaskModel) => (
          <Task
            key={task.id}
            onLongPress={() => {
              Alert.alert('Delete', 'Are you sure you want to delete this task?', [
                { text: 'Yes', onPress: () => removeTask(task), style: 'destructive' },
                { text: 'No', style: 'cancel' },
              ],{cancelable: true})
            }}
            checked={(task: TaskModel) => {
              database.updateTask(task);
            }}
            task={task}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'left',
    width: '90%',
  },
  background: {
    flex: 1,
    backgroundColor: Colors.darker,
    padding: 20,
  },
  icon: {
    height: 40,
    width: '10%',
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Home;
