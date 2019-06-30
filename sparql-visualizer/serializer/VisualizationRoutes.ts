import { createTableElement } from '../visualizations';
import { createGraphElement } from '../visualizations';

type VisualizationFunction = import('./index.types').VisualizationFunction;
type VisualizationRoutingEntry = import('./index.types').VisualizationRoutingEntry;
type VisualisationIdentifier = import('../visualizations/index.types').VisualisationIdentifier;

export function selectMatchingVisualizationCallback(visualizationType: VisualisationIdentifier): VisualizationFunction {
    const routingTable: VisualizationRoutingEntry[] = [
        { visualizationType: 'Table', createElement: createTableElement },
        { visualizationType: 'BubbleChart', createElement: createGraphElement },
        { visualizationType: 'BarChart', createElement: createGraphElement },
        { visualizationType: 'ScatterChart', createElement: createGraphElement },
        { visualizationType: 'AreaChart', createElement: createGraphElement },
        { visualizationType: 'Tree', createElement: createGraphElement },
        { visualizationType: 'Dimensions', createElement: createGraphElement },
        { visualizationType: 'Graph', createElement: createGraphElement },
        { visualizationType: 'Timeline', createElement: createGraphElement },
        { visualizationType: 'TreeMap', createElement: createGraphElement },
        { visualizationType: 'Map', createElement: createGraphElement },
        { visualizationType: 'ImageGrid', createElement: createGraphElement },
        { visualizationType: 'LineChart', createElement: createGraphElement }
    ];

    const matchingEntriesWithDefault: VisualizationRoutingEntry[] = routingTable.filter(
        (routingEntry: VisualizationRoutingEntry): boolean => visualizationType === routingEntry.visualizationType
    );

    if (matchingEntriesWithDefault.length > 0) {
        return matchingEntriesWithDefault[0].createElement;
    } else {
        return createGraphElement;
    }
}
