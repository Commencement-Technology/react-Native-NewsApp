import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({user, isLoggedIn, accessToken}) => {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsData();
    fetchCategories();
  }, []);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://authnewsapp.onrender.com/api/news/getAllNews/slider',
      );
      setNewsData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching news data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://authnewsapp.onrender.com/api/category/getAllCategories',
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const renderNewsItem = ({item}) => (
    <TouchableOpacity style={styles.newsItemContainer}>
      <Image source={{uri: item.newsImage}} style={styles.newsImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
      </View>
      <Text style={styles.newsContent}>{item.content}</Text>
      <View style={styles.socialContainer}>
        <Icon name="facebook" size={30} color="#4267B2" />
        <Icon name="twitter" size={30} color="#1DA1F2" />
        <Icon name="instagram" size={30} color="#E1306C" />
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.category_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={newsData}
        renderItem={renderNewsItem}
        sliderWidth={400}
        itemWidth={300}
        layout="default"
        loop
        autoplay
        containerCustomStyle={styles.carouselContainer}
      />
      <FlatList
        data={categories}
        keyExtractor={item => item._id}
        renderItem={renderCategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />
      <FlatList
        data={newsData}
        keyExtractor={item => item._id}
        renderItem={renderNewsItem}
        onRefresh={fetchNewsData}
        refreshing={loading}
        style={{backgroundColor: 'black'}} // Set the background color of the news list to black
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  carouselContainer: {
    height: 200, // Set a fixed height for the Carousel
  },
  categoriesList: {
    marginBottom: 1,
  },
  newsItemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'black', // Set the background color to black
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#e1e1e1',
    paddingBottom: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white', // Set the text color to white
  },

  newsContent: {
    fontSize: 14,
    color: 'white', // Set the text color to white
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  shareButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryItem: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    height: 40,
  },
  categoryText: {
    color: '#ffffff',
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

export default connect(mapStateToProps)(Home);
