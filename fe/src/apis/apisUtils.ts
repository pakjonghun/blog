import { BASE_URL } from "./apisConstants";
import { FetchPayload } from "./apisTypes";

export const makeUrl = ({ requestUrl, params = {} }: FetchPayload) => {
  const searchParams = new URLSearchParams();
  const keys = Object.keys(params);

  if (!keys.length) return `${BASE_URL}/${requestUrl}`;

  keys.forEach((key) => {
    searchParams.append(key, params[key]);
  });

  return `${BASE_URL}/${requestUrl}?${searchParams.toString()}`;
};

export const getFetch = async (payload: FetchPayload) => {
  const response = await (await fetch(makeUrl(payload))).json();
  return response;
};
