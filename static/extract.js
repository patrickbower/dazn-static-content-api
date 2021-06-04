/**
 * extract - get relevant data from large schema
 * @param {array} rawData - full data dump from api
 * @returns {array} data
 */
const extract = (rawData) => {
  const data = [];
  // loop rail array
  rawData.forEach((rawRail) => {
    // extract rail data
    const rail = {};
    rail.id = rawRail.Id;
    rail.title = rawRail.Title;
    // loop tile array
    rail.tiles = [];
    rawRail.Tiles.forEach((rawTile) => {
      // extract tile data
      const tile = {};
      tile.id = rawTile.Id;
      tile.title = rawTile.Title;
      tile.image = rawTile.Image.Id;
      rail.tiles.push(tile);
    });
    data.push(rail);
  });
  return data;
};

export default extract;
