import React, { Component } from "react";
import { styled } from "theme";
import Text from "./Text";
import i18n from "i18n-js";

interface Props {
  runDate: string;
}

interface CountdownCard {
  timer: number;
}

class CountdownCard extends Component<Props> {
  state = {
    timeLeft: 0
  };

  componentDidMount() {
    this.updateTimeLeft();
    if (this.props.runDate) {
      this.timer = setInterval(() => {
        this.updateTimeLeft();
      }, 1000);
    } else {
      this.setState({ timeLeft: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeLeft() {
    const timeLeft = Math.abs(
      (new Date(this.props.runDate) as any) - (new Date() as any)
    );
    this.setState({ timeLeft });
  }

  render() {
    const { timeLeft } = this.state;
    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const noData = timeLeft <= 0;

    return (
      <Wrapper>
        <Title>{i18n.t("nextRunStartsIn")}</Title>
        <TimeWrapper>
          <UnitWrapper>
            <Number>{noData ? "-" : days}</Number>
            <Unit>{i18n.t("days")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{noData ? "-" : hours % 24}</Number>
            <Unit>{i18n.t("hours")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{noData ? "-" : minutes % 60}</Number>
            <Unit>{i18n.t("minutes")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{noData ? "-" : seconds % 60}</Number>
            <Unit>{i18n.t("seconds")}</Unit>
          </UnitWrapper>
        </TimeWrapper>
      </Wrapper>
    );
  }
}

export default CountdownCard;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  border-radius: 15px;
  align-items: center;
  padding: 20px;
  flex-direction: column;
`;

const TimeWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const UnitWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const Number = styled(Text)`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.activeTint};
`;

const Unit = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.inactiveTint};
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.activeTint};
  margin-bottom: 10px;
`;
