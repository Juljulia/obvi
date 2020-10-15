import React from "react";

// Make the navigation object available to not only screen components (so that the user can navigate when clicking on a notification)
export const navigationRef = React.createRef();

const navigate = (name, params) => {
  // ?. mean that if this object is not null then the navigate method is going to get called
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};
