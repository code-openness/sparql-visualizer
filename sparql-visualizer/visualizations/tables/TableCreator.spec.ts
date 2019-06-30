import * as HTMLTable from '../tables/Serializer';
import * as SPARQLRequest from '../../sparql/Request';
import sinon from 'sinon';
import { WikidataEndpoint } from '../../wikidata-endpoint';
import { createElement } from '../../serializer/DomAccess';
import { createTableElement } from './TableCreator';

type DataRow = import('../../sparql/index.types').DataRow;
type SinonStub = import('sinon').SinonStub;
type SinonStubbedInstance<ClassType> = import('sinon').SinonStubbedInstance<ClassType>;

const SPARQL_QUERY: string = 'some-sparql-query';
const SPARQL_QUERY_URL: string = 'https://query.wikidata.org/sparql?query';
const DATA_TABLE: DataRow[] = [{ Moep: 'f', Blubb: 'h', kljlk: 'v' }, { Moep: 'm', Blubb: 'n', kljlk: 'k' }];
const HTML_TABLE: HTMLElement = createElement(`<table id="sparql-table"></table>`);

describe('TableCreator', () => {
    let endpointStub: SinonStubbedInstance<WikidataEndpoint>;
    let requestQueryResultsStub: SinonStub;
    let createHTMLTableStub: SinonStub;
    let tableElement: HTMLElement;

    beforeEach(async () => {
        endpointStub = sinon.createStubInstance(WikidataEndpoint);
        endpointStub.getSPARQLQueryURL.returns(SPARQL_QUERY_URL);

        requestQueryResultsStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.resolves(DATA_TABLE);

        createHTMLTableStub = sinon.stub(HTMLTable, 'createHTMLTable');
        createHTMLTableStub.returns(HTML_TABLE);

        tableElement = await createTableElement({
            endpoint: (endpointStub as unknown) as WikidataEndpoint,
            query: SPARQL_QUERY,
            visualizationType: 'Table'
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should request the table data with the provided query and query url from the endpoint', async () => {
        expect(requestQueryResultsStub.firstCall.args).toEqual([SPARQL_QUERY_URL, SPARQL_QUERY]);
    });

    it('should create the HTML table with the received table data', async () => {
        expect(createHTMLTableStub.firstCall.args).toEqual([DATA_TABLE]);
    });

    it('should return the assembled HTML table', () => {
        expect(tableElement).toEqual(HTML_TABLE);
    });
});
