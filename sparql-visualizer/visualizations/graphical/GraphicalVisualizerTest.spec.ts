import {graphicalVisualizerUrlConstructor, queryNormalizer} from './GraphicalVisualizer';
type VisualisationIdentifier = import ('./index.types').VisualisationIdentifier;
type URLTypeIdentifier = import ('./index.types').URLTypeIdentifier;


describe ('GraphicalVisualizer', () => {
  it('should encode the specified querry for the iFrame format', () => {
    const endpoint: string = 'https://query.wikidata.org/';
    const urlType: URLTypeIdentifier = 'iFrame';
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
    // tslint:disable-next-line
    const encodedURL: string= "https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20%28SAMPLE%28%3Fvenue_label_%29%20AS%20%3Fvenue_label%29%0AWITH%20%7B%0ASELECT%20%28COUNT%28%3Fwork%29%20as%20%3Fcount%29%20%3Fvenue%20WHERE%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%7D%0AGROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0AINCLUDE%20%25counts%0A%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER%28LANG%28%3Flong_venue_label%29%20%3D%20%27en%27%29%0AOPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0ABIND%28COALESCE%28%3Fshort_name%2C%20%3Flong_venue_label%29%20AS%20%3Fvenue_label_%29%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC%28%3Fcount%29";
    // tslint:disable-next-line
    expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  });

  it('should encode the second specified querry for the iFrame format', () => {
    const endpoint: string = 'https://query.wikidata.org/';
    const urlType: URLTypeIdentifier = 'iFrame';
    const visualisationType: VisualisationIdentifier = 'BarChart';
    /* tslint:disable: max-line-length */
    const sparqlQuery: string = `# Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
# Shubhanshu Mishra, Vetle Torvik
select ?year (count(?work) as ?number_of_publications) ?role where {
  {
    select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
      # default values = 0
      ?year_item wdt:P31 wd:Q577 .
      ?year_item wdt:P585 ?date .
      bind(year(?date) as ?year_)
      {
        select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
          ?work wdt:P50 wd:Q16733372 .
          ?work wdt:P577 ?publication_date .
          bind(year(?publication_date) as ?year_)
        }
      }
      bind(year(now())+1 as ?next_year)
      filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
    }
  }
  union {
  {
    select ?work (min(?years) as ?year) (count(?coauthors) as ?number_of_authors) ?author_number where {
      ?work (p:P50|p:P2093) ?author_statement .
      ?author_statement ps:P50 wd:Q16733372 .
      optional { ?author_statement pq:P1545 ?author_number . }
      ?work (wdt:P50|wdt:P2093) ?coauthors .
      ?work wdt:P577 ?dates .
      bind(str(year(?dates)) as ?years) .
    }
    group by ?work ?author_number
  }
  bind(coalesce(if(?number_of_authors = 1,
            'Solo author',
            if(xsd:integer(?author_number) = 1,
               'First author',
               if(xsd:integer(?author_number) = ?number_of_authors,
                  'Last author',
                  'Middle author'))), 'Unknown')
       as ?role)
   }
}
group by ?year ?role
order by ?year`;
    const encodedURL: string= "https://query.wikidata.org/embed.html#%23defaultView%3ABarChart%0Aselect%20%3Fyear%20%28count%28%3Fwork%29%20as%20%3Fnumber_of_publications%29%20%3Frole%20where%20%7B%0A%7B%0Aselect%20%28str%28%3Fyear_%29%20as%20%3Fyear%29%20%280%20as%20%3Fpages%29%20%28%22_%22%20as%20%3Frole%29%20where%20%7B%0A%23%20default%20values%20%3D%200%0A%3Fyear_item%20wdt%3AP31%20wd%3AQ577%20.%0A%3Fyear_item%20wdt%3AP585%20%3Fdate%20.%0Abind%28year%28%3Fdate%29%20as%20%3Fyear_%29%0A%7B%0Aselect%20%28min%28%3Fyear_%29%20as%20%3Fearliest_year%29%20%20%28max%28%3Fyear_%29%20as%20%3Flatest_year%29%20where%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP577%20%3Fpublication_date%20.%0Abind%28year%28%3Fpublication_date%29%20as%20%3Fyear_%29%0A%7D%0A%7D%0Abind%28year%28now%28%29%29%2B1%20as%20%3Fnext_year%29%0Afilter%20%28%3Fyear_%20%3E%3D%20%3Fearliest_year%20%26%26%20%3Fyear_%20%3C%3D%20%3Flatest_year%29%0A%7D%0A%7D%0Aunion%20%7B%0A%7B%0Aselect%20%3Fwork%20%28min%28%3Fyears%29%20as%20%3Fyear%29%20%28count%28%3Fcoauthors%29%20as%20%3Fnumber_of_authors%29%20%3Fauthor_number%20where%20%7B%0A%3Fwork%20%28p%3AP50%7Cp%3AP2093%29%20%3Fauthor_statement%20.%0A%3Fauthor_statement%20ps%3AP50%20wd%3AQ16733372%20.%0Aoptional%20%7B%20%3Fauthor_statement%20pq%3AP1545%20%3Fauthor_number%20.%20%7D%0A%3Fwork%20%28wdt%3AP50%7Cwdt%3AP2093%29%20%3Fcoauthors%20.%0A%3Fwork%20wdt%3AP577%20%3Fdates%20.%0Abind%28str%28year%28%3Fdates%29%29%20as%20%3Fyears%29%20.%0A%7D%0Agroup%20by%20%3Fwork%20%3Fauthor_number%0A%7D%0Abind%28coalesce%28if%28%3Fnumber_of_authors%20%3D%201%2C%0A%27Solo%20author%27%2C%0Aif%28xsd%3Ainteger%28%3Fauthor_number%29%20%3D%201%2C%0A%27First%20author%27%2C%0Aif%28xsd%3Ainteger%28%3Fauthor_number%29%20%3D%20%3Fnumber_of_authors%2C%0A%27Last%20author%27%2C%0A%27Middle%20author%27%29%29%29%2C%20%27Unknown%27%29%0Aas%20%3Frole%29%0A%7D%0A%7D%0Agroup%20by%20%3Fyear%20%3Frole%0Aorder%20by%20%3Fyear";
    expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  /* tslint:enable: max-line-length */
  });

  it('should encode the specified querry for the HTML format', () => {
      const endpoint: string = 'https://query.wikidata.org/';
      const urlType: URLTypeIdentifier = 'HTML';
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
      // tslint:disable-next-line
      const encodedURL: string= "https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%0AWITH%20%7B%0ASELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%7D%0AGROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0AINCLUDE%20%25counts%0A%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0AOPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0ABIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)";
      // tslint:disable-next-line
      expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  });

  it('should encode the second specified querry for the HTML format', () => {
    const endpoint: string = 'https://query.wikidata.org/';
    const urlType: URLTypeIdentifier = 'HTML';
    const visualisationType: VisualisationIdentifier = 'BarChart';
    /* tslint:disable: max-line-length */
    const sparqlQuery: string = `# Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
# Shubhanshu Mishra, Vetle Torvik
select ?year (count(?work) as ?number_of_publications) ?role where {
  {
    select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
      # default values = 0
      ?year_item wdt:P31 wd:Q577 .
      ?year_item wdt:P585 ?date .
      bind(year(?date) as ?year_)
      {
        select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
          ?work wdt:P50 wd:Q16733372 .
          ?work wdt:P577 ?publication_date .
          bind(year(?publication_date) as ?year_)
        }
      }
      bind(year(now())+1 as ?next_year)
      filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
    }
  }
  union {
  {
    select ?work (min(?years) as ?year) (count(?coauthors) as ?number_of_authors) ?author_number where {
      ?work (p:P50|p:P2093) ?author_statement .
      ?author_statement ps:P50 wd:Q16733372 .
      optional { ?author_statement pq:P1545 ?author_number . }
      ?work (wdt:P50|wdt:P2093) ?coauthors .
      ?work wdt:P577 ?dates .
      bind(str(year(?dates)) as ?years) .
    }
    group by ?work ?author_number
  }
  bind(coalesce(if(?number_of_authors = 1,
            'Solo author',
            if(xsd:integer(?author_number) = 1,
               'First author',
               if(xsd:integer(?author_number) = ?number_of_authors,
                  'Last author',
                  'Middle author'))), 'Unknown')
       as ?role)
   }
}
group by ?year ?role
order by ?year`;
    const encodedURL: string="https://query.wikidata.org/embed.html#%23defaultView%3ABarChart%0Aselect%20%3Fyear%20(count(%3Fwork)%20as%20%3Fnumber_of_publications)%20%3Frole%20where%20%7B%0A%7B%0Aselect%20(str(%3Fyear_)%20as%20%3Fyear)%20(0%20as%20%3Fpages)%20(%22_%22%20as%20%3Frole)%20where%20%7B%0A%23%20default%20values%20%3D%200%0A%3Fyear_item%20wdt%3AP31%20wd%3AQ577%20.%0A%3Fyear_item%20wdt%3AP585%20%3Fdate%20.%0Abind(year(%3Fdate)%20as%20%3Fyear_)%0A%7B%0Aselect%20(min(%3Fyear_)%20as%20%3Fearliest_year)%20%20(max(%3Fyear_)%20as%20%3Flatest_year)%20where%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP577%20%3Fpublication_date%20.%0Abind(year(%3Fpublication_date)%20as%20%3Fyear_)%0A%7D%0A%7D%0Abind(year(now())%2B1%20as%20%3Fnext_year)%0Afilter%20(%3Fyear_%20%3E%3D%20%3Fearliest_year%20%26%26%20%3Fyear_%20%3C%3D%20%3Flatest_year)%0A%7D%0A%7D%0Aunion%20%7B%0A%7B%0Aselect%20%3Fwork%20(min(%3Fyears)%20as%20%3Fyear)%20(count(%3Fcoauthors)%20as%20%3Fnumber_of_authors)%20%3Fauthor_number%20where%20%7B%0A%3Fwork%20(p%3AP50%7Cp%3AP2093)%20%3Fauthor_statement%20.%0A%3Fauthor_statement%20ps%3AP50%20wd%3AQ16733372%20.%0Aoptional%20%7B%20%3Fauthor_statement%20pq%3AP1545%20%3Fauthor_number%20.%20%7D%0A%3Fwork%20(wdt%3AP50%7Cwdt%3AP2093)%20%3Fcoauthors%20.%0A%3Fwork%20wdt%3AP577%20%3Fdates%20.%0Abind(str(year(%3Fdates))%20as%20%3Fyears)%20.%0A%7D%0Agroup%20by%20%3Fwork%20%3Fauthor_number%0A%7D%0Abind(coalesce(if(%3Fnumber_of_authors%20%3D%201%2C%0A'Solo%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%201%2C%0A'First%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%20%3Fnumber_of_authors%2C%0A'Last%20author'%2C%0A'Middle%20author')))%2C%20'Unknown')%0Aas%20%3Frole)%0A%7D%0A%7D%0Agroup%20by%20%3Fyear%20%3Frole%0Aorder%20by%20%3Fyear";
    expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
  /* tslint:enable: max-line-length */
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
        // tslint:disable-next-line
        const encodedURL: string= "https://query.wikidata.org/#%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%0AWITH%20%7B%0ASELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%7D%0AGROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0AINCLUDE%20%25counts%0A%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0AOPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0ABIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)";
        // tslint:disable-next-line
        expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
    });

    it('should encode the second specified querry for the Wikilink format', () => {
      const endpoint: string = 'https://query.wikidata.org/';
      const urlType: URLTypeIdentifier = 'Wikilink';
      const visualisationType: VisualisationIdentifier = 'BarChart';
      /* tslint:disable: max-line-length */
      const sparqlQuery: string = `# Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
# Shubhanshu Mishra, Vetle Torvik
select ?year (count(?work) as ?number_of_publications) ?role where {
  {
    select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
      # default values = 0
      ?year_item wdt:P31 wd:Q577 .
      ?year_item wdt:P585 ?date .
      bind(year(?date) as ?year_)
      {
        select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
          ?work wdt:P50 wd:Q16733372 .
          ?work wdt:P577 ?publication_date .
          bind(year(?publication_date) as ?year_)
        }
      }
      bind(year(now())+1 as ?next_year)
      filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
    }
  }
  union {
  {
    select ?work (min(?years) as ?year) (count(?coauthors) as ?number_of_authors) ?author_number where {
      ?work (p:P50|p:P2093) ?author_statement .
      ?author_statement ps:P50 wd:Q16733372 .
      optional { ?author_statement pq:P1545 ?author_number . }
      ?work (wdt:P50|wdt:P2093) ?coauthors .
      ?work wdt:P577 ?dates .
      bind(str(year(?dates)) as ?years) .
    }
    group by ?work ?author_number
  }
  bind(coalesce(if(?number_of_authors = 1,
            'Solo author',
            if(xsd:integer(?author_number) = 1,
               'First author',
               if(xsd:integer(?author_number) = ?number_of_authors,
                  'Last author',
                  'Middle author'))), 'Unknown')
       as ?role)
   }
}
group by ?year ?role
order by ?year`;
      const encodedURL: string="https://query.wikidata.org/#%23defaultView%3ABarChart%0Aselect%20%3Fyear%20(count(%3Fwork)%20as%20%3Fnumber_of_publications)%20%3Frole%20where%20%7B%0A%7B%0Aselect%20(str(%3Fyear_)%20as%20%3Fyear)%20(0%20as%20%3Fpages)%20(%22_%22%20as%20%3Frole)%20where%20%7B%0A%23%20default%20values%20%3D%200%0A%3Fyear_item%20wdt%3AP31%20wd%3AQ577%20.%0A%3Fyear_item%20wdt%3AP585%20%3Fdate%20.%0Abind(year(%3Fdate)%20as%20%3Fyear_)%0A%7B%0Aselect%20(min(%3Fyear_)%20as%20%3Fearliest_year)%20%20(max(%3Fyear_)%20as%20%3Flatest_year)%20where%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP577%20%3Fpublication_date%20.%0Abind(year(%3Fpublication_date)%20as%20%3Fyear_)%0A%7D%0A%7D%0Abind(year(now())%2B1%20as%20%3Fnext_year)%0Afilter%20(%3Fyear_%20%3E%3D%20%3Fearliest_year%20%26%26%20%3Fyear_%20%3C%3D%20%3Flatest_year)%0A%7D%0A%7D%0Aunion%20%7B%0A%7B%0Aselect%20%3Fwork%20(min(%3Fyears)%20as%20%3Fyear)%20(count(%3Fcoauthors)%20as%20%3Fnumber_of_authors)%20%3Fauthor_number%20where%20%7B%0A%3Fwork%20(p%3AP50%7Cp%3AP2093)%20%3Fauthor_statement%20.%0A%3Fauthor_statement%20ps%3AP50%20wd%3AQ16733372%20.%0Aoptional%20%7B%20%3Fauthor_statement%20pq%3AP1545%20%3Fauthor_number%20.%20%7D%0A%3Fwork%20(wdt%3AP50%7Cwdt%3AP2093)%20%3Fcoauthors%20.%0A%3Fwork%20wdt%3AP577%20%3Fdates%20.%0Abind(str(year(%3Fdates))%20as%20%3Fyears)%20.%0A%7D%0Agroup%20by%20%3Fwork%20%3Fauthor_number%0A%7D%0Abind(coalesce(if(%3Fnumber_of_authors%20%3D%201%2C%0A'Solo%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%201%2C%0A'First%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%20%3Fnumber_of_authors%2C%0A'Last%20author'%2C%0A'Middle%20author')))%2C%20'Unknown')%0Aas%20%3Frole)%0A%7D%0A%7D%0Agroup%20by%20%3Fyear%20%3Frole%0Aorder%20by%20%3Fyear";
      expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
    /* tslint:enable: max-line-length */
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
        // tslint:disable-next-line
        const encodedURL: string= "https://query.wikidata.org/sparql?query=%23defaultView%3ABubbleChart%0ASELECT%20%3Fcount%20%3Fvenue%20(SAMPLE(%3Fvenue_label_)%20AS%20%3Fvenue_label)%0AWITH%20%7B%0ASELECT%20(COUNT(%3Fwork)%20as%20%3Fcount)%20%3Fvenue%20WHERE%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP1433%20%3Fvenue%20.%0A%7D%0AGROUP%20BY%20%3Fvenue%0A%7D%20AS%20%25counts%0AWHERE%20%7B%0AINCLUDE%20%25counts%0A%3Fvenue%20rdfs%3Alabel%20%3Flong_venue_label%20FILTER(LANG(%3Flong_venue_label)%20%3D%20'en')%0AOPTIONAL%20%7B%20%3Fvenue%20wdt%3AP1813%20%3Fshort_name%20.%20%7D%0ABIND(COALESCE(%3Fshort_name%2C%20%3Flong_venue_label)%20AS%20%3Fvenue_label_)%0A%7D%0AGROUP%20BY%20%3Fvenue%20%3Fcount%0AORDER%20BY%20DESC(%3Fcount)";
        // tslint:disable-next-line
        expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
    });
    it('should encode the second specified querry for the SPARQL format', () => {
      const endpoint: string = 'https://query.wikidata.org/';
      const urlType: URLTypeIdentifier = 'SPARQL';
      const visualisationType: VisualisationIdentifier = 'BarChart';
      /* tslint:disable: max-line-length */
      const sparqlQuery: string = `# Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
# Shubhanshu Mishra, Vetle Torvik
select ?year (count(?work) as ?number_of_publications) ?role where {
  {
    select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
      # default values = 0
      ?year_item wdt:P31 wd:Q577 .
      ?year_item wdt:P585 ?date .
      bind(year(?date) as ?year_)
      {
        select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
          ?work wdt:P50 wd:Q16733372 .
          ?work wdt:P577 ?publication_date .
          bind(year(?publication_date) as ?year_)
        }
      }
      bind(year(now())+1 as ?next_year)
      filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
    }
  }
  union {
  {
    select ?work (min(?years) as ?year) (count(?coauthors) as ?number_of_authors) ?author_number where {
      ?work (p:P50|p:P2093) ?author_statement .
      ?author_statement ps:P50 wd:Q16733372 .
      optional { ?author_statement pq:P1545 ?author_number . }
      ?work (wdt:P50|wdt:P2093) ?coauthors .
      ?work wdt:P577 ?dates .
      bind(str(year(?dates)) as ?years) .
    }
    group by ?work ?author_number
  }
  bind(coalesce(if(?number_of_authors = 1,
            'Solo author',
            if(xsd:integer(?author_number) = 1,
               'First author',
               if(xsd:integer(?author_number) = ?number_of_authors,
                  'Last author',
                  'Middle author'))), 'Unknown')
       as ?role)
   }
}
group by ?year ?role
order by ?year`;
      const encodedURL: string="https://query.wikidata.org/sparql?query=%23defaultView%3ABarChart%0Aselect%20%3Fyear%20(count(%3Fwork)%20as%20%3Fnumber_of_publications)%20%3Frole%20where%20%7B%0A%7B%0Aselect%20(str(%3Fyear_)%20as%20%3Fyear)%20(0%20as%20%3Fpages)%20(%22_%22%20as%20%3Frole)%20where%20%7B%0A%23%20default%20values%20%3D%200%0A%3Fyear_item%20wdt%3AP31%20wd%3AQ577%20.%0A%3Fyear_item%20wdt%3AP585%20%3Fdate%20.%0Abind(year(%3Fdate)%20as%20%3Fyear_)%0A%7B%0Aselect%20(min(%3Fyear_)%20as%20%3Fearliest_year)%20%20(max(%3Fyear_)%20as%20%3Flatest_year)%20where%20%7B%0A%3Fwork%20wdt%3AP50%20wd%3AQ16733372%20.%0A%3Fwork%20wdt%3AP577%20%3Fpublication_date%20.%0Abind(year(%3Fpublication_date)%20as%20%3Fyear_)%0A%7D%0A%7D%0Abind(year(now())%2B1%20as%20%3Fnext_year)%0Afilter%20(%3Fyear_%20%3E%3D%20%3Fearliest_year%20%26%26%20%3Fyear_%20%3C%3D%20%3Flatest_year)%0A%7D%0A%7D%0Aunion%20%7B%0A%7B%0Aselect%20%3Fwork%20(min(%3Fyears)%20as%20%3Fyear)%20(count(%3Fcoauthors)%20as%20%3Fnumber_of_authors)%20%3Fauthor_number%20where%20%7B%0A%3Fwork%20(p%3AP50%7Cp%3AP2093)%20%3Fauthor_statement%20.%0A%3Fauthor_statement%20ps%3AP50%20wd%3AQ16733372%20.%0Aoptional%20%7B%20%3Fauthor_statement%20pq%3AP1545%20%3Fauthor_number%20.%20%7D%0A%3Fwork%20(wdt%3AP50%7Cwdt%3AP2093)%20%3Fcoauthors%20.%0A%3Fwork%20wdt%3AP577%20%3Fdates%20.%0Abind(str(year(%3Fdates))%20as%20%3Fyears)%20.%0A%7D%0Agroup%20by%20%3Fwork%20%3Fauthor_number%0A%7D%0Abind(coalesce(if(%3Fnumber_of_authors%20%3D%201%2C%0A'Solo%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%201%2C%0A'First%20author'%2C%0Aif(xsd%3Ainteger(%3Fauthor_number)%20%3D%20%3Fnumber_of_authors%2C%0A'Last%20author'%2C%0A'Middle%20author')))%2C%20'Unknown')%0Aas%20%3Frole)%0A%7D%0A%7D%0Agroup%20by%20%3Fyear%20%3Frole%0Aorder%20by%20%3Fyear";
      expect(graphicalVisualizerUrlConstructor(sparqlQuery, endpoint, visualisationType, urlType)).toEqual(encodedURL);
   /* tslint:enable: max-line-length */
    });
})

