import { tryEncodeUri, exampleQuerryFormatting, tryEncodeURIComponent } from './graphicalVisualizer';

/** ENCODED URI Tests */
/** Expected URL copied from iFrame/ Wikilink */
let expectedURL = "https://query.wikidata.org/#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20"

test('check if iFrame URL == encoded URL', () => {
    expect(tryEncodeUri(exampleQuerryFormatting())).toEqual(expectedURL);
});

/** Expected URL copied from SPARQL Querry URL  */
let expectedURL2 = "https://query.wikidata.org/sparql#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%20%0AWITH%20%7B%0A%20%20SELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%20%20%20%20%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%20%20%20%20%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0A%20%20INCLUDE%20%25counts%0A%20%20%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0A%20%20OPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0A%20%20BIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29%20%20"

test('check if SPARQL Code URL == encoded URL', () => {
    expect(tryEncodeUri(exampleQuerryFormatting())).toEqual(expectedURL2);
});

test('check if Formatted URL == iFrame URL', () => {
    expect(exampleQuerryFormatting()).toEqual(expectedURL2);
});

/** ENCODED URI COMPONENT Tests */
test('check if iFrame URL == encoded Component URL', () => {
    expect(tryEncodeURIComponent(exampleQuerryFormatting())).toEqual(expectedURL);
});

test('check if SPARQL URL == encoded Component URL', () => {
    expect(tryEncodeURIComponent(exampleQuerryFormatting())).toEqual(expectedURL2);
});