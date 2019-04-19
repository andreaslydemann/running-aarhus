import {
  FIREBASE_ACCOUNT,
  RUNNING_AARHUS_FUNCTIONS_URL
} from "./config/firebase_config";

const FACEBOOK_APP_ID = "2292488901028008";
const FACEBOOK_TOKEN = "fb_token";

const TABS = {
  Schedule: "scheduleTitle",
  Planning: "planningTitle",
  Past: "pastTitle",
  Settings: "settingsTitle"
};

const TABBAR_ICONS = {
  Schedule: "ios-list",
  Planning: "ios-add-circle-outline",
  Past: "ios-checkmark-circle-outline",
  Settings: "ios-options"
};

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "oct",
  "sep",
  "nov",
  "dec"
];

export {
  MONTHS,
  TABBAR_ICONS,
  TABS,
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  FIREBASE_ACCOUNT,
  RUNNING_AARHUS_FUNCTIONS_URL
};
