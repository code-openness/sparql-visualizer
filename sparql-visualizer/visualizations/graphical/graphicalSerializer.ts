import { WikidataEndpoint } from '../../wikidata-endpoint';
import { constructGraphicalVisualizerUrl } from './GraphicalVisualizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function composeIFrame(urlString: string): HTMLElement {
    const iframe: HTMLIFrameElement = document.createElement('iframe');
    iframe.src = urlString;
    return iframe as HTMLElement;
}
export function createGraphElement(
    query: string,
    vizualizationType: VisualisationIdentifier,
    endpoint: WikidataEndpoint
): HTMLElement {
    const urlSting: string = constructGraphicalVisualizerUrl(query, vizualizationType, endpoint);
    return composeIFrame(urlSting);
}
