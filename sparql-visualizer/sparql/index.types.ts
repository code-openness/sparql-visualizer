export type SPARQLResponse = SPARQLAskResponse | SPARQLSelectResponse;

export interface SPARQLAskResponse {
    boolean: boolean;
}

export interface SPARQLSelectResponse {
    head: SPARQLHead;
    results: SPARQLResults;
}

export interface SPARQLHead {
    vars: string[];
    link: string[];
}

export interface SPARQLResults {
    bindings: SPARQLDataRow[];
}

export interface SPARQLDataRow {
    [key: string]: RDFTerm;
}

export type RDFTerm = RDFTermIRI | RDFTermLiteral | RDFTermLiteralLanguage | RDFTermLiteralDatatype | RDFTermBlankNode;

export interface RDFTermIRI {
    type: 'uri';
    value: string;
}

export interface RDFTermLiteral {
    type: 'literal';
    value: string;
}

export interface RDFTermLiteralLanguage {
    type: 'literal';
    value: string;
    'xml:lang': string;
}

export interface RDFTermLiteralDatatype {
    type: 'literal';
    value: string;
    datatype: string;
}

export interface RDFTermBlankNode {
    type: 'bnode';
    value: string;
}

export interface DataRow {
    [key: string]: string;
}
