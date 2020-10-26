import { useContext } from "react";
import * as firebase from "firebase";

import AuthContext from "./context";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  return { user, logOut };
};
