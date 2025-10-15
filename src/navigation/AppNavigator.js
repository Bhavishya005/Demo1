import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import BootSplash from "react-native-bootsplash";

// Screens
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import UserDetailsScreen from '../screens/UserDeatilsScreen';
import UserListScreen from '../screens/UserListScreen';
import { useSelector } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const { totalCount } = useSelector(state => state.cart);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = { Products: 'list', Users: 'people' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: true, 
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Cart')}
          >
            <View style={{ position: 'relative' }}>
              <Ionicons name="cart" size={28} color="tomato" />
              {totalCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -6,
                    backgroundColor: 'red',
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {totalCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Users" component={UserListScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer
      onReady={async () => {
        await BootSplash.hide({ fade: true });
      }}
      linking={{
        prefixes: ['myapp://'],
        config: {
          screens: {
            Products: 'products',
            Users: 'users',
            Cart: 'cart',
            UserDetails: 'user/:userId',
          },
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: 'User Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// export default function AppNavigator() {
//       const { totalCount } = useSelector(state => state.cart);

//   return (
//     <NavigationContainer linking={{
//       prefixes: ['myapp://'],
//       config: {
//         screens: {
//           Home: { screens: { Users: 'users' } },
//           UserDetails: 'user/:userId',
//         },
//       },
//     }}>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeTabs}
//           options={({ navigation }) => ({
//             headerShown: true,
//             title: 'Home',
//             headerRight: () => (
//               <TouchableOpacity
//                 style={{ marginRight: 16 }}
//                 onPress={() => navigation.navigate('Cart')}
//               >
//                 <View style={{ position: 'relative' }}>
//                   <Ionicons name="cart" size={28} color="tomato" />
//                   {totalCount > 0 && (
//                     <View
//                       style={{
//                         position: 'absolute',
//                         right: -6,
//                         top: -6,
//                         backgroundColor: 'red',
//                         borderRadius: 8,
//                         width: 16,
//                         height: 16,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//                         {totalCount}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             ),
//           })}
//         />
//         <Stack.Screen name="Cart" component={CartScreen} />
//         <Stack.Screen
//           name="UserDetails"
//           component={UserDetailsScreen}
//           options={{ title: 'User Details' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
   