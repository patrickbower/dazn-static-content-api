// TODO: change to Node require pattern
import Api from "./api.js";
import Extract from "./extract.js";

// TODO: change to use Node ... for fetching

// fetch api
const handleRequest = async (url: string): Promise<object> => {
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
const handleRailsData = async (
  railsSchema: Array<object>,
  prams: object
): Promise<object> => {
  const getRailData = railsSchema.map(async (rail) => {
    const railsUrl = Api.rail(rail.Id, prams.country);
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
  const railsUrl = Api.railsSchema(prams.country);
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
  data.forEach((rail) => {
    rail.tiles.forEach((tile) => {
      const id = tile.image;
      const { image_quality, image_width, image_height, image_format } = prams;
      tile.image = Api.image(
        id,
        image_quality,
        image_width,
        image_height,
        image_format
      );
    });
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
  print(data);
};

// TODO: what values do we need from the form to make a request? These will need to the made available via another means into NPM package (i.e args).
/**
 * handleForm - serialize form data and add values from form to default prams
 * @param {object} form - form data object
 * @returns {object} prams - custom prams collected by user input on form
 */
const handleForm = (form) => {
  const formData = new FormData(form);
  const formVales = Object.fromEntries(formData);
  const prams = { ...Api.prams, ...formVales };
  return prams;
};

// TODO: scrap form

/**
 * Setup form submission handling
 */
const form = document.querySelector("#form");
form.addEventListener("submit", processRequest, false);

// TODO: generate output - json file (and where) or just data?

// TODO: does it need incremental feedback (i.e. console.logs)?
