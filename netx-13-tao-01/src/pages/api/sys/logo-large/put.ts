import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from '../base/put';

export type { Message, Result } from '../base/put';

export default async function apiSysLogoLargePut(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/sys/logo-large/put'], 'put', msg);
	if (ret.ok === true) {
		return;
	}
	throw new Error(ret.message);
}
