import sinon from 'sinon';
import { DataRow } from '../../sparql/index.types';
import * as SPARQLRequest from '../../sparql/Request';
import { WikidataEndpoint } from '../../wikidata-endpoint';
import * as HTMLTable from '../tables/Serializer';
import { createDataTable } from './TableCreator';

type SinonStub = import('sinon').SinonStub;
// const SPARQL_QUERY: string = '# sparql query';
const DATA_ROW_EXAMPLE: DataRow[] = [
    { Moep: 'f', Blubb: 'h', kljlk: 'v' },
    { Moep: 'm', Blubb: 'n', kljlk: 'k' }
];

describe('TableCreator', () => {
    let endpointStub: WikidataEndpoint;

    beforeEach(() => {
        endpointStub = sinon.createStubInstance(WikidataEndpoint) as any;
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call requestQueryResults', async () => {
        const requestQueryResultsStub: SinonStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.yields();
        const spy = (sinon.spy as unknown) as string;
        await createDataTable(endpointStub, spy);
        expect(spy).toHaveBeenCalledWith;
        requestQueryResultsStub.restore();
    });

    it('should call requestQueryResults returns a List', async () => {
        const requestQueryResultsStub: SinonStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.yields();
        const spy = (sinon.spy as unknown) as string;
        await createDataTable(endpointStub, spy);
        expect(spy).toContain;
        requestQueryResultsStub.restore();
    });

    it('should call crateHTMLTable', async () => {
        const createHTMLTableStub: SinonStub = sinon.stub(HTMLTable, 'createHTMLTable');
        const requestQueryResultsStub: SinonStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.returns(DATA_ROW_EXAMPLE);

        await createDataTable(endpointStub, '');

        sinon.assert.calledOnce(createHTMLTableStub);
    });
});
