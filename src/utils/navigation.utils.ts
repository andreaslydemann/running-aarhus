import { NavigationActions, NavigationParams } from "react-navigation";

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

// add other navigation functions that you need and export them

export const navigation = {
  setNavigator,
  navigate,
  goBack
};
