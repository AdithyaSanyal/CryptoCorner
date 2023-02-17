import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NEWS_API_KEY, NEWS_URL, API_KEY } from "../constants";

const cryptoNewsHeaders = {
  // "x-bingapis-sdk": "true",
  // "x-rapidapi-host": NEWS_HOST.toString(),
  // "x-rapidapi-key": API_KEY.toString(),
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNews = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_URL.toString() }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/everything?q=${newsCategory}&from=2023-02-17&sortBy=popularity&apiKey=${NEWS_API_KEY}&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNews;
