import React from "react";

const ClickContext = React.createContext();
export default ClickContext;

export const ClickProvider = props => {
  const [clickEvent, setClickEvent] = React.useState();
  return (
    <ClickContext.Provider value={{ clickEvent, setClickEvent }}>
      {props.children}
    </ClickContext.Provider>
  );
}
