/* eslint-disable */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {DropdownItem} from '../types/DropdownItem.ts';
// @ts-ignore
import Plus from '../resource/plus.svg';

interface Props {
  onSelect: (item: DropdownItem | null) => void;
  items: DropdownItem[];
  onCreateRecordPress?: (
    name: string,
    selected: (selected: boolean) => void,
  ) => void;
  onDeleteRecord?: (item: DropdownItem) => void;
}

function Dropdown(props: Props): React.JSX.Element {
  const [searchWord, setSearchWord] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>([]);
  const maxResults = 3;

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder={'Search'}
          onChangeText={text => {
            setSearchWord(text);

            if (text.trim() == '') {
              setFilteredItems([]);
              return;
            }

            var count = 0;
            let filtered = props.items.filter((item: DropdownItem) => {
              let include = item.name
                .toLowerCase()
                .includes(searchWord.toLowerCase());

              if (include && count < maxResults) {
                count++;
                return true;
              }

              return false;
            });

            setFilteredItems(filtered);
          }}
          value={searchWord}
          editable={!disabled}
        />
        {props.onCreateRecordPress ? (
          <TouchableOpacity
            style={styles.createRecord}
            activeOpacity={0.7}
            onPress={() => {
              if (disabled) {
                setDisabled(false);
                setSearchWord('');
                props.onSelect(null);
                return;
              }
              // @ts-ignore
              props.onCreateRecordPress(searchWord, setDisabled);
            }}>
            {undefined !== props.onCreateRecordPress ? (
              <View style={disabled ? styles.remove : styles.add}>
                <Plus />
              </View>
            ) : (
              ''
            )}
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
      <ScrollView style={styles.list}>
        {!disabled && props.items.length > 0
          ? filteredItems.map((item: DropdownItem) => (
              <TouchableOpacity
                style={styles.option}
                key={item.id}
                onPress={() => {
                  setDisabled(true);
                  setSearchWord(item.name);
                  console.log(item);
                  props.onSelect(item);
                }}
                onLongPress={() => {
                  if (props.onDeleteRecord) {
                    props.onDeleteRecord(item);
                  }
                }}>
                <Text style={styles.listItem}>{item.name}</Text>
              </TouchableOpacity>
            ))
          : ''}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    color: '#ccc',
    width: '93%',
  },
  remove: {
    transform: 'rotate(-45deg)',
  },
  add: {},
  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#333',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#333',
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'white',
    alignContent: 'center',
  },
  createRecord: {
    width: '5%',
    height: 20,
    marginRight: '2%',
  },
  list: {
    width: '100%',
    height: 200,
  },
  listItem: {
    color: '#ccc',
  },
});

export default Dropdown;
