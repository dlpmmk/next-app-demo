import smartfetch from '@mmstudio/an000058';
import api from '../../../atoms/api';
import { Message, Result } from './getusers.api';

export type { Data, Message, Result } from './getusers.api';

export default async function apiHomeGetusers(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/home/getusers'], 'get', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
