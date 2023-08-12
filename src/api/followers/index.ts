import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const retrieveFollowers = (userId: string, offset: number) =>
  API.get(`/followers/${userId}?offset=${offset}`);
