import React from "react";
import { styled } from "theme";

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
  isTextArea?: boolean;
  placeholder?: string;
  inputText: string;
  onChangeText: (text: string) => void;
}

const TextInput = (props: Props) => {
  const { inputText, placeholder, onChangeText, isTextArea = false } = props;

  return (
    <Wrapper>
      <StyledInput
        multiline={isTextArea}
        numberOfLines={isTextArea ? 5 : 1}
        isTextArea={isTextArea}
      />
    </Wrapper>
  );
};

export default TextInput;
