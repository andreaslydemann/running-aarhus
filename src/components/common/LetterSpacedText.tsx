import React from "react";
import { View, Text } from "react-native";

interface LetterSpacedTextProps {
  children: string;
  spacing: number;
  viewStyle?: any;
  textStyle?: any;
}

interface LetterProps {
  children: string;
  spacing: number;
  textStyle?: any;
}

export default (props: LetterSpacedTextProps) => {
  const { children, spacing, viewStyle, textStyle } = props;
  const letters = children.split("");

  return (
    <View style={[{ flexDirection: "row" }, viewStyle]}>
      {letters.map((letter: string, index: number) => (
        <Letter
          key={index}
          spacing={spacingForLetterIndex(letters, index, spacing)}
          textStyle={textStyle}
        >
          {letter}
        </Letter>
      ))}
    </View>
  );
};

const spacingForLetterIndex = (
  letters: string[],
  index: number,
  spacing: number
) => (letters.length - 1 === index ? 0 : spacing);

const Letter = (props: LetterProps) => {
  const { children, spacing, textStyle } = props;
  const letterStyles = [textStyle, { paddingRight: spacing }];

  return <Text style={letterStyles}>{children}</Text>;
};
