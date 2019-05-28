/**
  * // TODO: create a function which gets the querry and the vizualization type, then
  * returns a URL which can be given to iframe to visualize it
  */

	

  export function exampleQuerryFormatting() {
    let endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = "#defaultView:BubbleChart\n" +
    "SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) \n" +
    "WITH {\n" +
    "  SELECT (COUNT(?work) as ?count) ?venue WHERE {\n" +
    "    ?work wdt:P50 wd:Q16733372 .\n" +
    "    ?work wdt:P1433 ?venue .\n" +
    "  }\n" +
    "  GROUP BY ?venue\n" +
    "} AS %counts\n" +
    "WHERE {\n" +
    "  INCLUDE %counts\n" +
    "  ?venue rdfs:label ?long_venue_label FILTER(LANG(?long_venue_label) = 'en')\n" +
    "  OPTIONAL { ?venue wdt:P1813 ?short_name . }\n" +
    "  BIND(COALESCE(?short_name, ?long_venue_label) AS ?venue_label_)\n" +
    "}\n" +
    "GROUP BY ?venue ?count\n" +
    "ORDER BY DESC(?count)  ";

    return endpointUrl;
  }

  console.log(exampleQuerryFormatting());

  export function tryEncodeUri(querry: string){
    let res = encodeURI(querry);
    return res;
  }
  /** console.log(tryEncodeUri());*/
  

  export function tryEncodeURIComponent(querry: string) {
    let res = encodeURIComponent(querry);
    return res;
  }
  console.log(tryEncodeURIComponent(exampleQuerryFormatting()));