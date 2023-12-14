import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewsDetails from '../screens/NewsDetails';
import CategoryList from '../screens/CategoryList';
import About from '../screens/About';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Onboarding from '../screens/Onboarding';

const AuthStack = ({...props}) => {
  // console.log('onboarding status', props.isOnboardingDisabled);
  const {isOnboardingDisabled} = props;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line no-undef
      initialRouteName={isOnboardingDisabled ? 'Splash' : 'Onboarding'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

AuthStack.prototypes = {
  isOnboardingDisabled: PropTypes.bool.isRequired,
};

// eslint-disable-next-line prettier/prettier
const mapStateToProps = state => {
  return {
    isOnboardingDisabled: state.auth.isOnboardingDisabled,
  };
};

export default connect(mapStateToProps)(AuthStack);
