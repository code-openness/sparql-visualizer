type VisualisationIdentifier = import("./index.types").VisualisationIdentifier;

/**
  * // TODO: create a function which gets the querry and the vizualization type, then
  * returns a URL which can be given to iframe to visualize it
  */
 /*  export function exampleQuerryFormatting() {
    const sparqlQuery = `#defaultView:BubbleChart
    SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) 
    WITH {
      SELECT (COUNT(?work) as ?count) ?venue WHERE {
        ?work wdt:P50 wd:Q16733372 .
        ?work wdt:P1433 ?venue .
      }
      GROUP BY ?venue
    } AS %counts
    WHERE {
      INCLUDE %counts
      ?venue rdfs:label ?long_venue_label FILTER(LANG(?long_venue_label) = 'en')
      OPTIONAL { ?venue wdt:P1813 ?short_name . }
      BIND(COALESCE(?short_name, ?long_venue_label) AS ?venue_label_)
    }
    GROUP BY ?venue ?count
    ORDER BY DESC(?count)  `;
    return sparqlQuery;
  } */

  export function tryEncodeUri(querry: string, endpoint: string){
    //let res = encodeURI(querry);
    //const res = endpoint  + encodeURIComponent(querry);
    const res = endpoint  + escape(querry);
    return res;
  }


  export function encodeQuerry(querry: string){
    const res = escape(querry);
    return res;
  }

  export function constructHtmlUrl(querry: string, endpoint: string){
    const res = endpoint  + encodeQuerry(querry);
    return res;
  }

  export function constructQuerry(vizualizationType: VisualisationIdentifier, querry: string){
    const res = '#defaultView:' + vizualizationType + '\n'+ querry;
    return res;
  }