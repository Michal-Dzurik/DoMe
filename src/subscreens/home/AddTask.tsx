/* eslint-disable */
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React, {useEffect, useState} from 'react';
import BackButtonIcon from '../../icons/BackButtonIcon.tsx';
// @ts-ignore
import Plus from '../../resource/plus.svg';
import {Database} from '../../database/Database.ts';
import TaskModel from '../../models/Task.ts';
import Dropdown from '../../components/Dropdown.tsx';
import Label from '../../components/Label.tsx';
import {DropdownItem} from '../../types/DropdownItem.ts';

interface Props {}

const AddTask: React.FC = () => {
  const navigation = useNavigation<NavigationProp<Props>>();
  const [heading, setHeading] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number>(-1);
  const [categories, setCategories] = useState<DropdownItem[]>([]);

  const database = new Database();

  useEffect(() => {
    setCategories(database.getCategoryForPicker(true));
  }, []);

  const validateTaskCreate = () => {
    return heading.trim() != '' && description.trim() != '' && category != -1;
  };

  const handleSubmit = () => {
    if (validateTaskCreate()) {
      const database = new Database();
      database.addTask(
        new TaskModel({
          id: new Date().getSeconds(),
          title: heading,
          description: description,
          completed: false,
          category: 1,
        }),
      );

      // @ts-ignore
      navigation.navigate('Home', {taskAdded: true});
    } else {
      Alert.alert('Not all fields are filled');
    }
  };

  const handleSelectCategory = (item: DropdownItem | number | null) => {
    if (typeof item === 'number') {
      setCategory(item);
      return;
    }
    if (item === null) {
      setCategory(-1);
      return;
    }

    setCategory(item.id);
  };

  const handleCreateCategory = (
    name: string,
    selected: (selected: boolean) => void,
  ) => {
    if (name.trim() === '') {
      Alert.alert('Hint', "To add a category write it's name to search bar");
      return;
    }

    Alert.alert(
      'Add category',
      'Are you sure you want do add category ' + name + '?',
      [
        {
          text: 'Yes',
          onPress: () => {
            database.addCategory(name);
            setCategories(database.getCategoryForPicker(true));

            let category = database.getCategory(name);
            if (category) {
              handleSelectCategory(category.id);
            }
            selected(true);
          },
          style: 'default',
        },
        {text: 'No', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const handleOnLongPress = (item: DropdownItem) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Yes',
          onPress: () => {
            database.removeCategory(item.id);
            setCategories(database.getCategoryForPicker(true));
          },
          style: 'destructive',
        },
        {text: 'No', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.statusBar}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}>
          <BackButtonIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>Add task</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          testID={'submitButton'}
          onPress={handleSubmit}>
          <View style={styles.icon}>
            <Plus />
          </View>
        </TouchableOpacity>
      </View>
      {/* Form for adding the task */}
      <Label text={'Heading'} />
      <TextInput
        testID={'heading'}
        onChangeText={setHeading}
        style={styles.input}
        placeholder={'Dishes'}
      />
      <Label text={'Description'} />
      <TextInput
        testID={'description'}
        onChangeText={setDescription}
        style={styles.input}
        placeholder={'Do the dishes before Mum comes home'}
      />
      <Label text={'Category'} />
      <Dropdown
        onSelect={handleSelectCategory}
        items={categories}
        onCreateRecordPress={handleCreateCategory}
        onDeleteRecord={handleOnLongPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'center',
    width: '80%',
  },
  icon: {
    height: 40,
    width: '10%',
  },
  background: {
    flex: 1,
    backgroundColor: Colors.darker,
    padding: 20,
  },
  statusBar: {
    position: 'relative',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    marginLeft: -20,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '10%',
  },
  input: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    marginBottom: 35,
    color: 'white',
  },
  label: {
    color: '#ccc',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#333',
    color: '#ccc',
    borderColor: '#333',
  },
  dropdownText: {
    color: '#ccc',
  },
});

export default AddTask;
