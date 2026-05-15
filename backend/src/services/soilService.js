import axios from "axios";
import https from "https";

function averageDepthMean(layer) {
  const depths = layer?.depths ?? [];

  if (depths.length === 0) {
    return null;
  }

  const total = depths.reduce(
    (sum, depth) => sum + (depth?.values?.mean ?? 0),
    0,
  );
  return total / depths.length;
}

export async function fetchSoilData(lat, lon) {
  const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}&property=phh2o&property=nitrogen&property=soc`;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get(url, {
    httpsAgent,
  });

  //   console.log(response);

  const layers = response.data.properties.layers;

  const soil = {};

  layers.forEach((layer) => {
    const meanValue = averageDepthMean(layer);

    if (meanValue === null) {
      return;
    }

    const factor = layer?.unit_measure?.d_factor || 1;
    const value = meanValue / factor;

    if (layer.name === "phh2o") {
      soil.ph = value;
    }

    if (layer.name === "nitrogen") {
      soil.nitrogen = value;
    }

    if (layer.name === "soc") {
      soil.organicCarbon = value;
    }
  });

  return soil;
}
