type VisualisationIdentifier = import('../visualizations').VisualisationIdentifier;
type WikidataEndpoint = import('../wikidata-endpoint').WikidataEndpoint;

export interface VisualizationRoutingEntry {
    visualizationType: VisualisationIdentifier;
    createElement: VisualizationFunction;
}

export type VisualizationFunction = (parameters: VisualizationParameters) => Promise<HTMLElement>;

export interface VisualizationParameters {
    query: string;
    visualizationType: VisualisationIdentifier;
    endpoint: WikidataEndpoint;
}
