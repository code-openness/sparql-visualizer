export type TableVisualisationIdentifier =  'Table';

export type SPARQLResponse = SPARQLAskResponse | SPARQLSelectResponse; 

export interface SPARQLAskResponse {
    boolean: boolean;
};

export interface SPARQLSelectResponse {
    head: SPARQLHead;
    results: SPARQLResults;
};

interface SPARQLHead {
    vars: string[];
    link: string[];
};

interface SPARQLResults {
    bindings: SPARQLDataRow[];
};

interface SPARQLDataRow {
    [key: string]: RDFTerm;
};

type RDFTerm =
    | RDFTermIRI
    | RDFTermLiteral
    | RDFTermLiteralLanguage
    | RDFTermLiteralDatatype
    | RDFTermBlankNode;

interface RDFTermIRI {
    type: 'uri';
    value: string;
};

interface RDFTermLiteral{
    type: 'literal';
    value: string;
};

interface RDFTermLiteralLanguage{
    type: 'literal';
    value: string;
    'xml:lang': string;
};

interface RDFTermLiteralDatatype{
    type: 'literal';
    value: string;
    datatype: string;
};

interface RDFTermBlankNode {
    type: 'bnode',
    value: string;
};
