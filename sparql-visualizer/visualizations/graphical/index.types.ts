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

export type URLTypeIdentifier = 'HTML' | 'iFrame';

export type FindAndReplacePattern = {
    key: RegExp;
    value: string;
};
