import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Main from './components/Main';

const client = new ApolloClient({
  uri: 'http://192.168.0.112:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <ScrollView>
          <Main />
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
