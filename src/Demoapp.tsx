import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import { fetchProducts } from './thunk';
import { ActivityIndicator, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ProductActions } from './CartSlice';

const DemoApp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isLoading, items, myCart } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Item has been added to cart!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const handleAddToCart = (item) => {
    try {
      dispatch(ProductActions.addToCart(item));
      showToast();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getcount = (itemId) => {

    const productInCart = myCart.find((product) => product.id === itemId);
    return productInCart ? productInCart.count : 0;
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.button}>
        <Text style={styles.buttontxt}>Go to Cart</Text>
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <Card.Content>
                  <Image source={{ uri: item.images[0] }} style={styles.squareImage} />
                  <View style={styles.imgtxt}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.price}>{'\u20B9'}{item.price}</Text>
                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        onPress={() => dispatch(ProductActions.decrementCounter(item.id))}
                        style={styles.decrementButton}
                      >
                        <Text style={styles.incrementButtontxt}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.container1}>{getcount(item.id)}</Text>
                      <TouchableOpacity
                        onPress={() => dispatch(ProductActions.incrementCounter(item.id))}
                        style={styles.incrementButton}
                      >
                        <Text style={styles.incrementButtontxt}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.gobtn}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.gobuttontxt}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 4,
    padding: 10,
  },
  squareImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imgtxt: {
    marginTop: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginVertical: 4,
    textAlign: 'center',
  },
  gobtn: {
    backgroundColor: '#6200EE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 8,
  },
  gobuttontxt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  buttontxt: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  incrementButton: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  decrementButton: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  incrementButtontxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container1: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    width: 40,
    fontSize: 16,
  },
});

export default DemoApp;
