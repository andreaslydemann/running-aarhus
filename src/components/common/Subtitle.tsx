import { styled, THEME_PREFIX } from "theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  ScaleAnimation
} from "react-native-popup-dialog";
import i18n from "i18n-js";

interface State {
  dialogVisible: boolean;
}

interface Props {
  titleText: string;
  showInfoIcon: boolean;
  dialogTitle?: string;
  dialogText?: string;
}

export default class Subtitle extends Component<Props, State> {
  state = {
    dialogVisible: false
  };

  render() {
    return (
      <View>
        <SubtitleWrapper>
          <SubtitleText>{this.props.titleText}</SubtitleText>
          {this.props.showInfoIcon && (
            <IconWrapper>
              <TouchableOpacity
                onPress={() => this.setState({ dialogVisible: true })}
              >
                <SubtitleIcon
                  name={`${THEME_PREFIX}-help-circle-outline`}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            </IconWrapper>
          )}
        </SubtitleWrapper>
        <Dialog
          onTouchOutside={() => {
            this.setState({ dialogVisible: false });
          }}
          width={0.89}
          visible={this.state.dialogVisible}
          dialogAnimation={new ScaleAnimation()}
          dialogTitle={
            <DialogTitle
              title={this.props.dialogTitle || ""}
              hasTitleBar={false}
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text={i18n.t("dismiss")}
                onPress={() => {
                  this.setState({ dialogVisible: false });
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            {this.props.dialogText && <Text>{this.props.dialogText}</Text>}
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const SubtitleIcon = styled(Ionicons)`
  justify-content: flex-end;
`;

const SubtitleText = styled.Text`
  flex: 1;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

const SubtitleWrapper = styled.View`
  flex-direction: row;
  margin: 0px 10px 5px 10px;
`;

const IconWrapper = styled.View`
  flex: 0.1;
  justify-content: flex-end;
`;
