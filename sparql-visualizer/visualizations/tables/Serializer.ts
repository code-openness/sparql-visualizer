import { DataRow } from '../../sparql/index.types';

export function createHTMLTable(table: DataRow[]): HTMLElement {
    if (table.length === 0) {
        // tslint:disable-next-line: no-console
        console.warn('No values available');
        return createElement('<table>No data available</table>');
    }

    return createElement(`
        <table>
            <thead>${createTableHeadContent(table)}</thead>
            <tbody>${createTableBodyContent(table)}</tbody>
        </table>
    `);
}

export function createTableHeadContent(table: DataRow[]): string {
    const tableHeadValues: string = Object.keys(table[0])
        .map((headValue: string): string => `<th>${headValue}</th>`)
        .join();

    return `<tr>${tableHeadValues}</tr>`;
}

export function createTableBodyContent(table: DataRow[]): string {
    return table.map(tableRowToDataRow).join();
}

export function tableRowToDataRow(row: DataRow): string {
    const tableRowValues: string = Object.keys(row)
        .map((key: string): string => row[key])
        .map((value: string): string => `<td>${value}</td>`)
        .join();

    return `<tr>${tableRowValues}</tr>`;
}

export function createElement(htmlString: string): HTMLElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.innerHTML = htmlString.trim();

    if (!wrapper.firstElementChild) {
        throw new Error('Could not create the HTML Element');
    }

    return wrapper.firstElementChild as HTMLElement;
}
