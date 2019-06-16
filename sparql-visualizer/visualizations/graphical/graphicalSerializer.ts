import { WikidataEndpoint } from '../../wikidata-endpoint';
import { constructGraphicalVisualizerUrl } from '../graphical/graphicalVisualizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

export function createGraphicalIFrame(urlString: string): HTMLElement {
    const iframe = document.createElement('iframe');
    iframe.src = urlString;
    return iframe as HTMLElement;
}
export function makeGraphicalUrl(
    query: string,
    vizualizationType: VisualisationIdentifier,
    endpoint: WikidataEndpoint
): string {
    const urlSting: string = constructGraphicalVisualizerUrl(query, vizualizationType, endpoint);
    return urlSting;
}
