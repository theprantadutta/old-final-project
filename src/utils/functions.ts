import { format, sub } from "date-fns";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./constants";

export const verifyJWTToken = (accessToken: string) => {
  return verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return err;
    return user;
  });
};

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export const sub18Years = (date: Date) => {
  return sub(date, {
    years: 18,
  });
};

export const eightennYearsBackFromNow = () => {
  return sub(new Date(), {
    years: 18,
  });
};

export const objectToArray = (obj: Record<string, string>) => {
  return Object.keys(obj).map((key) => [key, obj[key]]);
};

export const isEmptyObj = (obj: Record<any, any>) => {
  return Object.keys(obj).length === 0;
};

export const isObject = (obj: any) => {
  return obj != null && obj.constructor.name === "Object";
};

export const isServer = () => {
  return typeof window === "undefined";
};

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
