import React from "react";
import { View, Platform } from "react-native";
import { styled, theme } from "theme";
import Text from "./Text";

// @ts-ignore
const isPad = Platform.isPad;

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  errorText?: string;
}

const TextInput = (props: Props) => {
  const {
    value,
    placeholder,
    onChangeText,
    isTextArea = false,
    errorText
  } = props;

  return (
    <View>
      <Wrapper>
        <StyledInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.inactiveTint}
          multiline={isTextArea}
          onChangeText={onChangeText}
          numberOfLines={isTextArea ? (isPad ? 10 : 5) : 1}
          isTextArea={isTextArea}
        />
      </Wrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </View>
  );
};

export default TextInput;

const Wrapper = styled.View`
  padding: 15px 20px;
  border-radius: 6px;
  font-size: 20px;
  background: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
`;

interface TextInputProps {
  isTextArea: boolean;
}

const StyledInput = styled.TextInput<TextInputProps>`
  text-align-vertical: ${props =>
    props.isTextArea && Platform.OS === "android" ? "top" : "center"};
  border-color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary};
  flex: 1;
  color: #fff;
  height: ${props => (props.isTextArea ? (isPad ? "200px" : "100px") : "36px")};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.danger};
  font-weight: bold;
  font-size: 14px;
  padding-top: 3px;
  padding-left: 20px;
`;
