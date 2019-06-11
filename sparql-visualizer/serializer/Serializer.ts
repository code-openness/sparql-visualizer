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

        if (visType && visType === 'Image') {
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
    return document.createElement(`
        <table>
            <thead>
                <th>Hallo</th>
                <th>Welt</th>
            </th>
            <tbody>
                <tr>
                    <td>Hier</td>
                    <td>sind</td>
                </tr>
                <tr>
                    <td>einige</td>
                    <td>Daten</td>
                </tr>
            </tbody>
        </table>
    `);
}

function getIFrame(): HTMLElement {
    return document.createElement(`<iframe ></iframe>`);
}
