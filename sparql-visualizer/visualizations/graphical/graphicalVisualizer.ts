import { queryNormalizer } from '../../sparql/Normalizer';
type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(query: string, endpoint: string,
   vizualizationType: VisualisationIdentifier): string{
  const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
  const encodedQuery: string = `${endpoint}embed.html#${encodeURIComponent(constructQuery)}`;
  return encodedQuery;
}
export function additionalSymbolEncoding (query: string): string {
<<<<<<< HEAD
   query = query.split("'").join("%27").split("(").join("%28").split(")").join("%29");
=======
   for (const key in findAndReplacePatterns) {
      const value: string = findAndReplacePatterns[key].value;
      const key2: RegExp = findAndReplacePatterns[key].key;
      query = query.replace(key2 , value);
   }
>>>>>>> changed type to interface, removed trailing whitespace, added typedef
   return query;
}