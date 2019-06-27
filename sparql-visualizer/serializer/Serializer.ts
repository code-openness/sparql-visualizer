import { createGraphElement } from '../visualizations/graphical/GraphicalSerializer';
import { createDataTable } from '../visualizations/tables/TableCreator';
import { WikidataEndpoint, WikidataEndpointConfig } from '../wikidata-endpoint';
import { createElement } from './DomAccess';

type VisualisationIdentifier = import('../visualizations/index.types').VisualisationIdentifier;

export const CSS_CLASSES: { [key: string]: string } = {
    WRAPPER: 'sparql-visualizer__wrapper',
    GRAPHIC: 'sparql-visualizer__graph'
};

export class Serializer {
    private endpoint: WikidataEndpoint = new WikidataEndpoint();

    public async serialize(): Promise<void> {
        const elementsToVisualize: NodeListOf<HTMLElement> = document.querySelectorAll(
            '[data-visualization]'
        );

        elementsToVisualize.forEach((element: HTMLElement) => this.visualize(element));
    }

    public withEndpoint(endpointConfig: WikidataEndpointConfig): Serializer {
        this.endpoint = new WikidataEndpoint(endpointConfig);
        return this;
    }

    public async visualize(element: HTMLElement): Promise<void> {
        const { endpoint } = this;
        const { visualizationType, query } = this.getParameters(element);

        if (visualizationType === 'Table') {
            let tableElement: HTMLElement;

            try {
                tableElement = await createDataTable(endpoint, query);
            } catch (error) {
                tableElement = createElement('<h1>Something went wrong</h1>');
            }

            element.appendChild(tableElement);
        } else {
            const iframe: HTMLElement = createGraphElement(query, visualizationType, endpoint);

            iframe.classList.add('sparql-visualizer__resp-iframe');
            element.classList.add('sparql-visualizer__resp-container');

            element.appendChild(iframe);
        }
    }

    private getParameters(
        element: HTMLElement
    ): { visualizationType: VisualisationIdentifier; query: string } {
        const visualizationType: VisualisationIdentifier = element.getAttribute(
            'data-visualization'
        ) as VisualisationIdentifier;
        const query: string = (element.firstElementChild as HTMLElement).innerText;

        return { visualizationType, query };
    }
}
