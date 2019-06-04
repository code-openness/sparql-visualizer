import {graphicalVisualizerUrlConstructor} from './GraphicalVisualizer';
type VisualisationIdentifier = import ('./index.types').VisualisationIdentifier;
type URLTypeIdentifier = import ('./index.types').URLTypeIdentifier;


describe ('GraphicalVisualizer', () => {
  it('should encode the specified querry for the iFrame format', () => {
    const endpoint: string = 'https://query.wikidata.org/';
    const urlType: URLTypeIdentifier = 'iFrame';
    const visualisationType: VisualisationIdentifier = 'BubbleChart';
    const sparqlQuery = `SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) 
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
    const encodedURL: string= "https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20";
    expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  });
  it('should encode the specified querry for the HTML format', () => {
      const endpoint: string = 'https://query.wikidata.org/';
      const urlType: URLTypeIdentifier = 'HTML';
      const visualisationType: VisualisationIdentifier = 'BubbleChart';
      const sparqlQuery = `SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) 
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
      const encodedURL: string= "https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%20%0AWITH%20%7B%0A%20%20SELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)%20%20";
      expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  });

    it('should encode the specified querry for the Wikilink format', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const urlType: URLTypeIdentifier = 'Wikilink';
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
        const encodedURL: string= "https://query.wikidata.org/#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%20%0AWITH%20%7B%0A%20%20SELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)%20%20";
        expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
    });

    it('should encode the specified querry for the SPARQL format', () => {
        const endpoint: string = 'https://query.wikidata.org/';
        const urlType: URLTypeIdentifier = 'SPARQL';
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
        const encodedURL: string= "https://query.wikidata.org/sparql?query=%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%20%0AWITH%20%7B%0A%20%20SELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)%20%20";
        expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
    });
})