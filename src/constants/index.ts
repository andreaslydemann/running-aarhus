import { config, RUNNING_AARHUS_FUNCTIONS_URL } from "./config/firebase_config";

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

export {
  TABBAR_ICONS,
  TABS,
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  config,
  RUNNING_AARHUS_FUNCTIONS_URL
};
