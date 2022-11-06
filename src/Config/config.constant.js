export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const DISPLAY_NAME = "displayName";
export const LANG = "lang";

const dev = {
  API_URL: "https://clientapi.rihand.com.az/api",
  BOOKING_URL: "https://booking.rihand.com.az/",
  GOOGLE_RECAPTCHA_KEY: "6LeD-I4dAAAAAKWjpNVbQGL6SxiY8qQ0ZucX05xs",
  GOOGLE_MAP_API_KEY: "AIzaSyCK_50mUzScfEHJcToEx2gAWvwOiVryBQE"
};

const test = {
  API_URL: "https://clientapi.rihand.com.az/api",
  BOOKING_URL: "https://booking.rihand.com.az/",
  GOOGLE_RECAPTCHA_KEY: "6LeD-I4dAAAAAKWjpNVbQGL6SxiY8qQ0ZucX05xs",
  GOOGLE_MAP_API_KEY: "AIzaSyCK_50mUzScfEHJcToEx2gAWvwOiVryBQE"
};

const prod = {
  API_URL: "https://clientapi.rihand.az/api",
  BOOKING_URL: "https://booking.rihand.az/",
  GOOGLE_RECAPTCHA_KEY: "6LeD-I4dAAAAAKWjpNVbQGL6SxiY8qQ0ZucX05xs",
  GOOGLE_MAP_API_KEY: "AIzaSyCK_50mUzScfEHJcToEx2gAWvwOiVryBQE"
};

let obj = {};

switch (process.env.REACT_APP_NODE_ENV) {
  case "dev":
    obj = dev;
    break;
  case "test":
    obj = test;
    break;
  default:
    obj = dev;
}

export const API_URL = obj.API_URL;
export const BOOKING_URL = obj.BOOKING_URL;
export const GOOGLE_RECAPTCHA_KEY = obj.GOOGLE_RECAPTCHA_KEY;
export const GOOGLE_MAP_API_KEY = obj.GOOGLE_MAP_API_KEY;

export const isProd = () => process.env.REACT_APP_NODE_ENV === "prod";
