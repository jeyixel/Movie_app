import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchFromTMDB } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

const search = () => {
  const router = useRouter();

  // destructured properties from useFetch hook (autoFetch = false)
  const { data: movies, loading: moviesLoading, error: moviesError, refetch } = useFetch(() => fetchFromTMDB({ query: '' }), false);

  useEffect(() => {
    refetch();
  }, []);

  return (
    // background image and color
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0 resizeMode = "cover"' />

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
              <Text className='text-white text-lg font-bold ml-2'>Search</Text>
            </View>
          </>
        }
      />
    </View>
  )
}

export default search