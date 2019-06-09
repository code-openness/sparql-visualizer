import { queryNormalizer } from '../../sparql/Normalizer';
type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(query: string, endpoint: string,
   vizualizationType: VisualisationIdentifier): string{
  const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
  const encodedQuery: string = `${endpoint}embed.html#${encodeURIComponent(constructQuery)}`;
  return encodedQuery;
}
export function additionalSymbolEncoding (query: string): string {
  let res: string = '';
   res = query.split("'").join("%27").split("(").join("%28").split(")").join("%29");
  return res;
}