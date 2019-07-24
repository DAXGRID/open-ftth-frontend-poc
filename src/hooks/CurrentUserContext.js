import React from "react";
import useLocalStorage from "./useLocalStorage";

const CurrentUserContext = React.createContext();
export default CurrentUserContext;

export const CurrentUserProvider = props => {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser");

  if (!currentUser) {
    setCurrentUser(users[1]);
  }

  const setCurrentUserID = id => {
    return setCurrentUser(users[id]);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUserID }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};


const users = {
  1: {
    id: 1,
    name: "Planner User",
    role: "planner",
    permissions: {
      editableFeatureTypes: ["duct", "cabinet", "customer_connection"]
    },
    avatar: "https://i.pravatar.cc/100?img=32"
  },
  2: {
    id: 2,
    name: "Installer User",
    role: "installer",
    permissions: {
      editableFeatureTypes: ["customer_connection"],
      canOnlyAddToExistingFeatureLayers: {
        lines: { cabinet: "physical-type-cabinet" }
      },
      drawControls: {
        line_string: true,
        trash: true
      }
    },
    avatar: "https://i.pravatar.cc/100?img=8"
  },
  3: {
    id: 3,
    name: "Viewer User",
    role: "viewer",
    editableFeatureTypes: [],
    avatar: "https://i.pravatar.cc/100?img=5",
    permissions: {}
  }
};
