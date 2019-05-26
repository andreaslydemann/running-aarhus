import * as React from "react";
import {
  Animated,
  BackHandler,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
  Keyboard,
  Text
} from "react-native";
import { theme } from "theme";

interface ActionSheetActionsProps {
  options: any;
  destructiveButtonIndex?: number;
  onSelect: any;
  startIndex: number;
  length: number;
  title?: string;
  message?: string;
  cancelButtonIndex?: number;
  testID?: string;
}

class ActionSheetActions extends React.Component<ActionSheetActionsProps> {
  static defaultProps = {
    title: null,
    message: null
  };

  render() {
    const {
      options,
      destructiveButtonIndex,
      onSelect,
      startIndex,
      length,
      cancelButtonIndex,
      testID
    } = this.props;

    const optionViews = [];

    const messageContent = this.renderTitleContent();
    const hasMessage = !!messageContent;

    for (let i = startIndex; i < startIndex + length; i++) {
      const color =
        i === destructiveButtonIndex ? theme.danger : theme.activeTint;
      const isCancel = cancelButtonIndex === i;
      const defaultTextStyle = isCancel ? styles.cancelButtonText : null;
      const firstStyle =
        i === startIndex && !hasMessage ? styles.firstButtonContainer : null;
      const lastStyle =
        i === startIndex + length - 1 ? styles.lastButtonContainer : null;
      const text = options[i];
      const actionTestID = testID ? testID + "Button_" + text : null;

      optionViews.push(
        <View key={i} style={[styles.buttonContainer, firstStyle, lastStyle]}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onSelect(i)}
            style={styles.button}
            testID={actionTestID || undefined}
          >
            <Text style={[styles.buttonText, defaultTextStyle, { color }]}>
              {text}
            </Text>
          </TouchableOpacity>
        </View>
      );

      if (i < startIndex + length - 1) {
        optionViews.push(this.renderRowSeparator(i));
      }
    }

    return (
      <View style={styles.groupContainer}>
        {this.renderTitleContent()}
        <View>{optionViews}</View>
      </View>
    );
  }

  renderRowSeparator(key: any) {
    return (
      <View
        key={key ? `separator-${key}` : undefined}
        style={[styles.rowSeparator]}
      />
    );
  }

  renderTitleContent() {
    const { title, message } = this.props;

    if (!title && !message) {
      return null;
    }

    return (
      <View>
        <View style={[styles.titleContainer]}>
          {!!title && (
            <Text accessibilityRole="header" style={[styles.title]}>
              {title}
            </Text>
          )}
          {!!message && <Text style={[styles.message]}>{message}</Text>}
        </View>
        {this.renderRowSeparator("title")}
      </View>
    );
  }
}

interface ActionSheetProps {
  open: boolean;
  options: any;
  onSelect?: any;
  onExited?: any;
  testID?: string;
}

export class ActionSheet extends React.Component<ActionSheetProps> {
  static ANIMATION_IN_DURATION = 225;
  static ANIMATION_OUT_DURATION = 165;
  static EASING_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
  static EASING_IN = Easing.out(ActionSheet.EASING_OUT);
  private readonly actionSheet: any;

  actionSheetHeight = 360;

  state = {
    isVisible: false,
    isAnimating: false,
    overlayOpacity: new Animated.Value(0),
    sheetOpacity: new Animated.Value(0)
  };

  constructor(props: ActionSheetProps) {
    super(props);
    this.actionSheet = React.createRef();
  }

  componentDidUpdate(prevProps: ActionSheetProps) {
    if (this.props.options.message && this.props.options.message.length > 160) {
      console.warn(
        "[ActionSheet] The message should have a max length of 160 chars."
      );
    }
    if (this.props.options.options && this.props.options.options.length > 3) {
      console.warn("[Dialog] The options should have a max length of 3.");
    }

    const { open } = this.props;

    if (prevProps.open !== open) {
      open && Keyboard.dismiss();
      this.handlePropsVisibilityChange(open);
    }
  }

  handlePropsVisibilityChange = (open: boolean) => {
    if (open) {
      this.show();
    } else {
      this.hide();
    }
  };

  setActionSheetHeight = ({ nativeEvent }: any) =>
    (this.actionSheetHeight = nativeEvent.layout.height);

