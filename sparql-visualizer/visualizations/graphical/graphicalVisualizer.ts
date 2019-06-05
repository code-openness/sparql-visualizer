import { queryNormalizer } from '../../sparql/Normalizer';
import { findAndReplacePatterns } from './EscapeTable';
type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(query: string, endpoint: string,
   vizualizationType: VisualisationIdentifier): string{
  const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
  const encodedQuery: string = `${endpoint}embed.html#${encodeURIComponent(constructQuery)}`;
  return encodedQuery;
}
export function additionalSymbolEncoding (query: string): string {
   for (const key in findAndReplacePatterns) {
      const value: string = findAndReplacePatterns[key].value;
      const key2: RegExp = findAndReplacePatterns[key].key;
      query = query.replace(key2 , value);
   }
   return query;
}