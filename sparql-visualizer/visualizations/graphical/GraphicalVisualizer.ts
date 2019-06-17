import { queryNormalizer } from '../../sparql/Normalizer';
import { WikidataEndpoint } from '../../wikidata-endpoint';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(
    query: string,
    vizualisationType: VisualisationIdentifier,
    endpoint: WikidataEndpoint
): string {
    const constructQuery: string = `#defaultView:${vizualisationType}\n${queryNormalizer(query)}`;
    const encodeQuery: string = `${endpoint.getSPARQLVisualisationURL()}${encodeURIComponent(
        constructQuery
    )}`;
    return encodeQuery;
}
