import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

// Define the props for the SearchBar component
interface Props {
    placeholder?: string; // always be string, but can be empty
    onPress?: () => void; // function to call when the search bar is pressed
}

const SearchBar = ({ placeholder, onPress }: Props) => { // Destructure props coming from index.tsx
  return (
    <View className='flex-row items-center bg-dark-100 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode="contain"
        tintColor="#ab8bff"
      />

      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=''
        onChangeText={() => {}}
        placeholderTextColor={'#ab8bff'}
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar