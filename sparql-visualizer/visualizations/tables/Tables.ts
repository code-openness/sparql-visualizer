import { SPARQLSelectResponse } from './index.types';

export async function buildSPARQLquery(
    endpoint: string,
    sparqlQuery: string
): Promise<SPARQLSelectResponse> {
    const formattedQuery: string = queryNormalizer(sparqlQuery);
    const encodedQuery: string = encodeURIComponent(formattedQuery);
    const sparqlQueryUrl: string = `${endpoint}?query='${encodedQuery} `;
    return await fetchSPARQLResponse(sparqlQueryUrl);
}

export async function fetchSPARQLResponse(url: string): Promise<SPARQLSelectResponse> {
    const headers = { Accept: 'application/sparql-results+json' };
    let response: Response;

    try {
        response = await fetch(url, { headers });
    } catch (error) {
        throw new Error(`Failed to get SPARQL Select Response: ${error}`);
    }
    return await response.json();
}
