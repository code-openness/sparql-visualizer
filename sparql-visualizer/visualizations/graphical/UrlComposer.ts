import { queryNormalizer } from '../../sparql/Normalizer';

type VisualizationParameters = import('../../serializer').VisualizationParameters;

export function constructGraphicalVisualizerUrl({
    query,
    visualizationType,
    endpoint
}: VisualizationParameters): string {
    const encodedQuery: string = encodeURIComponent(`#defaultView:${visualizationType}\n${queryNormalizer(query)}`);
    return `${endpoint.getSPARQLVisualisationURL()}#${encodedQuery}`;
}
