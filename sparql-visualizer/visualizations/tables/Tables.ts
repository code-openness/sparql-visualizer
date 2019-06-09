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

export async function buildHTMLtable(endpoint: string, sparqlQuery: string) {
    const jsonString = buildSPARQLquery(endpoint, sparqlQuery);
    const headerValues = [];
    for (let index = 0; index < jsonString.length; index++) {
        for (const key in jsonString[index]) {
            if (headerValues.indexOf(key) == -1) {
                headerValues.push(key);
            }
        }
    }

    const table = document.createElement('table');

    let tableRow = table.insertRow(-1);
    for (let index = 0; index < headerValues.length; index++) {
        const tableHeader = document.createElement('th');
        tableHeader.innerHTML = headerValues[index];
        tableRow.appendChild(tableHeader);
    }
    // add JSON data to the table
    for (let i = 0; i < jsonString.length; i++) {
        tableRow = table.insertRow(-1);
        for (let j = 0; j < headerValues.length; j++) {
            const tabCell = tableRow.insertCell(-1);
            tabCell.innerHTML = jsonString[i][headerValues[j]];
        }
    }
    // let rows = data.data.map(d => `<tr><td>${d.name}</td></tr>`);
    return `<table>${rows}</table>`;
}
