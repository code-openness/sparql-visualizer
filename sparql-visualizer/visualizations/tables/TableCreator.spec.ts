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
        window.fetch = createHTMLTableStub;
        createHTMLTableStub.resolves(createStubResponse());
        // const spy = sinon.spy as unknown as DataRow[];

        await createDataTable(endpointStub, '');

        // expect(createHTMLTableStub.calledOnce).toBeTruthy;
        // expect(spy).toBeCalledWith();

        // createHTMLTableStub.restore();
        sinon.assert.calledOnce(createHTMLTableStub);
        // expect(createHTMLTableStub.calledOnce).toEqual([endpointStub, '']);
    });
    function createStubResponse(returnValue: object = {}): Response {
        return {
            json: sinon.stub().resolves(returnValue)
        } as any;
    }
});
