/**
 * extract - get relevant data from large schema
 * @param {array} rawData - full data dump from api
 * @returns {array} data
 */
const extract = (rawData) => {
  // const data = [];
  // loop rail array
  const tiles = rawData.map((rawRail) => {
    // extract rail data
    const rail = {
      rail_id: rawRail.Id,
      rail_title: rawRail.Title,
    };
    // loop tile array
    const tiles = rawRail.Tiles.map((rawTile) => {
      const tile = {
        id: rawTile.Id,
        title: rawTile.Title,
        image_id: rawTile.Image.Id,
      };
      return { ...tile, ...rail };
    });
    return tiles;
  });
  return tiles.flat();
};

export default extract;
