import { WikidataEndpoint } from '../wikidata-endpoint';
import { createElement } from './DomAccess';
import { selectMatchingVisualizationCallback } from './VisualizationRoutes';

type VisualisationIdentifier = import('../visualizations/index.types').VisualisationIdentifier;
type VisualizationFunction = import('./index.types').VisualizationFunction;
type VisualizationParameters = import('./index.types').VisualizationParameters;
type WikidataEndpointConfig = import('../wikidata-endpoint').WikidataEndpointConfig;

export const CSS_PREFIX: string = 'sparql-visualizer';

export const CSS_CLASSES: { [key: string]: string } = {
    GRAPH_CONTAINER: `${CSS_PREFIX}-graph__container`,
    GRAPH_ELEMENT: `${CSS_PREFIX}-graph__element`
};

export class Serializer {
    private endpoint: WikidataEndpoint = new WikidataEndpoint();

    public async serialize(): Promise<void> {
        const elementsToVisualize: HTMLElement[] = Array.from(document.querySelectorAll('[data-visualization]'));

        await Promise.all(elementsToVisualize.map((element: HTMLElement): Promise<void> => this.visualize(element)));
    }

    public withEndpoint(endpointConfig: WikidataEndpointConfig): Serializer {
        this.endpoint = new WikidataEndpoint(endpointConfig);
        return this;
    }

    public async visualize(externalContainer: HTMLElement): Promise<void> {
        const visualizationParameters: VisualizationParameters = {
            ...getParameters(externalContainer),
            endpoint: this.endpoint
        };

        const visualizationElement: HTMLElement = await createVisualizationElement(visualizationParameters);
        const visualizationContainer: HTMLElement = createVisualizationContainer();

        visualizationContainer.appendChild(visualizationElement);
        externalContainer.appendChild(visualizationContainer);
    }
}

async function createVisualizationElement(visualizationParameters: VisualizationParameters): Promise<HTMLElement> {
    const { visualizationType } = visualizationParameters;

    const createVisualization: VisualizationFunction = selectMatchingVisualizationCallback(visualizationType);

    const visualization: HTMLElement = await createVisualization(visualizationParameters);
    visualization.classList.add(CSS_CLASSES.GRAPH_ELEMENT);

    return visualization;
}

function createVisualizationContainer(): HTMLElement {
    return createElement(`<div class="${CSS_CLASSES.GRAPH_CONTAINER}"></div>`);
}

function getParameters(element: HTMLElement): { query: string; visualizationType: VisualisationIdentifier } {
    const visualizationType: VisualisationIdentifier = element.getAttribute(
        'data-visualization'
    ) as VisualisationIdentifier;

    const queryElement: HTMLElement | null = element.querySelector('[data-content=Query]');

    if (!queryElement) {
        throw new Error('Could not find element with data-content="Query"');
    }

    const query: string = queryElement.textContent!;

    return { query, visualizationType };
}
