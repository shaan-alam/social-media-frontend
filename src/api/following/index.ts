import { getAPIInstance } from "../index";

const API = getAPIInstance();

export const retrieveFollowing = (userId: string, offset: number) =>
  API.get(`/following/${userId}?offset=${offset}`);
