// TODO import methods, identifier

import { WikidataEndpoint } from '../wikidata-endpoint';

type VisualisationParameters = import('./index.types').VisualisationParameters;

class Serializer {
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
        const that = this;
        let visElement: HTMLElement;
        dataList.forEach(function(dataElement) {
            visElement = that.getVisualization(dataElement as HTMLElement);
            dataElement.appendChild(visElement);
        });
    }

    public changeVisualization(dataElement: HTMLElement): void {
        const visElement = this.getVisualization(dataElement);
        dataElement.replaceChild(visElement, dataElement.children[1]);
    }

    private findAllDataElements(): NodeList {
        const dataList: NodeList = document.querySelectorAll('[data-' + this.dataAttributeName + ']');
        return dataList;
    }

    private getVisualization(dataElement: HTMLElement): HTMLElement {
        const visType = dataElement.getAttribute('data-' + this.dataAttributeName);
        const endpoint: WikidataEndpoint = dataElement.getAttribute('data-endpoint');
        const query = dataElement.children[0].innerHTML;

        let visElement: HTMLElement;
        if (visType && visType === 'Image') {
            // TODO of type condition
            dataElement.setAttribute('class', this.iframeWrapperClass);

            const visIdentifier = dataElement.getAttribute('data-identifier'); // TODO cast VisualisationIdentifier
            visElement = new HTMLElement(); // TODO Call chart function to create element
            visElement.setAttribute('class', this.iframeClass);
        } else {
            visElement = new HTMLElement(); // TODO Call table function to create element
        }
        return visElement;
    }
}
