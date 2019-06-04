type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;
type URLTypeIdentifier = import ('./index.types').URLTypeIdentifier;

export function graphicalVisualizerUrlConstructor(querry: string, endpoint: string,
   vizualizationType: VisualisationIdentifier, urlType: URLTypeIdentifier): string{
  const constructQuerry: string = '#defaultView:' + vizualizationType + '\n'+ querry;
  let res: string = '';
  let encodedQuery = encodeURIComponent(constructQuerry);
  if (urlType === 'SPARQL') {
     res = endpoint +  'sparql?query=' + encodedQuery;
  }
  else if (urlType === 'Wikilink') {
      res = endpoint  + '#' +encodedQuery;
  }
  else if (urlType === 'HTML'){
      res = endpoint  + 'embed.html#' + encodedQuery;
  } else {
     // Default: iFrame URL
     encodedQuery = additionalSymbolEncoding(encodedQuery); //only needed for iFrame, for now
     res = endpoint + 'embed.html#' + encodedQuery;
  }
  return res;
}

export function additionalSymbolEncoding (querry: string): string {
   let replace = /\(/gi;
   let result = querry.replace(replace, "%28");
   let replace2 = /\)/gi;
   let result2 = result.replace(replace2, "%29");
   let replace3 = /\'/gi;
   let result3 = result2.replace(replace3, "%27");

   return result3;
}