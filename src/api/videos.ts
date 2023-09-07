import { VIDEO_SOURCES } from "@const/links";

// * Mock Server API Request
export const getVideoSourcesApi = (): Promise<Array<string>> =>
  new Promise((resolve) => {
    resolve(VIDEO_SOURCES);
  });
