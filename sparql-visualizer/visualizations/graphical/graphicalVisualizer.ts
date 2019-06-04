type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;
type URLTypeIdentifier = import ('./index.types').URLTypeIdentifier;

export function graphicalVisualizerUrlConstructor(querry: string, endpoint: string,
   vizualizationType: VisualisationIdentifier, urlType: URLTypeIdentifier): string{
  const constructQuerry: string = '#defaultView:' + vizualizationType + '\n'+ querry;
  let res: string = '';
  if (urlType === 'SPARQL') {
     res = endpoint +  'sparql?query=' + encodeURIComponent(constructQuerry);
  }
  else if (urlType === 'Wikilink') {
      res = endpoint  + '#' +encodeURIComponent(constructQuerry);
  }
  else if (urlType === 'HTML'){
      res = endpoint  + 'embed.html#' + encodeURIComponent(constructQuerry);
  } else {
     // Default: iFrame URL
     res = endpoint + 'embed.html#' + escape(constructQuerry);
  }
  return res;
}