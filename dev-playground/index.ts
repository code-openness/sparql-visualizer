import { Serializer } from '../sparql-visualizer/serializer/Serializer';
import './style.scss';

init();

export function init(): void {
    const iframeWrapperClass: string = 'resp-container';
    const iframeClass: string = 'resp-iframe';
    const attributeName: string = 'visualisation';
    const serializer = new Serializer(iframeWrapperClass, iframeClass, attributeName);
    serializer.init();
}
