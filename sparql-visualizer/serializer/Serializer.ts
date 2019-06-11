export class Serializer {
    public iframeWrapperClass: string;
    public iframeClass: string;
    public dataAttributeName: string; // TODO type identifier

    constructor(wrapperClass: string, classs: string, attributeName: string) {
        this.iframeClass = classs;
        this.iframeWrapperClass = wrapperClass;
        this.dataAttributeName = attributeName;
    }

    public init(): void {
        const dataList: NodeList = this.findAllDataElements();

        dataList.forEach((dataElement: Node) => {
            const visElement: HTMLElement = this.getVisualization(dataElement as HTMLElement);
            dataElement.appendChild(visElement);
        });
    }

    private findAllDataElements(): NodeList {
        return document.querySelectorAll('[data-' + this.dataAttributeName + ']');
    }

    private getVisualization(dataElement: HTMLElement): HTMLElement {
        const visType: string | null = dataElement.getAttribute('data-' + this.dataAttributeName);

        let visElement: HTMLElement;

        if (visType && visType === 'BubbleChart') {
            // TODO of type condition
            dataElement.setAttribute('class', this.iframeWrapperClass);

            visElement = getIFrame(); // TODO Call chart function to create element
            visElement.setAttribute('class', this.iframeClass);
        } else {
            visElement = getTable(); // TODO Call table function to create element
        }

        return visElement;
    }
}

function getTable(): HTMLElement {
    const table: HTMLElement = document.createElement('table');
    const thead: HTMLElement = document.createElement('thead');
    const tbody: HTMLElement = document.createElement('tbody');
    const headRow: HTMLElement = document.createElement('tr');
    ['Name', 'Height', 'Country'].forEach((el: string) => {
        const th: HTMLElement = document.createElement('th');
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    [['1', '2', '3'], ['1', '2', '3'], ['1', '2', '3']].forEach((el: string[]) => {
        const tr: HTMLElement = document.createElement('tr');
        for (const o in el) {
            const td: HTMLElement = document.createElement('td');
            td.appendChild(document.createTextNode(el[o]));
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function getIFrame(): HTMLElement {
    const iframe = document.createElement(`iframe`);
    iframe.setAttribute(
        'src',
        'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0A%23%20Bubble%20chart%20of%20most%20cited%20works%20of%20first%20author%20associated%0A%23%20with%20an%20organization%0ASELECT%0A%20%20%3Fcount%20%3Fwork%20%3FworkLabel%0AWITH%20%7B%0A%20%20%23%20Find%20researchers%20associated%20with%20the%20organization%20and%20count%0A%20%20%23%20the%20number%20of%20citations.%0A%20%20SELECT%0A%20%20%20%20(COUNT(DISTINCT%20%3Fciting_work)%20AS%20%3Fcount)%0A%20%20%20%20%3Fwork%0A%20%20WHERE%20%7B%0A%20%20%20%20%3Fresearcher%20wdt%3AP108%20%7C%20wdt%3AP463%20%7C%20(wdt%3AP1416%20%2F%20wdt%3AP361*)%20wd%3AQ1269766%20.%0A%20%20%20%20%3Fwork%20p%3AP50%20%3Fresearcher_statement%20.%0A%20%20%20%20%3Fresearcher_statement%20ps%3AP50%20%3Fresearcher%20.%0A%20%20%20%20%3Fresearcher_statement%20pq%3AP1545%20%221%22%20.%0A%20%20%20%20%3Fciting_work%20wdt%3AP2860%20%3Fwork%20.%0A%20%20%7D%0A%20%20GROUP%20BY%20%3Fwork%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20ORDER%20BY%20DESC(%3Fcount)%0A%20%20LIMIT%2020%0A%7D%20AS%20%25works%0AWHERE%20%7B%0A%20%20%23%20Label%20the%20works%0A%20%20INCLUDE%20%25works%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%2Cda%2Cde%2Ces%2Cfr%2Cjp%2Cnl%2Cno%2Cru%2Csv%2Czh%22%20.%0A%20%20%7D%0A%7D%0AORDER%20BY%20DESC(%3Fcount)'
    );
    return iframe;
}
