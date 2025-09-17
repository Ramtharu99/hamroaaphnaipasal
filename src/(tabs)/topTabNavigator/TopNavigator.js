import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryList from './CategoriesList';
import Attributes from './Attributes';
import AllProducts from './AllProducts';

const Tab = createMaterialTopTabNavigator();
const TopNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#1BB83A', height: 3 },
      }}
    >
      <Tab.Screen name="All" component={AllProducts} />
      <Tab.Screen name="Category" component={CategoryList} />
      <Tab.Screen name="Attribute" component={Attributes} />
    </Tab.Navigator>
  );
};

export default TopNavigator;

