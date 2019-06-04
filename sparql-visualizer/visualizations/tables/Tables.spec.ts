import { buildSPARQLquerry, sparqlRequest } from './Tables';
describe('TestTables', () => {
    it('should create the encoded URI', () =>{
            const endpointURL: string = 'https://query.wikidata.org/sparql';
            const sparqlQuery: string = '#Katzen\n' +
            'SELECT ?item ?itemLabel \n' +
            'WHERE \n' +
            '{\n' +
            '  ?item wdt:P31 wd:Q146.\n' +
            '  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n' +
            '}';
            const expectedUrl: string = 'https://query.wikidata.org/sparql?query=%23Katzen%0ASELECT%20%3Fitem%20%3FitemLabel%20%0AWHERE%20%0A%7B%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ146.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D';

            expect(buildSPARQLquerry(endpointURL, sparqlQuery)).toEqual(expectedUrl);
    });

    
    it('should log an error message, if request fails', () => {
        if (sparqlRequest == false) {
            console.log('request failed')  
        };
                      
    });

    it('should ', async () => {
        const response: Response = await fetch('www.google.de');
        const results: JSON = await response.json();

    });
    
});


/** interfaces durch JSON
 * results and head
 * response JSON von welchem Typ definieren
 */