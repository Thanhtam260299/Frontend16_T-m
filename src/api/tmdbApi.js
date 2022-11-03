import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const constParams = {
  api_key: "e9e9d8da18ae29fc430845952232787c",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    const tempParams = { ...constParams, ...params.params };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },

  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    const tempParams = { ...constParams, ...params.params };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
  getVideos: (cate, id) => {
    const url = category[cate.toLowerCase()] + "/" + id + "/videos";
    const tempParams = { ...constParams, params: {} };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
  search: (cate, params) => {
    const url = "search/" + cate.toLowerCase();
    const tempParams = { ...constParams, ...params.params };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
  detail: (cate, id, params) => {
    const url = category[cate.toLowerCase()] + "/" + id;
    const tempParams = { ...constParams, ...params };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
  credits: (cate, id) => {
    const url = category[cate.toLowerCase()] + "/" + id + "/credits";
    const tempParams = { ...constParams, params: {} };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
  similar: (cate, id) => {
    const url = category[cate.toLowerCase()] + "/" + id + "/similar";
    const tempParams = { ...constParams, params: {} };
    return axiosClient.get(url, {
      params: tempParams,
    });
  },
};

export default tmdbApi;
