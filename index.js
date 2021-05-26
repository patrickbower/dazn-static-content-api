import api from "./api.js";

// fetch("https://rails.discovery.indazn.com/ca/v8/rails?country=ca&groupId=home")
//   .then((res) => res.text())
//   .then((body) => console.log(body));

/**
 * getFormData
 * serialize form data
 *
 * @param {object} form
 * @returns object
 */
const getFormData = (form) => {
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData);
  return formObject;
};

const buildUrlQueryString = (queryPrams, formData) => {
  const queryPramsKeys = Object.keys(queryPrams);
  const formDataKeys = Object.keys(formData);
  const intersection = queryPramsKeys.filter((element) =>
    formDataKeys.includes(element)
  );
  const compiled = { ...queryPrams, ...formData };
  return compiled;
};

const buildUrl = (api, formData) => {
  const { url, queryPrams } = api;
  const queryString = buildUrlQueryString(queryPrams, formData);

  console.log("queryString", queryString);
  // return `${url}?${queryString}`;
};

/**
 * initRequest
 * Constructor function
 *
 * @param {object} event
 */
const initRequest = (event) => {
  event.preventDefault();
  const formData = getFormData(event.target);
  const railsQueryString = buildUrl(api.rails, formData);
  // console.log(railsQueryString);
  // print(request);
};

// const print = (body) => {
//   document.querySelector("#print").textContent = body;
// };

const form = document.querySelector("#form");
form.addEventListener("submit", initRequest);
