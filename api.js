const api = {
  rails: {
    url: "https://rails.discovery.indazn.com/ca/v8/rails",
    queryPrams: {
      country: null,
      groupId: "home",
    },
  },
  tiles: {
    url: "https://rail.discovery.indazn.com/eu/v3/Rail",
    queryPrams: {
      id: null,
      country: null,
      languageCode: "en",
      params: "PageType:Home;ContentType:None",
    },
  },
  image: {
    url: "https://image.discovery.indazn.com/eu/v2/eu/image",
    queryPrams: {
      id: null,
      quality: 85,
      width: 668,
      height: 374,
      format: "jpg",
    },
  },
};

export default api;
