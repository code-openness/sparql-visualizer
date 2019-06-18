import { DataRow } from '../../sparql/index.types';
import { requestQueryResults } from '../../sparql/Request';
import { WikidataEndpoint } from '../../wikidata-endpoint';
import { createHTMLTable } from './Serializer';

export async function createDataTable(
    endpoint: WikidataEndpoint,
    sparqlQuery: string
): Promise<HTMLElement> {
    const table: DataRow[] = await requestQueryResults(endpoint.getSPARQLQueryURL(), sparqlQuery);
    return createHTMLTable(table);
}
