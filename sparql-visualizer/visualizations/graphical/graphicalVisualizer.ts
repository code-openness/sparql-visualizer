type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;
type URLTypeIdentifier = import ('./index.types').URLTypeIdentifier;

export function graphicalVisualizerUrlConstructor(querry: string, endpoint: string,
   vizualizationType: VisualisationIdentifier, urlType: URLTypeIdentifier): string{
  const formattedQuerry: string = queryNormalizer(querry);
  const constructQuerry: string = `#defaultView:${vizualizationType}\n${formattedQuerry}`;
  let res: string = '';
  let encodedQuery: string = encodeURIComponent(constructQuerry);
  if (urlType === 'SPARQL') {
     res = `${endpoint}sparql?query=${encodedQuery}`;
  }
  else if (urlType === 'Wikilink') {
      res = `${endpoint}#${encodedQuery}`;
  }
  else if (urlType === 'HTML'){
      res = `${endpoint}embed.html#${encodedQuery}`;
  } else {
     // Default: iFrame URL
     encodedQuery = additionalSymbolEncoding(encodedQuery); // only needed for iFrame, for now
     res = `${endpoint}embed.html#${encodedQuery}`;
  }
  return res;
}

export function additionalSymbolEncoding (querry: string): string {
   const replace: RegExp = /\(/gi;
   const result: string  = querry.replace(replace, "%28");
   const replace2: RegExp = /\)/gi;
   const result2: string  = result.replace(replace2, "%29");
   const replace3: RegExp = /\'/gi;
   const result3: string  = result2.replace(replace3, "%27");
   return result3;
}

export function queryNormalizer (query: string): string {
   const str: string = query.trim();
   const removeDefaultViewomment: string  = str.replace(/\A*(\s+)*(#defaultView).*\n?/m, '');
   const removeInspiredByomment: string  = removeDefaultViewomment.replace(/\A*(\s+)*(# Inspired).*\n?/m, '');
   const removeNameComment: string = removeInspiredByomment.replace(/\A*(\s+)*(# Shubhanshu).*\n?/m, '');
   const lineArray: string[] = removeNameComment.split(/\r?\n/);
   const trimedArray: string[] = lineArray.map(s => s.trim());
   const newtext: string = trimedArray.join('\n');
   return newtext;
}