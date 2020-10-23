import React, { useState } from "react";
import { StyleSheet } from "react-native";

import ImagePicker from "../../components/ImagePicker";
import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";

function PhotoScreen({ navigation, route }) {
  const { username, pronoun, orientation, passions } = route.params;
  const [image, setImage] = useState();

  const handleImage = (uri) => {
    setImage(uri);
  };

  return (
    <FormScreen
      title="Add photo"
      page="6"
      totalPages="7"
      onPress={() =>
        navigation.navigate(routes.REGISTERLOCATION, {
          username,
          pronoun,
          orientation,
          passions,
          image,
        })
      }
    >
      <ImagePicker imageUri={image} onChangeImage={handleImage} />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PhotoScreen;
