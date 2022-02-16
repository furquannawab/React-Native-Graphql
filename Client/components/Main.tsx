import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';

const CREATE_CATEGORY = gql`
  mutation ($name: String!) {
    addCategory(input: {name: $name}) {
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation ($input: ID!) {
    deleteCategory(input: $input)
  }
`;

const Main = () => {
  // const [name, setName] = useState<string>('');

  const [mutateFunction, {loading, data, error}] = useMutation(CREATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
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

  console.log(data);

  return (
    <View style={styles.container}>
      {/* <TextInput placeholder="Name" onChangeText={setName} value={name} /> */}
      <Button
        onPress={() => {
          mutateFunction({
            variables: {
              name: 'Electronics',
            },
          });
        }}
        title="Create"
      />
      <Button
        onPress={() => {
          deleteCategory({
            variables: {
              input: '39f45777-bd18-40cd-a318-0e7d0e66193a',
            },
          });
        }}
        title="Delete"
      />
      <Text>{data?.addCategory.name}</Text>
    </View>
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

export default Main;
