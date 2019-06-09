import sinon, { SinonStub } from 'sinon';
import { SPARQLSelectResponse } from './index.types';
import { buildSPARQLquery, fetchSPARQLResponse } from './Tables';

describe('TestTables', () => {
    let fetchStub: SinonStub;

    beforeEach(() => {
        fetchStub = sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        sinon.restore();
    });
    /** buildSPARQLqery  */
    it('should build the correct SPARQL query', async () => {});

    it('should pass the correct url and the correct headers to the request', async () => {
        fetchStub.resolves({ json: sinon.fake() });

        await fetchSPARQLResponse('');

        expect(fetchStub.firstCall.args).toEqual([
            '',
            { headers: { Accept: 'application/sparql-results+json' } }
        ]);
    });

    it('should throw an error if the request fails', async () => {
        fetchStub.rejects();

        expect(async () => await fetchSPARQLResponse('')).toThrow();
    });

    it('should return the json value of the received response', async () => {
        const expectedQueryResult: SPARQLSelectResponse = {
            head: {
                vars: [],
                link: []
            },
            results: {
                bindings: []
            }
        };

        fetchStub.resolves({
            json: async (): Promise<SPARQLSelectResponse> => expectedQueryResult
        });

        const queryResult: SPARQLSelectResponse = await fetchSPARQLResponse('');

        expect(queryResult).toEqual(expectedQueryResult);
    });
});

/** interfaces durch JSON
 * results and head
 * response JSON von welchem Typ definieren
 */
