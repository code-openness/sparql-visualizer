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

    it('should encode the comments from a extensive query correctly', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const visualisationType: VisualisationIdentifier = 'BarChart';
        const sparqlQuery: string = `# Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
# Shubhanshu Mishra, Vetle Torvik
select ?year (count(?work) as ?number_of_publications) ?role where {
  {
    select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
      # default values = 0
      ?year_item wdt:P31 wd:Q577 .
    }
  }
}`;
        const encodedURL: string =
            "https://query.wikidata.org/embed.html#%23defaultView%3ABarChart%0A%23%20Inspired%20from%20LEGOLAS%20-%20http%3A%2F%2Fabel.lis.illinois.edu%2Flegolas%2F%0A%23%20Shubhanshu%20Mishra%2C%20Vetle%20Torvik%0Aselect%20%3Fyear%20(count(%3Fwork)%20as%20%3Fnumber_of_publications)%20%3Frole%20where%20%7B%0A%7B%0Aselect%20(str(%3Fyear_)%20as%20%3Fyear)%20(0%20as%20%3Fpages)%20(%22_%22%20as%20%3Frole)%20where%20%7B%0A%23%20default%20values%20%3D%200%0A%3Fyear_item%20wdt%3AP31%20wd%3AQ577%20.%0A%7D%0A%7D%0A%7D"        /* tslint:enable: max-line-length */
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