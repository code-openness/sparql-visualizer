import './style.scss';
import { DATA_ATTRIBUTE_NAME, ENDPOINT_LIST, ENDPOINT_NAME_LIST, VISUALIZATION_TYPES_LIST } from './variables';
import { Serializer, WikidataEndpointConfig } from '../sparql-visualizer';
import { DEFAULT_WIKIDATA_CONFIG } from '../sparql-visualizer/wikidata-endpoint/Endpoint';

export let dataElements: NodeList | null;
export let currentEndpoint: WikidataEndpointConfig = DEFAULT_WIKIDATA_CONFIG;

init();

export function init(): void {
    dataElements = document.querySelectorAll('[' + DATA_ATTRIBUTE_NAME + ']');

    const visIdSelection: HTMLSelectElement | null = addDropdownSelection('select-chart', VISUALIZATION_TYPES_LIST);
    const endpointSelection: HTMLSelectElement | null = addDropdownSelection('select-endpoint', ENDPOINT_NAME_LIST);
    const refreshButton: HTMLButtonElement | null = document.getElementById('refresh-button') as HTMLButtonElement;

    if (visIdSelection) {
        visIdSelection.addEventListener('change', (event: Event) => {
            if (event.target instanceof HTMLSelectElement && dataElements) {
                dataElements.forEach((element: Node) => {
                    (element as HTMLElement).setAttribute(DATA_ATTRIBUTE_NAME, visIdSelection.value);
                });
            }
        });
    }
    if (endpointSelection) {
        endpointSelection.addEventListener('change', (event: Event) => {
            if (event.target instanceof HTMLSelectElement) {
                currentEndpoint = ENDPOINT_LIST[endpointSelection.selectedIndex - 1];
            }
        });
    }
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            refreshVisualisation();
        });
    }

    serializerInit();
}

export function addDropdownSelection(id: string, options: string[]): HTMLSelectElement {
    const selectedElement: HTMLSelectElement | null = document.getElementById(id) as HTMLSelectElement;
    if (selectedElement) {
        options.forEach((option: string) => {
            const tmpOption: HTMLOptionElement = document.createElement('option');
            tmpOption.value = option.toString();
            tmpOption.text = option.toString();
            selectedElement.add(tmpOption);
        });
    }
    return selectedElement;
}

async function refreshVisualisation(): Promise<void> {
    if (dataElements) {
        dataElements.forEach((element: Node) => {
            if (element.childNodes.length > 1) {
                element.removeChild(element.lastChild as Node);
            }
        });
        await serializerInit();
    }
}

async function serializerInit(): Promise<void> {
    await new Serializer().withEndpoint(currentEndpoint).serialize();
}
