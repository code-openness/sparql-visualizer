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

class SPARQLQueryDispatcher {
    endpoint: string;
	constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery: string ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#Katzen
SELECT ?item ?itemLabel 
WHERE 
{
  ?item wdt:P31 wd:Q146.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );
