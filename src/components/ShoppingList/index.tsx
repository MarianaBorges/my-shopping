import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestone from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(()=>{
    const subscribe = firestone()
      .collection('products')
      .onSnapshot(response => {
        const data = response.docs.map(doc =>{
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[];

        setProducts(data);
      });

      return () => subscribe();
  },[])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
