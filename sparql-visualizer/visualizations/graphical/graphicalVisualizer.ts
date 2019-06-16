import { queryNormalizer } from '../../sparql/Normalizer';
import { WikidataEndpoint } from '../../wikidata-endpoint';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(
    query: string,
    vizualizationType: VisualisationIdentifier,
    endpoint: WikidataEndpoint
): string {
    const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
    const encodedQuery: string = `${endpoint.getSPARQLVisualisationURL()}${encodeURIComponent(
        constructQuery
    )}`;
    return encodedQuery;
}
