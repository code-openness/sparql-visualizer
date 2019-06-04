// Dummy Serializer

let datas = document.querySelectorAll('[data-visualisation]');
console.log(datas);

let query;
let type;
datas.forEach(function(data) {
    type = data.getAttribute('data-visualisation');
    query = data.children[0].innerHTML;
    console.log(type);
    console.log(query);

    // TODO Call functions to create query
    data.setAttribute('class', 'embed-responsive embed-responsive-4by3');
    const iframe = document.createElement('iframe');
    iframe.setAttribute(
        'src',
        'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0A%23%20Bubble%20chart%20of%20most%20cited%20works%20of%20first%20author%20associated%0A%23%20with%20an%20organization%0ASELECT%0A%20%20%3Fcount%20%3Fwork%20%3FworkLabel%0AWITH%20%7B%0A%20%20%23%20Find%20researchers%20associated%20with%20the%20organization%20and%20count%0A%20%20%23%20the%20number%20of%20citations.%0A%20%20SELECT%0A%20%20%20%20%28COUNT%28DISTINCT%20%3Fciting_work%29%20AS%20%3Fcount%29%0A%20%20%20%20%3Fwork%0A%20%20WHERE%20%7B%0A%20%20%20%20%3Fresearcher%20wdt%3AP108%20%7C%20wdt%3AP463%20%7C%20%28wdt%3AP1416%20%2F%20wdt%3AP361%2a%29%20wd%3AQ1269766%20.%0A%20%20%20%20%3Fwork%20p%3AP50%20%3Fresearcher_statement%20.%0A%20%20%20%20%3Fresearcher_statement%20ps%3AP50%20%3Fresearcher%20.%0A%20%20%20%20%3Fresearcher_statement%20pq%3AP1545%20%221%22%20.%0A%20%20%20%20%3Fciting_work%20wdt%3AP2860%20%3Fwork%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fwork%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20ORDER%20BY%20DESC%28%3Fcount%29%0A%20%20LIMIT%2020%0A%7D%20AS%20%25works%0AWHERE%20%7B%0A%20%20%23%20Label%20the%20works%0A%20%20INCLUDE%20%25works%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%2Cda%2Cde%2Ces%2Cfr%2Cjp%2Cnl%2Cno%2Cru%2Csv%2Czh%22%20.%0A%20%20%7D%0A%7D%0AORDER%20BY%20DESC%28%3Fcount%29'
    );
    iframe.setAttribute('class', 'embed-responsive-item');

    data.replaceChild(iframe, data.children[0]);
});
