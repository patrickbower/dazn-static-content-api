import Api from "./api.js";

/**
 * constructProps - merge custom data with defaults
 * @param {object} queryPrams
 * @param {object} customValues
 * @returns {object}
 */
const constructProps = (queryPrams, customValues) => {
  for (const property in queryPrams) {
    if (queryPrams[property] === null) {
      queryPrams[property] = customValues[property];
    }
  }
  console.log("two", queryPrams);
  return queryPrams;
};

/**
 * buildPrams - construct query string from data
 * @param {object} properties -
 * @returns {string}
 */
const buildPrams = (properties) => {
  let queryString = "";
  for (const key in properties) {
    queryString += `${key}=${properties[key]}&`;
  }
  return queryString.slice(0, -1);
};

/**
 * buildUrl - construct a url from defaults and form inputted data
 * @param {object} defaultValues - default settings from json
 * @param {object} customValues - form inputted values
 * @returns {string}
 */
const buildUrl = (defaultValues, customValues) => {
  const { url, queryPrams } = defaultValues;
  const properties = constructProps(queryPrams, customValues);
  const queryString = buildPrams(properties);
  return `${url}?${queryString}`;
};

const buildMultiUrls = (defaultValues, customValues, listArray) => {
  const urlList = listArray.map((item) => {
    const listValues = constructProps(defaultValues.queryPrams, {
      id: item.Id,
    });
    // const url = buildUrl(listValues, customValues);
    // console.log(url);
  });
  return urlList;
};

/**
 * getRequest - fetch api
 * @param {string} url
 * @returns {object} json
 */
const getRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/**
 * processRequest - controller function
 * @param {object} event - handle form submission
 */
const processRequest = async (event) => {
  event.preventDefault();
  const customValues = serializeFormData(event.target);
  const railsUrl = buildUrl(Api.rails, customValues);
  const railsList = await getRequest(railsUrl).then((data) => data.Rails);
  const tileUrlList = buildMultiUrls(Api.tiles, customValues, railsList);
  // console.log(tileUrlList);
};

/**
 * serializeFormData - serialize form data
 * @param {object} form - form data object
 * @returns {object}
 */
const serializeFormData = (form) => {
  const customValues = new FormData(form);
  const formObject = Object.fromEntries(customValues);
  return formObject;
};

/**
 * Setup form submission handling
 */
const form = document.querySelector("#form");
form.addEventListener("submit", processRequest);

// https://rails.discovery.indazn.com/ca/v8/rails?country=br&groupId=home
// https://rail.discovery.indazn.com/eu/v3/Rail?id=Scheduled&country=br&languageCode=en&params=PageType:Home;ContentType:None
// https://image.discovery.indazn.com/eu/v2/eu/image/?id=78006341583_image-header_pRow_1594209231000&quality=85&width=668&height=374&resizeAction=fill&verticalAlignment=top&format=jpg
