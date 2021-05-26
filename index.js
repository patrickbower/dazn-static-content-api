import Api from "./api.js";

// fetch("https://rails.discovery.indazn.com/ca/v8/rails?country=ca&groupId=home")
//   .then((res) => res.text())
//   .then((body) => console.log(body));

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

/**
 * initRequest - start
 * @param {object} event - triggered by form submission
 */
const initRequest = (event) => {
  event.preventDefault();
  const customValues = serializeFormData(event.target);
  const railsQueryString = buildUrl(Api.rails, customValues);
  console.log(railsQueryString);
};

const form = document.querySelector("#form");
form.addEventListener("submit", initRequest);
