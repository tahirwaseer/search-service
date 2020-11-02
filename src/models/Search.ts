import { extract as findMatch } from "fuzzball";
import { SearchResult, Service, ServiceResponse } from "service";
import StraightLineDistance from "../util/distance";
import jsonData from "../data.json";

type FuzzBallResult = [string, number, number]

const search = (query: string, geoLocation: string): SearchResult => {
  const point: Array<string> = geoLocation.split(",");
  const [lat, lng] = [+point[0], point.length > 1 ? +point[1] : 0 ];
  // index data into an array so we compare it using fuzzball extract method
  const indexedNames: Array<string> = jsonData.map(doc => doc.name);
  
  // set search options e.g fuzzball assigns score from 0-100 based on how strong the match is.
  const options: object = {cutoff: 40}; // we can decide what is the minimum score we want to return
  const searchResults: Array<ServiceResponse> = findMatch(query, indexedNames, options).map(([name, score, index]: FuzzBallResult): ServiceResponse  => {
    const originalDocument: Service = jsonData[index];
    // get straight line distance between given geo location and service location
    const distanceKm: number = StraightLineDistance(lat, lng, originalDocument.position.lat, originalDocument.position.lng);
    // by default returned distance is calculated in kilometers, if distance is less than a kilometer then it is better to display in metters
    const distance: string = distanceKm < 1 ? `${distanceKm*1000}m` : `${distanceKm}km`;
    const responseDocument: ServiceResponse = {
      ...originalDocument,
      distance: distance,
      score: score/10 // convert score to 1-10 rather than 1-100 which is returned by fuzzball
    };
    return responseDocument;
  });

  return {
    totalHits: searchResults.length,
    totalDocuments: jsonData.length,
    results: searchResults
  };
};

export default { search };
