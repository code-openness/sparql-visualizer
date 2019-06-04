/*type TableVisualisationIdentifier = import('./index.types').TableVisualisationIdentifier;*/
/*
export class queryForTable{
    buildSPARQLquerry(endpoint:string, sparqlQuerry:string){
        let res = endpoint + '?query=' + escape(sparqlQuerry);
        return res;
    };

sparqlRequest(): boolean {

};
}*/
var SPARQLQueryDispatcher = /** @class */ (function () {
    function SPARQLQueryDispatcher(endpoint) {
        this.endpoint = endpoint;
    }
    SPARQLQueryDispatcher.prototype.query = function (sparqlQuery) {
        var fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
        var headers = { 'Accept': 'application/sparql-results+json' };
        return fetch(fullUrl, { headers: headers }).then(function (body) { return body.json(); });
    };
    return SPARQLQueryDispatcher;
}());
var endpointUrl = 'https://query.wikidata.org/sparql';
var sparqlQuery = "#Katzen\nSELECT ?item ?itemLabel \nWHERE \n{\n  ?item wdt:P31 wd:Q146.\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n}";
var queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
queryDispatcher.query(sparqlQuery).then(console.log);
