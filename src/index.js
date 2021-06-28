import Api from "./api.js";
import Extract from "./extract.js";

/**
 * handleRequest - fetch api
 * @param {string} url
 * @returns {object} json
 */
const handleRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/**
 * handleRailsData - loop each rail from rails schema and fetch complete data for each from api
 * @param {array} railsSchema - basic rails data (id's) from initial DAZN api call
 * @param {object} prams - custom prams collected by user input on form
 * @returns {object} railsData - data returned from DAZN api on rail
 */
const handleRailsData = async (railsSchema, prams) => {
  const getRailData = railsSchema.map(async (rail) => {
    const { Id } = rail;
    const { country, language } = prams;
    const railsUrl = Api.rail(Id, country, language);
    const railData = await handleRequest(railsUrl).then((data) => data);
    return railData;
  });
  const railsData = await Promise.all(getRailData);
  return railsData;
};

/**
 * getData - process basic page schema to get rails data
 * @param {object} prams - custom prams collected by user input on form
 * @returns {array} railsData - complete static data for a page
 */
const getData = async (prams) => {
  const { country } = prams;
  const railsUrl = Api.railsSchema(country);
  const railsSchema = await handleRequest(railsUrl).then((data) => data.Rails);
  const railsData = await handleRailsData(railsSchema, prams);
  return railsData;
};

/**
 * addImages - generate image urls from id's
 * @param {array} data - custom json data created from previous api calls
 * @param {object} prams - custom prams collected by user input on form
 * @returns {array} data - added image urls to custom json data created from previous api calls
 */
const addImages = (data, prams) => {
  data.forEach((tile) => {
    const { image_id } = tile;
    const {
      image_quality,
      image_width,
      image_height,
      image_format,
      image_largest,
    } = prams;

    // standard image
    tile.image = Api.image(
      image_id,
      image_quality,
      image_width,
      image_height,
      image_format
    );

    // optional largest image
    if (image_largest) {
      tile.image_largest = Api.imageLargest(image_id, image_format);
    }
  });
  return data;
};

/**
 * processRequest - controller function
 * @param {object} event - handle form submission
 */
const processRequest = async (event) => {
  event.preventDefault();
  const prams = handleForm(event.target);
  const rawData = await getData(prams);
  const basicData = Extract(rawData);
  const data = addImages(basicData, prams);
  output(data, prams);
  enableDownload();
};

/**
 * handleForm - serialize form data and add values from form to default prams
 * @param {object} form - form data object
 * @returns {object} data - custom prams collected by user input on form
 */
const handleForm = (form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  return data;
};

/**
 * filterData - max number of items per rail title (i.e. max 10 tiles per rail)
 * @param {integer} limit
 * @param {array} data
 * @returns {array}
 */
const filterData = (limit, data) => {
  // get unique rail titles from all data
  const railTitles = [...new Set(data.map((obj) => obj.rail_title))];
  // loop titles
  const newData = railTitles.map((title) => {
    // filter data to matching title
    const titles = data.filter((obj) => {
      // matching objects from title map
      return obj.rail_title === title;
    });
    // remove any more than limit
    if (titles.length < limit) {
      const missingCount = limit - titles.length;
      const blankObj = {
        id: "none",
        title: "none",
        label: "none",
        image_id: "none",
        rail_id: "none",
        rail_title: "none",
        image: "none",
      };
      const blankArray = new Array(missingCount).fill().map(() => blankObj);
      return titles.concat(blankArray);
    } else {
      return titles.slice(0, limit);
    }
  });
  // flatten array of arrays
  return newData.flat();
};

/**
 * output - parse and pretty output to UI
 * @param {array} json
 */
const output = (data, prams) => {
  const tileCount = parseInt(prams.tile_count);
  const filteredData = filterData(tileCount, data);
  const json = JSON.stringify(filteredData, null, 2);
  document.querySelector("#json").innerHTML = json;
  window.localStorage.setItem("static-homepage-data", json);
};

const enableDownload = () => {
  const downLoadButton = document.querySelector("button[type=download]");
  downLoadButton.removeAttribute("disabled");
};

const downloadJson = () => {
  const json = window.localStorage.getItem("static-homepage-data");
  const name = `tiles.json`;
  const anchor = document.createElement("a");
  const type = name.split(".").pop();
  anchor.href = URL.createObjectURL(
    new Blob([json], { type: `text/${type === "txt" ? "plain" : type}` })
  );
  anchor.download = name;
  anchor.click();
};

/**
 * Start
 * Initialize event handling
 */

// clean memory
window.localStorage.clear();

// handle form
const form = document.querySelector("#form");
form.addEventListener("submit", processRequest, false);

// handle download
const downLoadButton = document.querySelector("button[type=download]");
downLoadButton.addEventListener("click", downloadJson, false);
