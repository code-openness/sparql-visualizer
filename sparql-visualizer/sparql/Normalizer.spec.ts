import { queryNormalizer } from './Normalizer';

const SPARQL_QUERY: string = `
#defaultView:BarChart
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
  }
`;

const NORMALIZED_SPARQL_QUERY: string = `select ?year (count(?work) as ?number_of_publications) ?role where {
{
select (str(?year_) as ?year) (0 as ?pages) (\"_\" as ?role) where {
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
}`;

describe('QueryNormalizer', () => {
    it('should remove # and whitespace from query string', () => {
        expect(queryNormalizer(SPARQL_QUERY)).toEqual(NORMALIZED_SPARQL_QUERY);
    });
});
