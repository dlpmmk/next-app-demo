import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import apiHomeGetusers, { Message as M1, Result as R1, Data as D1 } from '../api/home/getusers';

interface IProps {
}

/**
 * 首页
 */
const Page: NextPage<IProps> = () => {
	useEffect(() => {
		void (async () => {
			const data = await apiHomeGetusers({});
		})();
	}, []);
	return (
		<>
			<Head>
				<title>首页</title>
			</Head>
			<h1>
				我是首页
			</h1>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
