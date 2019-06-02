import {
  NavigationActions,
  NavigationParams,
  StackActions
} from "react-navigation";

let _navigator: any;

function setNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: NavigationParams) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function reset() {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "Auth" })]
    })
  );
}

export const navigation = {
  setNavigator,
  navigate,
  goBack,
  reset
};
