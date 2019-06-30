export function queryNormalizer(query: string): string {
    return query
        .trim()
        .split('\n')
        .map((line: string): string => line.trim())
        .filter((line: string): boolean => line.charAt(0) !== '#')
        .join('\n');
}
