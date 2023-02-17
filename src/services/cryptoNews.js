import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NEWS_API_KEY, NEWS_URL } from "../constants";

const cryptoNewsHeaders = {
  // "x-bingapis-sdk": "true",
  // "x-rapidapi-host": NEWS_HOST.toString(),
  // "x-rapidapi-key": API_KEY.toString(),
};
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
console.log(today);

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNews = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_URL.toString() }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/search?q=${newsCategory}&apikey=${NEWS_API_KEY}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNews;
