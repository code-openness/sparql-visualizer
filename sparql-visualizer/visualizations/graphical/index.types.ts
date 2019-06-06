export type VisualisationIdentifier =
    | 'BubbleChart'
    | 'BarChart'
    | 'Table'
    | 'ScatterChart'
    | 'AreaChart'
    | 'Tree'
    | 'Dimensions'
    | 'Graph'
    | 'Timeline'
    | 'TreeMap'
    | 'Map'
    | 'ImageGrid'
    | 'LineChart';

export interface FindAndReplacePattern {
    [key: string]: string;
};
