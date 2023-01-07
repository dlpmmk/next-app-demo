import rootDir from 'app-root-path'
import 'anylogger-log4js';
import { configure } from 'log4js';

configure(rootDir + '/log4js.json');


