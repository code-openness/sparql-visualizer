import { queryNormalizer } from '../../sparql/Normalizer';
import { findAndReplacePatternsArray } from './EscapeTable';
import { FindAndReplacePattern } from './index.types'
let FindAndReplacePattern: FindAndReplacePattern;
type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(query: string, endpoint: string,
   vizualizationType: VisualisationIdentifier): string{
  const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
  const encodedQuery: string = `${endpoint}embed.html#${encodeURIComponent(constructQuery)}`;
  return encodedQuery;
}
export function additionalSymbolEncoding (query: string): string {
   let res: string = query;
   //findAndReplacePatternsArray.forEach(({ key, value }: FindAndReplacePattern): string => res = res.replace(key, value));
   findAndReplacePatternsArray.forEach(({ key }: FindAndReplacePattern): string => res = res.split(key).join(FindAndReplacePattern[key]));

   //res = res.split("'").join("%27"); // works -> the problem lies in calling key & value
   //Object.keys(findAndReplacePatternsArray).forEach(key => console.log(key, FindAndReplacePattern[key]));
   return res;
} 