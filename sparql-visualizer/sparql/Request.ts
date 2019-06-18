import { DataRow, SPARQLDataRow } from './index.types';
import { queryNormalizer } from './Normalizer';

type SPARQLSelectResponse = import('./index.types').SPARQLSelectResponse;

export async function requestQueryResults(
    endpoint: string,
    sparqlQuery: string
): Promise<DataRow[]> {
    const requestUrl: string = buildRequestURL(endpoint, sparqlQuery);
    const sparqlResponse: SPARQLSelectResponse = await requestSPARQLSelectResponse(requestUrl);
    return sparqlResponseToDataTable(sparqlResponse);
}

export function buildRequestURL(endpoint: string, sparqlQuery: string): string {
    const encodedQuery: string = encodeURIComponent(queryNormalizer(sparqlQuery));
    return `${endpoint}/sparql?query=${encodedQuery}`;
}

export async function requestSPARQLSelectResponse(url: string): Promise<SPARQLSelectResponse> {
    const headers: RequestInit['headers'] = { Accept: 'application/sparql-results+json' };
    let response: Response;

    try {
        response = await fetch(url, { headers });
    } catch (error) {
        throw new Error(`Failed to get SPARQL Select Response: ${error}`);
    }

    return response.json();
}

export function sparqlResponseToDataTable(sparqlResponse: SPARQLSelectResponse): DataRow[] {
    return sparqlResponse.results.bindings.map(
        (row: SPARQLDataRow): DataRow => {
            const finalRow: DataRow = {};

            Object.keys(row).forEach(
                (key: string): void => {
                    const value: string = row[key].value;
                    finalRow[key] = value;
                }
            );

            return finalRow;
        }
    );
}
