import {
  WikidataEndpoint,
  DEFAULT_WIKIDATA_HOST,
  DEFAULT_WIKIDATA_PROTOCOL
} from "./Endpoint";

type HttpProtocol = import("./index.types").HttpProtocol;

const HTTP_PROTOCOL: HttpProtocol = "http";
const WIKIDATA_HOST: string = "pik-wikidata.de";

describe("Wikidata Endpoint", () => {
  let wikidataEndpoint: WikidataEndpoint;

  beforeEach(() => {
    wikidataEndpoint = new WikidataEndpoint(HTTP_PROTOCOL, WIKIDATA_HOST);
  });

  it("should return the default protocol if no protocol was provided", () => {
    wikidataEndpoint = new WikidataEndpoint();
    expect(wikidataEndpoint.getProtocol()).toEqual(DEFAULT_WIKIDATA_PROTOCOL);
  });

  it("should return the default host if no host was provided", () => {
    wikidataEndpoint = new WikidataEndpoint();
    expect(wikidataEndpoint.getHost()).toEqual(DEFAULT_WIKIDATA_HOST);
  });

  it("should compose the valid sparql query endpoint url", () => {
    expect(wikidataEndpoint.getSPARQLQueryURL()).toEqual(
      "http://query.pik-wikidata.de"
    );
  });

  it("should compose the valid sparql query visualization url", () => {
    expect(wikidataEndpoint.getSPARQLVisualisationURL()).toEqual(
      "http://query.pik-wikidata.de/embed.html"
    );
  });
});
