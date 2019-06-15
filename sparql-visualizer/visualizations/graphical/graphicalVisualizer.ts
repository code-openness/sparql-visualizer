import { queryNormalizer } from '../../sparql/Normalizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function constructGraphicalVisualizerUrl(
    query: string,
    endpoint: string,
    vizualizationType: VisualisationIdentifier
): string {
    const constructQuery: string = `#defaultView:${vizualizationType}\n${queryNormalizer(query)}`;
    const encodedQuery: string = `${endpoint}embed.html#${encodeURIComponent(constructQuery)}`;
    return encodedQuery;
}
