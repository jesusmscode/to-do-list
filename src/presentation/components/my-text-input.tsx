import * as React from "react";
import { TextInput } from "react-native-paper";

const MyTextInput = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      style={{ width: 300, marginVertical: 20 }}
      label="new task"
      value={text}
      onChangeText={(text) => setText(text)}
    />
  );
};

export default MyTextInput;
