/* eslint-disable */

import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import TaskModel from '../models/Task.ts';
import { DropdownItem } from "../types/DropdownItem.ts";

interface Props {
  text: string;
}

function Label(props: Props): React.JSX.Element {
  return (
    <Text style={styles.label}>{props.text}</Text>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#ccc',
    marginBottom: 10,
  },
});

export default Label;
