import './style.scss';

import { Serializer } from '../sparql-visualizer';

(async function init(): Promise<void> {
    await new Serializer().serialize();
})();
