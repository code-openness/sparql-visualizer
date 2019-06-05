 export function queryNormalizer (query: string): string {
    const str: string = query.trim();
    const removeDefaultViewComment: string  =
    str.replace(/\A*(\s+)*(#defaultView).*\n?/m, '');
    const lineArray: string[] = removeDefaultViewComment.split(/\r?\n/);
    const trimedArray: string[] = lineArray.map((queryLine: string) => queryLine.trim());
    const newtext: string = trimedArray.join('\n');
    return newtext;
 } 