import { FindAndReplacePattern } from './index.types'
let FindAndReplacePattern: FindAndReplacePattern;
/*
export const findAndReplacePatterns: FindAndReplacePattern[] = [
    [key: '\(']: '%28',
    { key: /\)/gi:'%29' ,
    { key: /\'/gi, value: "%27"
];*/

export let findAndReplacePatternsArray: FindAndReplacePattern  []= [
    {"(": "%28"},
    {")": "%29"},
    {"\'": "%27"}
];