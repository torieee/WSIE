import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

let selectedAllergyArray = [];

const MultiSelectListAllergy = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
      selectedAllergyArray = selectedItems;
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleItem(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{fontSize: 30, marginVertical: 4, color: selectedItems.includes(item) ? 'red' : 'black'}}>{item}</Text>
        {selectedItems.includes(item) && <Text style={{fontSize: 30, marginVertical: 4, color: 'red'}}> X</Text>}
      </View>
    </TouchableOpacity>
  );
  selectedAllergyArray = selectedItems;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedItems}
      />
    </View>
  );
};

export { MultiSelectListAllergy, selectedAllergyArray }