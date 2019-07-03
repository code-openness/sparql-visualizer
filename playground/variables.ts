import { VisualisationIdentifier } from '../sparql-visualizer/visualizations/index.types';
import { WikidataEndpoint } from '../sparql-visualizer/wikidata-endpoint';
import { DEFAULT_WIKIDATA_CONFIG, FU_WIKIDATA_CONFIG } from '../sparql-visualizer/wikidata-endpoint/Endpoint';

export const ENDPOINT_LIST: WikidataEndpoint[] = [
    new WikidataEndpoint(DEFAULT_WIKIDATA_CONFIG),
    new WikidataEndpoint(FU_WIKIDATA_CONFIG)
];

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
