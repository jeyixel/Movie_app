import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (

    // these are used to hide the top

    <Tabs>
        <Tabs.Screen
            name = "index"
            options={{
                title: 'Home', // home cuz this is the home page
                headerShown: false
            }}
        />

        <Tabs.Screen
            name = "search"
            options={{
                title: 'Search',
                headerShown: false
            }}
        />

        <Tabs.Screen
            name = "saved"
            options={{
                title: 'Saved',
                headerShown: false
            }}
        />

        <Tabs.Screen
            name = "profile"
            options={{
                title: 'Profile',
                headerShown: false
            }}
        />


    </Tabs>
  )
}

export default _layout