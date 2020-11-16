import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInput from "../TextInput";

function AppFormField({ name, width, inputStyle, onPress, ...otherProps }) {
  const {
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
    values,
    style,
  } = useFormikContext();
  return (
    <>
      <TextInput
        style={[style, { marginTop: 8, marginBottom: 8 }]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        inputStyle={inputStyle}
        onPress={onPress}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
