// Node modules.
import debug from "debug";
// Local modules.
import { name } from "../../package.json";

const logger = loggerName => debug(`${name}:${loggerName}`);

export { logger };
