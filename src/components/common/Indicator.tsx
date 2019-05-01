import React, { PureComponent } from "react";
import { Animated, Easing } from "react-native";

interface Props {
  animationEasing?: any;
  animationDuration?: number;
  animating?: number;
  interaction?: boolean;
  count?: number;
  renderComponent?: any;
  color: string;
  minScale: number;
  maxScale: number;
  style: any;
}

interface State {
  progress: any;
  animation?: any;
}

export class Indicator extends PureComponent<Props, State> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    animating: true,
    interaction: true,
    count: 1
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0)
    };

    // @ts-ignore
    this.mounted = false;
  }

  // @ts-ignore
  startAnimation({ finished } = {}) {
    let { progress } = this.state;
    let { interaction, animationEasing, animationDuration } = this.props;

    // @ts-ignore
    if (!this.mounted || false === finished) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });

    Animated.loop(animation).start();

    this.setState({ animation });
  }

  stopAnimation() {
    let { animation } = this.state;

    if (null == animation) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  }

  componentDidMount() {
    let { animating } = this.props;

    // @ts-ignore
    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    this.mounted = false;
  }

  componentWillReceiveProps(props: Props) {
    let { animating } = this.props;

    // @ts-ignore
    if (animating ^ props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  // @ts-ignore
  renderComponent(undefined: any, index: number) {
    let { progress } = this.state;
    let { renderComponent, count } = this.props;

    if ("function" === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    } else {
      return null;
    }
  }

  render() {
    let { count, ...props } = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
