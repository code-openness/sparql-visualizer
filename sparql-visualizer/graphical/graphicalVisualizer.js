"use strict";
/**
  * // TODO: create a function which gets the querry and the vizualization type, then
  * returns a URL which can be given to iframe to visualize it
  */
exports.__esModule = true;
function exampleQuerryFormatting() {
    var endpointUrl = 'https://query.wikidata.org/sparql' +
        "#defaultView:BubbleChart\n" +
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
exports.exampleQuerryFormatting = exampleQuerryFormatting;
console.log(exampleQuerryFormatting());
function tryEncodeUri(querry) {
    /** let uri = "my test.asp?name=ståle&car=saab";*/
    var res = encodeURI(querry);
    return res;
}
exports.tryEncodeUri = tryEncodeUri;
/** console.log(tryEncodeUri());*/
function myFunction() {
    var uri = "https://w3schools.com/my test.asp?name=ståle&car=saab";
    var res = encodeURIComponent(uri);
    return res;
}
console.log(myFunction());
