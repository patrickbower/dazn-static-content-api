/**
 * extract - get relevant data from large schema
 * @param {array} rawData - full data dump from api
 * @returns {array} data
 */
const extract = (rawData: any) => {
  const data: object[] = [];
  // loop rail array
  rawData.forEach((rawRail: any) => {
    // extract rail data
    const rail: { id: string; title: string; tiles: object[] } = {
      id: rawRail.Id,
      title: rawRail.Title,
      tiles: [],
    };
    // loop tile array
    rawRail.Tiles.forEach((rawTile) => {
      // extract tile data
      const tile: { id: string; title: string; image: string } = {
        id: rawTile.Id,
        title: rawTile.Title,
        image: rawTile.Image.Id,
      };
      rail.tiles.push(tile);
    });
    data.push(rail);
  });
  return data;
};

export = extract;
