import an49, { Config } from '@mmstudio/an000049';
import mmconf from '@mmstudio/config';

const config = (mmconf as unknown as any) as {
	dbconfig: Config;
};

const db = an49(config.dbconfig);

export default function getDb() {
	return db;
}
