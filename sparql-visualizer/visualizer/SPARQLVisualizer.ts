import { WikidataEndpoint } from '../wikidata-endpoint';

export class SPARQLVisualizer {
    constructor(private readonly wikidataEndpoint: WikidataEndpoint) {}

    public visualize(): void {
        this.wikidataEndpoint.getSPARQLQueryURL();
    }
}
