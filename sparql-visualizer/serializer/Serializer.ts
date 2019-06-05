let datas = document.querySelectorAll("[data-visualisation]");
console.log(datas);


let query;
let type;
datas.forEach(function (data) {
    type = data.getAttribute("data-visualisation");
    query = data.children[0].innerHTML;
    console.log(type);
    console.log(query);

    if (type && type === "Image") {
        // TODO Call function to create query
        data.setAttribute("class", "embeded-responsive embeded-responsive-4by3");
        let iframe = document.createElement('iframe');
        iframe.setAttribute("data-source", "TEST");
        iframe.setAttribute("class", "embeded-responsive-item");
        data.replaceChild(iframe , data.children[0]);
    }
    else {
        // TODO Call function to create tabelle
        // TODO Tabelle
    }

});
