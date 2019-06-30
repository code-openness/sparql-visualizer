import { WikidataEndpoint, WikidataEndpointConfig } from '../wikidata-endpoint';
import { createElement } from './DomAccess';
import { selectMatchingVisualizationCallback } from './VisualizationRoutes';
import { VisualizationFunction } from './index.types';

type VisualisationIdentifier = import('../visualizations/index.types').VisualisationIdentifier;

export const CSS_CLASSES: { [key: string]: string } = {
    GRAPHIC: 'sparql-visualizer__graph'
};

export class Serializer {
    private endpoint: WikidataEndpoint = new WikidataEndpoint();

    public async serialize(): Promise<void> {
        const elementsToVisualize: NodeListOf<HTMLElement> = document.querySelectorAll('[data-visualization]');

        elementsToVisualize.forEach((element: HTMLElement) => this.visualize(element));
    }

    public withEndpoint(endpointConfig: WikidataEndpointConfig): Serializer {
        this.endpoint = new WikidataEndpoint(endpointConfig);
        return this;
    }

    public async visualize(element: HTMLElement): Promise<void> {
        const { endpoint } = this;
        const { visualizationType, query } = this.getParameters(element);

        const createVisualization: VisualizationFunction = selectMatchingVisualizationCallback(visualizationType);

        const visualization: HTMLElement = await createVisualization({
            endpoint,
            query,
            visualizationType
        });

        const graphContainer: HTMLElement = createElement(`<div class="${CSS_CLASSES.GRAPHIC}"></div>`);
        graphContainer.appendChild(visualization);

        element.appendChild(graphContainer);
    }

    private getParameters(element: HTMLElement): { visualizationType: VisualisationIdentifier; query: string } {
        const visualizationType: VisualisationIdentifier = element.getAttribute(
            'data-visualization'
        ) as VisualisationIdentifier;
        const query: string = (element.firstElementChild as HTMLElement).innerText;

        return { visualizationType, query };
    }
}
