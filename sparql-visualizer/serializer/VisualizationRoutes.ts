import { createTableElement } from '../visualizations';
import { createGraphElement } from '../visualizations';

type VisualizationFunction = import('./index.types').VisualizationFunction;
type VisualizationRoutingEntry = import('./index.types').VisualizationRoutingEntry;
type VisualisationIdentifier = import('../visualizations/index.types').VisualisationIdentifier;

export function selectMatchingVisualizationCallback(visualizationType: VisualisationIdentifier): VisualizationFunction {
    const matchingEntriesWithDefault: VisualizationRoutingEntry[] = routingTable.filter(
        (routingEntry: VisualizationRoutingEntry): boolean =>
            visualizationType === routingEntry.visualizationType || routingEntry.visualizationType === 'Default'
    );

    if (matchingEntriesWithDefault.length > 0) {
        return matchingEntriesWithDefault[0].createElement;
    } else {
        throw new Error('No default visualization route found');
    }
}

const routingTable: VisualizationRoutingEntry[] = [
    { visualizationType: 'Table', createElement: createTableElement },
    { visualizationType: 'Default', createElement: createGraphElement }
];
