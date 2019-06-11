import { extractParametersFromJsonElement } from './Serializer';

const SPARQL_QUERY: string = 'SELECT * FROM *';

describe('Serializer', () => {
    it('should read the parameters from the JSON', () => {
        const parameterJsonElement: HTMLElement = document.createElement(`
            <script type="application/json">
                {
                    query: ${SPARQL_QUERY}
                }
            </script>
         `);

        expect(extractParametersFromJsonElement(parameterJsonElement)).toEqual({
            query: SPARQL_QUERY
        });
    });
});
