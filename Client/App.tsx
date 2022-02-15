import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.129:4000/graphql',
  cache: new InMemoryCache(),
});

const GET_PRODUCT = gql`
  query {
    product(id: "53a0724c-a416-4cac-ae45-bfaedce1f147") {
      name
      category {
        name
      }
      reviews {
        title
      }
    }
  }
`;

const Reviews = () => {
  const {loading, data, error} = useQuery(GET_PRODUCT);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{data.product.name}</Text>
      <Text>{data.product.category.name}</Text>
      {data.product.reviews.map((review: any) => (
        <Text>{review.title}</Text>
      ))}
    </View>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <ScrollView>
          <Reviews />
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default App;
