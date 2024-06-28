/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Task from '../components/Task.tsx';
import TaskModel from '../models/Task.ts';
// @ts-ignore
import Plus from '../../src/resource/plus.svg';
import {Database} from '../database/Database.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList.ts';
import {RouteProp} from '@react-navigation/native';
import Category from '../models/Category.ts';
import HomeScreenData from '../models/HomeScreenData.ts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const Home: React.FC<Props> = ({navigation, route}) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<HomeScreenData[]>([]);
  // @ts-ignore
  const {taskAdded} = route.params || {};
  const database = new Database();

  const loadTasks = () => {
    setTasks(database.getTasks());
  };

  const loadCategories = () => {
    setCategories(database.getCategories());
  };

  const loadData = () => {
    let data = [];

    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      let tasksForCategory = [];

      for (let j = 0; j < tasks.length; j++) {
        let task = tasks[j];

        if (task.category === category.id) {
          tasksForCategory.push(task);
        }
      }

      if (tasksForCategory.length > 0) {
        data.push(new HomeScreenData({category, tasks: tasksForCategory}));
      }
    }

    setData(data);
  };

  useEffect(() => {
    loadTasks();
    loadCategories();
    loadData();

    console.log(data, tasks, categories);
  }, [taskAdded]);

  const removeTask = (task: TaskModel) => {
    database.removeTask(task.id);

    loadTasks();
  };

  return (
    <View testID={'homeScreen'} style={styles.background}>
      <View style={styles.statusBar}>
        <Text style={styles.heading}>Do Me!</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddTask')}>
          <View style={styles.icon}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map((item: HomeScreenData, index: number) => (
          <View key={index}>
            {item.tasks.length > 0 ? (
              <Text style={styles.categoryHeading}>{item.category.title}</Text>
            ) : (
              ''
            )}
            {item.tasks.map((task: TaskModel) => (
              <Task
                key={task.id}
                onLongPress={() => {
                  Alert.alert(
                    'Delete',
                    'Are you sure you want to delete this task?',
                    [
                      {
                        text: 'Yes',
                        onPress: () => removeTask(task),
                        style: 'destructive',
                      },
                      {text: 'No', style: 'cancel'},
                    ],
                    {cancelable: true},
                  );
                }}
                checked={(task: TaskModel) => {
                  database.updateTask(task);
                }}
                task={task}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'left',
    width: '90%',
  },
  categoryHeading: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'left',
    marginTop: 10,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.darker,
    padding: 20,
  },
  icon: {
    height: 20,
    width: '10%',
  },
  statusBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default Home;
