import React, { Component } from "react";
import styled from "styled-components";
import i18n from "i18n-js";

interface Props {
  runDate?: string;
}

export default class extends Component<Props> {
  state = {
    timeLeft: 0
  };

  componentDidMount() {
    console.log(this.props.runDate);
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
    const timeLeft = new Date(this.props.runDate) - new Date();
    this.setState({ timeLeft });
  }

  render() {
    const { timeLeft } = this.state;
    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const NoData = timeLeft <= 0;

    return (
      <Wrapper>
        <Title>Time until next run:</Title>
        <TimeWrapper>
          <UnitWrapper>
            <Number>{NoData ? "-" : days}</Number>
            <Unit>{i18n.t("days")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{NoData ? "-" : hours % 24}</Number>
            <Unit>{i18n.t("hours")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{NoData ? "-" : minutes % 60}</Number>
            <Unit>{i18n.t("minutes")}</Unit>
          </UnitWrapper>
          <UnitWrapper>
            <Number>{NoData ? "-" : seconds % 60}</Number>
            <Unit>{i18n.t("seconds")}</Unit>
          </UnitWrapper>
        </TimeWrapper>
      </Wrapper>
    );
  }
}

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

const Number = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: white;
`;

const Unit = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
`;

const Title = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
  margin-bottom: 10px;
`;
