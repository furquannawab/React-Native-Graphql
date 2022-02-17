import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {gql, useMutation, useQuery} from '@apollo/client';

type Category = {
  id: Number;
  name: String;
};

type Categories = {
  categories: Category[];
};

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

const UPDATE_CATEGORY = gql`
  mutation ($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
    }
  }
`;

const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

const Main = () => {
  // const [name, setName] = useState<string>('');
  const {loading, data, error} = useQuery<Categories>(GET_CATEGORIES);
  const [addCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{query: GET_CATEGORIES}],
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{query: GET_CATEGORIES}],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{query: GET_CATEGORIES}],
  });
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
          addCategory({
            variables: {
              name: 'New Category',
            },
          });
        }}
        title="Create"
      />

      <Button
        onPress={() => {
          updateCategory({
            variables: {
              id: '26521d3c-00d4-4e4b-8fd1-4cf817abcb06',
              input: {
                name: 'Category New',
              },
            },
          });
        }}
        title="Update"
      />
      <Button
        onPress={() => {
          deleteCategory({
            variables: {
              input: '26521d3c-00d4-4e4b-8fd1-4cf817abcb06',
            },
          });
        }}
        title="Delete"
      />
      {data?.categories.map(category => (
        <Text>{category.name}</Text>
      ))}
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
