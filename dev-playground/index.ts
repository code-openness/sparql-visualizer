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
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/Ac4J9344s2s');
    iframe.setAttribute('class', 'embed-responsive-item');

    data.replaceChild(iframe, data.children[0]);
});
