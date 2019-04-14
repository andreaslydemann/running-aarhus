import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components";
import { styled } from "theme";
import { Action } from "actions/common";
import * as actions from "actions";
import { connect } from "react-redux";

interface PropsConnectedDispatcher {
  getScheduledRuns: () => Action<void>;
}

interface Props extends PropsConnectedDispatcher {
  navigation: { navigate: (screen: string) => void };
}

class ScheduleScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.getScheduledRuns();
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("scheduleTitle")} />
      </Wrapper>
    );
  }
}

export default connect(
  null,
  actions
)(ScheduleScreen as React.ComponentClass<Props>);

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;
