import { DataRow } from '../../sparql/index.types';

export function createHTMLTable(table: DataRow[]): HTMLElement {
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

function createElement(htmlString: string): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.innerHTML = htmlString.trim();
    return wrapper.firstChild as HTMLElement;
}
