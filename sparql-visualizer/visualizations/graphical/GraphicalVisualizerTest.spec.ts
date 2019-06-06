import { additionalSymbolEncoding, constructGraphicalVisualizerUrl } from './graphicalVisualizer';
type VisualisationIdentifier = import('./index.types').VisualisationIdentifier;

describe('GraphicalVisualizer', () => {
    it('should encode the specified query for the HTML format', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const sparqlQuery: string = `SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label)
WITH {
  SELECT (COUNT(?work) as ?count) ?venue WHERE {
    ?work wdt:P50 wd:Q16733372 .
    ?work wdt:P1433 ?venue .
  }
  GROUP BY ?venue
} AS %counts
WHERE {
  INCLUDE %counts
  ?venue rdfs:label ?long_venue_label FILTER(LANG(?long_venue_label) = 'en')
  OPTIONAL { ?venue wdt:P1813 ?short_name . }
  BIND(COALESCE(?short_name, ?long_venue_label) AS ?venue_label_)
}
GROUP BY ?venue ?count
ORDER BY DESC(?count)  `;
// tslint:disable-next-line:max-line-length
        const encodedURL: string ="https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%0AWITH%20%7B%0ASELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%7D%0AGROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0AINCLUDE%20%25counts%0A%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0AOPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0ABIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)";
            expect(
          constructGraphicalVisualizerUrl(sparqlQuery, endpoint, visualisationType)
        ).toEqual(encodedURL);
    });
  it('should encode the specified string in correct order for URL' , () => {
      const endpoint: string = 'https://query.wikidata.org/';
      const visualisationType: VisualisationIdentifier = 'BubbleChart';
      const stringExample: string = `hello`;
      const encodedURL: string =
          "https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0Ahello"
          expect(
        constructGraphicalVisualizerUrl(stringExample, endpoint, visualisationType)
      ).toEqual(encodedURL);
  });
});

describe('Encoding of brakets and slash', () =>  {
  it('should replace ( with %28', () => {
    const exampleString: string = "abd(nklk";
    const expectedString: string = "abd%28nklk"
    expect(
      additionalSymbolEncoding(exampleString)
    ).toEqual(expectedString);
  });
 it('should replace ) with %29', () => {
  const exampleString: string = "abd)nklk";
  const expectedString: string = "abd%29nklk"
  expect(
    additionalSymbolEncoding(exampleString)
  ).toEqual(expectedString);
  });
  it('should replace \' with %27', () => {
    const exampleString: string = "abd'nklk";
    const expectedString: string = "abd%27nklk"
    expect(
      additionalSymbolEncoding(exampleString)
    ).toEqual(expectedString);
  });
});