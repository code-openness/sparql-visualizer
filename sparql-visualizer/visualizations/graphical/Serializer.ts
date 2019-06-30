import { constructGraphicalVisualizerUrl } from './UrlComposer';
import { createElement } from '../../serializer/DomAccess';

type VisualizationParameters = import('../../serializer/index.types').VisualizationParameters;

export async function createGraphElement({
    query,
    visualizationType,
    endpoint
}: VisualizationParameters): Promise<HTMLElement> {
    const graphUrl: string = constructGraphicalVisualizerUrl({ query, visualizationType, endpoint });
    return createElement(`<iframe src="${graphUrl}"></iframe>`);
}
