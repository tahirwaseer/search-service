export type Service = {
  id: number,
  name: string,
  position: {
    lat: number,
    lng: number
  }
}

export type ServiceResponse = Service & {
  score: number,
  distance: string
} 

export type SearchResult = {
  totalHits: number,
  totalDocuments: number,
  results: Array<ServiceResponse>
}
