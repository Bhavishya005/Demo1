import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 80;

// Generate mock data
const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 5000; i++) {
    products.push({
      id: i,
      title: `Product ${i}`,
      price: (Math.random() * 100 + 10).toFixed(2),
      description: `This is a description for product ${i}`,
    });
  }
  return products;
};

const ProductItem = React.memo(({ item, onAddToCart }) => {
  return (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
});

export default function ProductListScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const allProducts = useMemo(() => generateProducts(), []);
  const displayedProducts = useMemo(() => 
    allProducts.slice(0, page * itemsPerPage), 
    [allProducts, page]
  );

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!loading && displayedProducts.length < allProducts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage(prev => prev + 1);
        setLoading(false);
      }, 500);
    }
  }, [loading, displayedProducts.length, allProducts.length]);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#ff4400ff" />
      </View>
    );
  }, [loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products ({displayedProducts.length})</Text>
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem item={item} onAddToCart={handleAddToCart} />
        )}
        getItemLayout={getItemLayout}
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    height: ITEM_HEIGHT,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: 'tomato',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingFooter: {
    padding: 16,
    alignItems: 'center',
  },
});