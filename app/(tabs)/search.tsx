import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchFromTMDB } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SearchBar } from 'react-native-screens';

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  // destructured properties from useFetch hook (autoFetch = false)
  const { data: movies, loading, error, refetch } = useFetch(() => fetchFromTMDB({ query: '' }), false);

  useEffect(() => {
    refetch();
  }, []);

  return (
    // background image and color
    <View className='flex-1 bg-primary'>
  <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      {/* rendering all movies */}
      <FlatList 
        data={movies} 
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'space-between', 
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}

        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder='Search for a movie'/>
            </View>

            {/* loading screen */}
            {loading && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3'/>
            )}

            {/* if there's an error */}
            {error && (
              <Text className = 'text-red-500 px-5 my-3'>Error: {error.message}</Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">SEARCH TERM</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  )
}

export default search