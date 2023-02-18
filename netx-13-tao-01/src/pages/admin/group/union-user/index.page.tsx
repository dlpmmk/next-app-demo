import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Body from './body';
import ctrls from '../../../api/ctrls';

interface IProps {
	groupid: string;
	groupname: string;
	keyword: string;
	page: string;
}
/**
 * 关联用户
 */
const Page: NextPage<IProps> = ({ groupid, groupname, keyword, page }) => {
	return (
		<>
			<Head>
				<title>关联用户</title>
			</Head>
			<Body groupid={groupid} groupname={groupname} initquery={{
				keyword,
				page
			}} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	const groupid = query.groupid as string;
	const group = await ctrls.sysGroup.getByID(groupid);
	console.log('ddddddddddddddddddddddddddddddddddddd', group);
	const groupname = group?.groupname;
	const keyword = query.keyword as string || '';
	const page = query.page as string || '';
	const data = await Promise.resolve({
		props: {
			groupid,
			groupname,
			keyword,
			page
		},
	});
	return data;
};
