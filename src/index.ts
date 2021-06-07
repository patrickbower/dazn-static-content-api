// TODO: change to Node require pattern
import Api = require("./api");
import Extract = require("./extract");

// TODO: change to use Node ... for fetching

// fetch api
const handleRequest = async (url: string): Promise<object> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

/**
 * handleRailsData - loop each rail from rails schema and fetch complete data for each from api
 * @param railsSchema - basic rails data (id's) from initial DAZN api call
 * @param prams - custom prams collected by user input on form
 * @returns railsData - data returned from DAZN api on rail
 */
const handleRailsData = async (
  railsSchema: Array<object>,
  prams: Prams
): Promise<object> => {
  const getRailData = railsSchema.map(async (rail: { Id: string }) => {
    const railsUrl = Api.rail(rail.Id, prams.country);
    const railData = await handleRequest(railsUrl).then((data) => data);
    return railData;
  });

  const railsData = await Promise.all(getRailData);
  return railsData;
};

/**
 * getData - process basic page schema to get rails data
 * @param prams - custom prams collected by user input on form
 * @returns railsData - complete static data for a page
 */
const getData = async (prams) => {
  const railsUrl = Api.railsSchema(prams.country);
  const railsSchema = await handleRequest(railsUrl).then(
    (data: { Rails: object[] }) => data.Rails
  );

  const railsData = await handleRailsData(railsSchema, prams);
  return railsData;
};

/**
 * addImages - generate image urls from id's
 * @param data - custom json data created from previous api calls
 * @param prams - custom prams collected by user input on form
 * @returns data - added image urls to custom json data created from previous api calls
 */
const addImages = (data, prams) => {
  const { image_quality, image_width, image_height, image_format } = prams;
  data.forEach((rail) => {
    rail.tiles.forEach((tile: { image: string }) => {
      const id = tile.image;
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
 * @param event - handle form submission
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
 * @param form - form data object
 * @returns prams - custom prams collected by user input on form
 */
interface Prams {
  country: string;
  rail_id: string;
  image_id: string;
}

interface Images {
  image_quality: number;
  image_width: number;
  image_height: number;
  image_format: string;
}
const handleForm = (form) => {
  const formData: any = new FormData(form);
  const formVales = Object.fromEntries(formData);
  const prams: Prams = { ...Api.prams, ...formVales };
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

const print: any = (json) => {
  document.querySelector("#json").innerHTML = JSON.stringify(json, null, 2);
};
