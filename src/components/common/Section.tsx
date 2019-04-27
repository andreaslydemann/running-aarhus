import { styled } from "../../theme";

interface ButtonProps {
  top?: boolean;
  bottom?: boolean;
  disabled?: boolean;
}

const Section = styled.TouchableOpacity<ButtonProps>`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  height: 70px;
  ${props =>
    props.top &&
    `
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
    `} ${props =>
    props.bottom &&
    `
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    `} margin-top: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${props => props.disabled && `opacity: 0.3;`};
`;

export default Section;
