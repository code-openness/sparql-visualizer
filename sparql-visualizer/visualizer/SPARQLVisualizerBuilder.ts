import { WikidataEndpoint } from '../wikidata-endpoint';
import { SPARQLVisualizer } from './SPARQLVisualizer';

type HttpProtocol = import('../wikidata-endpoint').HttpProtocol;

export class SPARQLVisualizerBuilder {
    private host?: string;
    private httpProtocol?: HttpProtocol;

    public withHost(host: string): SPARQLVisualizerBuilder {
        this.host = host;
        return this;
    }

    public withProtocol(protocol: HttpProtocol): SPARQLVisualizerBuilder {
        this.httpProtocol = protocol;
        return this;
    }

    public build(): SPARQLVisualizer {
        const { host, httpProtocol } = this;

        const wikidataEndpoint: WikidataEndpoint = new WikidataEndpoint({
            host,
            httpProtocol
        });

        return new SPARQLVisualizer(wikidataEndpoint);
    }
}
