// import { Movie } from '@/interfaces/interfaces'
import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

// MovieCard component for displaying a movie
const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => { // destructuring props directly in the function parameters, there are more you can add here
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%] bg-secondary rounded-lg p-2 gap-y-1'>
        <Image 
          source = {{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`
          }}

          className = "w-full h-52 rounded-lg"
          resizeMode = "cover"
        />

        <View>
          <Text className='text-white text-sm font-bold mt-2' numberOfLines={1}>{title}</Text>
        </View>

        <View className='flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4'/>
          <Text className='text-white text-xs font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
        </View>

        <View className='flex-row items-center justify-between'>
          <Text className='text-xs text-white font-medium mt-1'>{release_date?.split('-')[0]}</Text>
          <Text className='text-xs text-white font-medium mt-1'>Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard