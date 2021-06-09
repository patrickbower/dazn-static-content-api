const railsSchema = (country) => {
  return `https://rails.discovery.indazn.com/ca/v8/rails?country=${country}&groupId=home`;
};

const rail = (rail_id, country) => {
  return `https://rail.discovery.indazn.com/eu/v3/Rail?id=${rail_id}&country=${country}&languageCode=en&params=PageType:Home;ContentType:None`;
};

const image = (
  image_id,
  image_quality,
  image_width,
  image_height,
  image_format
) => {
  return `https://image.discovery.indazn.com/eu/v2/eu/image/?id=${image_id}&quality=${image_quality}&width=${image_width}&height=${image_height}&resizeAction=fill&verticalAlignment=top&format=${image_format}`;
};

export default { railsSchema, rail, image };

// https://rails.discovery.indazn.com/ca/v8/rails?country=br&groupId=home
// https://rail.discovery.indazn.com/eu/v3/Rail?id=Scheduled&country=br&languageCode=en&params=PageType:Home;ContentType:None
// https://image.discovery.indazn.com/eu/v2/eu/image/?id=78006341583_image-header_pRow_1594209231000&quality=85&width=668&height=374&resizeAction=fill&verticalAlignment=top&format=jpg
