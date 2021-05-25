module.exports = {
  rails: {
    url: "https://rails.discovery.indazn.com/ca/v8/rails",
    default: {
      country: "ca",
      groupId: "home",
    },
  },
  tiles: {
    url: "https://rail.discovery.indazn.com/eu/v3/Rail",
    default: {
      id: undefined,
      country: "ca",
      languageCode: "en",
      params: "PageType:Home;ContentType:None",
    },
  },
  image: {
    url: "https://image.discovery.indazn.com/eu/v2/eu/image",
    default: {
      id: undefined,
      quality: 85,
      width: 668,
      height: 374,
      format: "jpg",
    },
  },
};
