import Api from "./api.js";

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

const mergeObjects = (a, b) => {
  const merged = { ...a, ...b };
  return merged;
};

const getRailsData = async (railsSchema, prams) => {
  const getRailData = railsSchema.map(async (rail) => {
    const railsUrl = Api.rail(rail.Id, prams.country);
    const railData = await getRequest(railsUrl).then((data) => data);
    return railData;
  });
  const railsData = await Promise.all(getRailData);
  return railsData;
};

/**
 * processRequest - controller function
 * @param {object} event - handle form submission
 */
const processRequest = async (event) => {
  event.preventDefault();
  const customPrams = serializeFormData(event.target);
  const prams = mergeObjects(Api.prams, customPrams);
  const railsUrl = Api.railsSchema(prams.country);
  const railsSchema = await getRequest(railsUrl).then((data) => data.Rails);
  const railsData = await getRailsData(railsSchema, prams);
  console.log(railsData);
};

/**
 * serializeFormData - serialize form data
 * @param {object} form - form data object
 * @returns {object}
 */
const serializeFormData = (form) => {
  const formData = new FormData(form);
  const customPrams = Object.fromEntries(formData);
  return customPrams;
};

/**
 * Setup form submission handling
 */
const form = document.querySelector("#form");
form.addEventListener("submit", processRequest, false);
