import { constructGraphicalVisualizerUrl } from './graphicalVisualizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

describe('GraphicalVisualizer', () => {
    it('should encode the specified string in correct order for URL', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = `hello`;
        const encodedURL: string =
            'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0Ahello';
        expect(constructGraphicalVisualizerUrl(stringExample, visualisationType, endpoint)).toEqual(
            encodedURL
        );
    });
});
