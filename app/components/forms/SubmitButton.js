import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, style, disabledStyle, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      title={title}
      onPress={handleSubmit}
      {...otherProps}
      disabledStyle={disabledStyle}
      style={style}
    />
  );
}

export default SubmitButton;
