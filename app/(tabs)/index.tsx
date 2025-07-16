import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { fetchFromTMDB } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  // gives you programmatic navigation control similar to useNavigation
  const router = useRouter();

  // destructured properties from useFetch hook (autoFetch = false)
  const { data: movies, loading: moviesLoading, error: moviesError, refetch } = useFetch(() => fetchFromTMDB({ query: '' }), false);

  // Trigger fetch on mount
  useEffect(() => {
    refetch();
  }, []);

  return (

    <View className="flex-1 bg-primary">
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full" z-0/>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator = {false} contentContainerStyle={{
        minHeight: "100%", 
        paddingBottom: 10
      }}> 

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />

        ) : moviesError ? (
          // Display error message if there is an error
          <Text>Error: {moviesError?.message}</Text>

        ) : (
          // Display the list of movies
          <View className="flex-1 mt-5">
            <SearchBar
              // props for search bar
              onPress={() => router.push('/search')}
              placeholder='Search for a movie'
            />

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest movies</Text>
            </>

            <FlatList
              data = {movies}
              renderItem={({ item }) => (

                <MovieCard
                  {...item} // spread operator to pass all item properties as props
                />
                // <Text className="text-white text-sm">{item.title}</Text>

              )}
              keyExtractor={(item) => item.id.toString()} // may need to add .toString
              scrollEnabled = {false} // gets an error without this
              numColumns={3} // will display 3 items per row

              columnWrapperStyle={{ 
                justifyContent: 'flex-start', // flex start means items will be aligned to the start of the row
                gap: 20, // space between items
                paddingRight: 5,
                marginBottom: 10
              }}

              className="mt-2 pb-32"
            />
          </View>
        )}

        

      </ScrollView>

    </View>
  );
}
