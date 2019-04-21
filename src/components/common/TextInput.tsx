import React from "react";
import { styled } from "theme";

const Wrapper = styled.View`
  width: 90%;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 20px;
  margin: 20px;
  color: white;
  background: white;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  flex: 1;
`;

interface Props {
  placeholder?: string;
  inputText: string;
  onChangeText: (text: string) => void;
}

const TextInput = (props: Props) => {
  const { inputText, placeholder, onChangeText } = props;

  return (
    <Wrapper>
      <StyledInput
        value={inputText}
        placeholder={placeholder}
        placeholderTextColor="#777"
        clearButtonMode="always"
        onChangeText={text => onChangeText(text)}
      />
    </Wrapper>
  );
};

export default TextInput;
