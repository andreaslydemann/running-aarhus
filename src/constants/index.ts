import * as Localization from "expo-localization";
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

const REVERSE_GEOCODE_URL =
  "http://nominatim.openstreetmap.org/reverse?format=json";

const APP_STORE_URL = `itms-apps://itunes.apple.com/${
  Localization.country
}/app/running-aarhus/id1470246963?mt=8`;

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.andreaslydemann.runningaarhus";

const RUN_TYPES = {
  SCHEDULE: "SCHEDULE",
  PLANNING: "PLANNING",
  PAST: "PAST"
};

const DETAILS_REDUCERS = {
  SCHEDULE: "scheduleDetails",
  PLANNING: "planningDetails",
  PAST: "pastDetails"
};

const GET_INITIAL_STATE = "GET_INITIAL_STATE";

export {
  TABBAR_ICONS,
  TABS,
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  FIREBASE_ACCOUNT,
  RUNNING_AARHUS_FUNCTIONS_URL,
  REVERSE_GEOCODE_URL,
  APP_STORE_URL,
  PLAY_STORE_URL,
  DETAILS_REDUCERS,
  RUN_TYPES,
  GET_INITIAL_STATE
};
