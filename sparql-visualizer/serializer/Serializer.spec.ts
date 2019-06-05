import { extractParametersFromJsonElement } from './Serializer';

type VisualisationParameters = import('./index.types').VisualisationParameters;

describe('Serializer', () => {
    it('should read the parameters from the JSON', () => {
        const parameterJsonElement: HTMLElement = document.createElement(`
            <script type="application/json">
                {
                    query: ''
                }
            </script>
         `);

        expect(extractParametersFromJsonElement(parameterJsonElement)).toEqual({
            query: ''
        });
    });
});
