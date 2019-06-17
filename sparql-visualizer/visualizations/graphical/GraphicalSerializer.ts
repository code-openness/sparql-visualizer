import { WikidataEndpoint } from '../../wikidata-endpoint';
import { constructGraphicalVisualizerUrl } from './GraphicalVisualizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function createGraphElement(
    query: string,
    visualizationType: VisualisationIdentifier,
    endpoint: WikidataEndpoint
): HTMLElement {
    const urlString: string = constructGraphicalVisualizerUrl(query, visualizationType, endpoint);
    return composeIFrame(urlString);
}
export function composeIFrame(urlString: string): HTMLElement {
    const iframe: HTMLIFrameElement = document.createElement('iframe');
    iframe.src = urlString;
    return iframe as HTMLElement;
}
