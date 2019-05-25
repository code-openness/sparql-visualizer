type HttpProtocol = import("./index.types").HttpProtocol;

export const DEFAULT_WIKIDATA_PROTOCOL: HttpProtocol = "https";
export const DEFAULT_WIKIDATA_HOST: string = "wikidata.org";

export class WikidataEndpoint {
  constructor(
    private readonly httpProtocol: HttpProtocol = DEFAULT_WIKIDATA_PROTOCOL,
    private readonly wikidataHost: string = DEFAULT_WIKIDATA_HOST
  ) {}

  public getSPARQLQueryURL(): string {
    const { httpProtocol, wikidataHost } = this;

    return `${httpProtocol}://query.${wikidataHost}`;
  }

  public getSPARQLVisualisationURL(): string {
    const { httpProtocol, wikidataHost } = this;

    return `${httpProtocol}://query.${wikidataHost}/embed.html`
  }

  public getProtocol(): HttpProtocol {
      return this.httpProtocol;
  }

  public getHost(): string {
      return this.wikidataHost;
  }
}
