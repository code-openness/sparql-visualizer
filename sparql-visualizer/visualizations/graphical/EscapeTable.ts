type FindAndReplacePattern = import("./index.types").FindAndReplacePattern;

export const findAndReplacePatterns: FindAndReplacePattern[] = [
    { key: /\(/gi, value: "%28" },
    { key: /\)/gi, value: "%29" },
    { key: /\'/gi, value: "%27" }
];