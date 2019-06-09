import { additionalSymbolEncoding, constructGraphicalVisualizerUrl } from './graphicalVisualizer';
type VisualisationIdentifier = import('./index.types').VisualisationIdentifier;

describe('GraphicalVisualizer', () => {
    it('should encode the specified string in correct order for URL', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = `hello`;
        const encodedURL: string =
            'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0Ahello';
        expect(constructGraphicalVisualizerUrl(stringExample, endpoint, visualisationType)).toEqual(
            encodedURL
        );
    });
});

describe('Encoding of brakets and slash', () => {
    it('should replace ( with %28', () => {
        const exampleString: string = 'abd(nklk';
        const expectedString: string = 'abd%28nklk';
        expect(additionalSymbolEncoding(exampleString)).toEqual(expectedString);
    });
    it('should replace ) with %29', () => {
        const exampleString: string = 'abd)nklk';
        const expectedString: string = 'abd%29nklk';
        expect(additionalSymbolEncoding(exampleString)).toEqual(expectedString);
    });
    it("should replace ' with %27", () => {
        const exampleString: string = "abd'nklk";
        const expectedString: string = 'abd%27nklk';
        expect(additionalSymbolEncoding(exampleString)).toEqual(expectedString);
    });
});
