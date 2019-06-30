import { createHTMLTable } from './Serializer';
import { requestQueryResults } from '../../sparql/Request';

type DataRow = import('../../sparql/index.types').DataRow;
type VisualizationParameters = import('../../serializer/index.types').VisualizationParameters;

export async function createTableElement({ endpoint, query }: VisualizationParameters): Promise<HTMLElement> {
    const table: DataRow[] = await requestQueryResults(endpoint.getSPARQLQueryURL(), query);
    return createHTMLTable(table);
}
