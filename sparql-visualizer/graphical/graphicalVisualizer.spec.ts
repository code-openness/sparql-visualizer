import { constructQuerry, constructHtmlUrl, encodeQuerry} from './graphicalVisualizer';

/** ENCODED URI Tests */
const endpointUrl = 'https://query.wikidata.org/embed.html#';
//const vizualizationType = 'BubbleChart'

//exactly like Wikilink: 
const expectedURL = "https://query.wikidata.org/#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%20%0AWITH%20%7B%0A%20%20SELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)%20%20";

//exactly as the URL directly from Querry page:
const expectedURL2 = "https://query.wikidata.org/sparql#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20";

//exactly like in iFrame: //here the brackets also have to be encoded to 28=( and 29=) and 27 = ' which also didn't get encoded to be correct
const expectedUrlHtml ="https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20";

const encodedPart = "%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20"
const encodedPart2 = "%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%20%0AWITH%20%7B%0A%20%20SELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)%20%20";

//important to have a new line after ` symbol
const simpleSparqlQuery = `SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) 
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
ORDER BY DESC(?count)  `

const sparqlQuery = `#defaultView:BubbleChart
SELECT ?count ?venue (SAMPLE(?venue_label_) AS ?venue_label) 
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
ORDER BY DESC(?count)  `


test('check if querry construction == example querry', () => {
    expect(constructQuerry('BubbleChart', simpleSparqlQuery)).toEqual(sparqlQuery);
});

test('check if iFrame URL == HTML URL', () => {
    expect(constructHtmlUrl(sparqlQuery, endpointUrl)).toEqual(expectedUrlHtml);
});

test('check if encoded part is correct for HTML', () => {
    expect(encodeQuerry(sparqlQuery)).toEqual(encodedPart);
});

test('check if encoded part is correct for HTML', () => {
    expect(escape(sparqlQuery)).toEqual(encodedPart);
});


/** Expected URL copied from iFrame/ Wikilink */

test('check if iFrame URL == Wikilink URL', () => {
    expect(constructHtmlUrl(sparqlQuery, endpointUrl)).not.toEqual(expectedURL);
});

/** Expected URL copied from SPARQL Querry URL  */
test('check if SPARQL Code URL == SPARQL URL', () => {
    expect(constructHtmlUrl(sparqlQuery, endpointUrl)).not.toEqual(expectedURL2);
});


test('check if encoded part is correct for SPARQL', () => {
    expect(escape(sparqlQuery)).not.toEqual(encodedPart2);
});
