import sinon from 'sinon';
import * as SPARQLRequest from '../../sparql/Request';
import { WikidataEndpoint } from '../../wikidata-endpoint';
import * as HTMLTable from '../tables/Serializer';
import { createDataTable } from './TableCreator';
// import { DataRow } from '../../sparql/index.types';

type SinonStub = import('sinon').SinonStub;

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
        expect(spy).toHaveBeenCalled;
        requestQueryResultsStub.restore();
    });

    it('should call crateHTMLTable', async () => {
        const createHTMLTableStub: SinonStub = sinon.stub(HTMLTable, 'createHTMLTable');
        const requestQueryResultsStub: SinonStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.returns([
            { Moep: 'f', Blubb: 'h', kljlk: 'v' },
            { Moep: 'm', Blubb: 'n', kljlk: 'k' }
        ]);

        await createDataTable(endpointStub, '');

        sinon.assert.calledOnce(createHTMLTableStub);
    });
});