describe ('GraphicalVisualizer', () => {
  it('should remove # and whitespace from query string', () => {
    /* tslint:disable: max-line-length */
    const sparqlQuery: string = `#defaultView:BarChart
    # Inspired from LEGOLAS - http://abel.lis.illinois.edu/legolas/
    # Shubhanshu Mishra, Vetle Torvik
    select ?year (count(?work) as ?number_of_publications) ?role where {
      {
        select (str(?year_) as ?year) (0 as ?pages) ("_" as ?role) where {
          # default values = 0
          ?year_item wdt:P31 wd:Q577 .
          ?year_item wdt:P585 ?date .
          bind(year(?date) as ?year_)
          {
            select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
              ?work wdt:P50 wd:Q16733372 .
              ?work wdt:P577 ?publication_date .
              bind(year(?publication_date) as ?year_)
            }
          }
          bind(year(now())+1 as ?next_year)
          filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
        }
      }`
      
      const normaizedQuerry: string = `select ?year (count(?work) as ?number_of_publications) ?role where {
{
select (str(?year_) as ?year) (0 as ?pages) (\"_\" as ?role) where {
# default values = 0
?year_item wdt:P31 wd:Q577 .
?year_item wdt:P585 ?date .
bind(year(?date) as ?year_)
{
select (min(?year_) as ?earliest_year)  (max(?year_) as ?latest_year) where {
?work wdt:P50 wd:Q16733372 .
?work wdt:P577 ?publication_date .
bind(year(?publication_date) as ?year_)
}
}
bind(year(now())+1 as ?next_year)
filter (?year_ >= ?earliest_year && ?year_ <= ?latest_year)
}
}`
/* tslint:enable: max-line-length */
      expect(queryNormalizer(sparqlQuery)).toEqual(normaizedQuerry);
  });
})