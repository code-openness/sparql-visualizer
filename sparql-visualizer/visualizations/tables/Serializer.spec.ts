import sinon, { SinonStub } from 'sinon';
import { DataRow } from '../../sparql/index.types';
import { createElement, createHTMLTable } from './Serializer';

const DATA_ROWS: DataRow[] = [
    {
        label: 'Apfel',
        id: 'Q1',
        description: 'Faellt vom Baum'
    },
    {
        label: 'Bier',
        id: 'Q2',
        description: 'Wird gebraut'
    },
    {
        label: 'Clementine',
        id: 'Q3',
        description: 'Spritzt beim schaelen'
    }
];

describe('Table Serializer', () => {
    let tableElement: HTMLElement;

    beforeEach(() => {
        tableElement = createHTMLTable(DATA_ROWS);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should throw an error if it can not construct an html element', () => {
        expect(() => createElement('<<%"§§"!"§')).toThrow();
    });

    it('schould create a table element', () => {
        expect(tableElement.matches('table')).toBeTruthy();
    });

    it('should have a table head in the table', () => {
        expect(tableElement.querySelectorAll('table > thead').length).toEqual(1);
    });

    it('should contain only one row in the table head', () => {
        expect(tableElement.querySelectorAll('table > thead > tr').length).toEqual(1);
    });

    it('should contain all provided keys in the correct order of the head', () => {
        const thElements: string[] = [];

        tableElement.querySelectorAll('table > thead > tr > th').forEach(
            (th: Element): void => {
                thElements.push(th.innerHTML);
            }
        );

        expect(thElements).toEqual(Object.keys(DATA_ROWS[0]));
    });

    it('should have a table body in the table', () => {
        expect(tableElement.querySelectorAll('table > tbody').length).toEqual(1);
    });

    it('should contain one or more rows in the table body', () => {
        expect(tableElement.querySelectorAll('table > tbody > tr').length).toEqual(
            DATA_ROWS.length
        );
    });

    it('should contain all provided values of each row in the body', () => {
        const tdElements: string[] = [];

        tableElement
            .querySelectorAll('table > tbody > tr')[0]
            .querySelectorAll('td')
            .forEach(
                (td: Element): void => {
                    tdElements.push(td.innerHTML);
                }
            );

        expect(tdElements).toEqual(Object.values(DATA_ROWS[0]));
    });

    it('should return an empty table element if there is no data', () => {
        tableElement = createHTMLTable([]);

        expect(tableElement.childElementCount).toEqual(0);
    });

    it('should return a warning Message if there is no data', () => {
        const consoleWarnStub: SinonStub = sinon.stub(console, 'warn');

        createHTMLTable([]);

        expect(consoleWarnStub.callCount).toEqual(1);
    });
});
