import Api from "./api.js";

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
 * extract - get relevant data from large flat schema
 *
 * @param {object} data - flat object of all page strings
 * @returns
 */
const extract = (data) => {
  const strings = {
    search: data.railMenu_search,
    sports: data.railMenu_sports,
    settings: data.railMenuTile_settings,
    title: data.railMenu_title,
    title: data.search_title,
    help: data.railMenu_help,
    myAccount: data.railMenu_myAccount,
    settings: data.railMenu_settings,
    terms: data.railMenu_terms,
    privacyPolicy: data.footer_privacyPolicy,
    dazn: data.footer_dazn,
    faq: data.footer_faq,
    help: data.footer_help,
    privacyPolicy: data.footer_privacyPolicy,
    redeem: data.footer_redeem,
    trademark: data.footer_trademark,
  };
  return strings;
};

/**
 * ResourceStrings - controller function
 *
 * @param {object} prams from form submission
 * @returns {object} strings - filtered resource strings from page
 */
const ResourceStrings = async (prams) => {
  const { country, language } = prams;
  const resourceStringUrl = Api.resourceStrings(country, language);
  const data = await handleRequest(resourceStringUrl);
  const strings = await extract(data.Strings);
  return strings;
};

export default ResourceStrings;
