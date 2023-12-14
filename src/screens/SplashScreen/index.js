import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setTokenInterceptor} from '../../utils/setTokenInterceptor';

const SplashScreen = ({...props}) => {
  const {isLoggedIn, user} = props;

  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();
  console.log(theme);

  const {background, dark} = theme;

  const hideSplashScreen = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        setTokenInterceptor(user);
      }

      hideSplashScreen();
      navigation.navigate(isLoggedIn ? 'Home' : 'Login');
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSplash = () => {
    return (
      <View style={styles().SplashScreen_RootView}>
        <View style={styles().SplashScreen_ChildView}>
          <Image
            source={
              dark
                ? require('../../assets/onboard5.jpeg')
                : require('../../assets/onboard6.png')
            }
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles(background).MainContainer}>
      {isVisible === true ? renderSplash() : null}
    </View>
  );
};

SplashScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
