import React from "react";
import { styled, theme } from "theme";

const Wrapper = styled.View`
  padding: 15px 20px;
  border-radius: 6px;
  font-size: 20px;
  margin: 20px 0px;
  background: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
`;

interface TextInputProps {
  isTextArea: boolean;
}

const StyledInput = styled.TextInput<TextInputProps>`
  border-color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary};
  flex: 1;
  color: #fff;
  height: ${props => (props.isTextArea ? "100px" : "36px")};
`;

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
}

const TextInput = (props: Props) => {
  const { value, placeholder, onChangeText, isTextArea = false } = props;

  return (
    <Wrapper>
      <StyledInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.inactiveTint}
        multiline={isTextArea}
        onChangeText={onChangeText}
        numberOfLines={isTextArea ? 5 : 1}
        isTextArea={isTextArea}
      />
    </Wrapper>
  );
};

export default TextInput;
