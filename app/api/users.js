import * as firebase from "firebase";
import "firebase/firestore";
const db = firebase.firestore();

const getUser = async (userId) => {
  let data;
  try {
    const docRef = await db.collection("users").doc(userId).get();
    if (docRef.exists) {
      data = docRef.data();
    } else {
      console.log("No such document!");
      data = null;
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
  return data;
};

export default { getUser };
