import { readFile, utils } from 'xlsx';

export default {
	excel2json<T>(filepath: string) {
		const wb = readFile(filepath);
		const names = wb.SheetNames;
		const ws = wb.Sheets[names[0]];
		return utils.sheet_to_json<T>(ws);
	}
};
