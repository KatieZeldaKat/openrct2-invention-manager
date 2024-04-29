// @ts-ignore
import * as info from "./info.js";
import { startup } from "./startup";

registerPlugin({
    name: info.name,
    version: info.version,
    authors: info.authors,
    type: info.type,
    licence: info.license,
    targetApiVersion: info.targetApiVersion,
    main: startup,
});
