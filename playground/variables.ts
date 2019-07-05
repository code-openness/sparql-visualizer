import { VisualisationIdentifier } from '../sparql-visualizer/visualizations/index.types';
import { WikidataEndpointConfig } from '../sparql-visualizer/wikidata-endpoint';
import { DEFAULT_WIKIDATA_CONFIG, FU_WIKIDATA_CONFIG } from '../sparql-visualizer/wikidata-endpoint/Endpoint';

export const ENDPOINT_LIST: WikidataEndpointConfig[] = [DEFAULT_WIKIDATA_CONFIG, FU_WIKIDATA_CONFIG];
export const ENDPOINT_NAME_LIST: string[] = [DEFAULT_WIKIDATA_CONFIG.host, FU_WIKIDATA_CONFIG.host];

export const VISUALIZATION_TYPES_LIST: VisualisationIdentifier[] = [
    'BubbleChart',
    'BarChart',
    'Table',
    'ScatterChart',
    'AreaChart',
    'Tree',
    'Dimensions',
    'Graph',
    'Timeline',
    'TreeMap',
    'Map',
    'ImageGrid',
    'LineChart'
];

export const IFRAME_CLASS: string = 'resp-iframe';

export const DATA_ATTRIBUTE_NAME = 'data-visualization';