  render() {
    const { isVisible, overlayOpacity } = this.state;
    if (isVisible) {
      return (
        <View style={styles.root}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity
              }
            ]}
          />
          {this.renderActionSheetActions()}
        </View>
      );
    }

    return null;
  }

  renderActionSheetActions() {
    const { isAnimating, sheetOpacity } = this.state;
    const { options, testID } = this.props;

    if (!options) {
      return null;
    }

    const {
      options: optionsArray,
      // destructiveButtonIndex,
      cancelButtonIndex,
      title,
      message
    } = options;
    return (
      <Animated.View
        needsOffscreenAlphaCompositing={isAnimating}
        style={[
          styles.sheetContainer,
          {
            opacity: sheetOpacity,
            transform: [
              {
                translateY: sheetOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.actionSheetHeight, 0]
                })
              }
            ]
          }
        ]}
      >
        <View
          style={styles.sheet}
          onLayout={this.setActionSheetHeight}
          ref={this.actionSheet}
          accessibilityViewIsModal={true}
          accessibilityLabel="actionSheet"
        >
          <ActionSheetActions
            options={optionsArray}
            cancelButtonIndex={cancelButtonIndex}
            onSelect={this.onSelect}
            startIndex={0}
            length={optionsArray.length}
            title={title || null}
            message={message || null}
            testID={testID}
          />
        </View>
      </Animated.View>
    );
  }

  show() {
    const { overlayOpacity, sheetOpacity } = this.state;

    this.setState({
      isVisible: true,
      isAnimating: true
    });

    overlayOpacity.setValue(0);
    sheetOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        easing: ActionSheet.EASING_OUT,
        duration: ActionSheet.ANIMATION_IN_DURATION,
        useNativeDriver: true
      }),
      Animated.timing(sheetOpacity, {
        toValue: 1,
        easing: ActionSheet.EASING_OUT,
        duration: ActionSheet.ANIMATION_IN_DURATION,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isAnimating: false
        });
      }
    });
    if (typeof this.props.options.cancelButtonIndex === "number") {
      BackHandler.addEventListener(
        // @ts-ignore
        "actionSheetHardwareBackPress",
        this.selectCancelButton
      );
    }
  }

  selectCancelButton = () => {
    if (!this.props.options) {
      return false;
    }

    if (typeof this.props.options.cancelButtonIndex === "number") {
      return this.onSelect(this.props.options.cancelButtonIndex);
    } else {
      return this.hide();
    }
  };

  onSelect = (index: number) => {
    const { isAnimating } = this.state;

    if (isAnimating) {
      return;
    }

    this.props.onSelect && this.props.onSelect(index);

    return;
  };

  hide = () => {
    const { isAnimating, overlayOpacity, sheetOpacity } = this.state;

    if (isAnimating) {
      return false;
    }

    if (typeof this.props.options.cancelButtonIndex === "number") {
      BackHandler.removeEventListener(
        // @ts-ignore
        "actionSheetHardwareBackPress",
        this.selectCancelButton
      );
    }

    this.setState({
      isAnimating: true
    });

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        easing: ActionSheet.EASING_IN,
        duration: ActionSheet.ANIMATION_OUT_DURATION,
        useNativeDriver: true
      }),
      Animated.timing(sheetOpacity, {
        toValue: 0,
        easing: ActionSheet.EASING_IN,
        duration: ActionSheet.ANIMATION_OUT_DURATION,
        useNativeDriver: true
      })
    ]).start(result => {
      if (result.finished) {
        this.setState({
          isVisible: false,
          isAnimating: false
        });

        if (this.props.onExited) {
          this.props.onExited();
        }
      }
    });

    return true;
  };
}

const styles = StyleSheet.create({
  root: StyleSheet.absoluteFillObject,
  groupContainer: {
    backgroundColor: theme.primary,
    borderRadius: 16,
    margin: 24
  },
  buttonContainer: {
    backgroundColor: "#rgba(0,0,0,0.15)"
  },
  // eslint-disable-next-line
  firstButtonContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  // eslint-disable-next-line
  lastButtonContainer: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 54,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 16,
    color: theme.activeTint,
    textAlignVertical: "center",
    fontWeight: "500"
  },
  // eslint-disable-next-line
  cancelButtonText: {
    fontWeight: "400"
  },
  rowSeparator: {
    backgroundColor: theme.primary,
    height: 1,
    width: "100%"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF"
  },
  sheetContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row"
  },
  sheet: {
    flex: 1
  },
  titleContainer: {
    alignItems: "center",
    padding: 24
  },
  title: {
    color: theme.activeTint,
    fontWeight: "500",
    textAlign: "center"
  },
  message: {
    marginTop: 6,
    color: theme.activeTint,
    textAlign: "center"
  }
});
