import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import ctrls from '../../api/ctrls';
import { SysUserParam10, SysUserParam2, SysUserParam3 } from '../../api/controllers/sys/user';

interface IProps {
}

/**
 * 页面跳转页面
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>页面跳转...</title>
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// 页面跳转页面初始化
// eslint-disable-next-line require-await
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	// 从Cookie中取到数据
	return ctrls.sysUser.redirectAfterLogin(context.req as SysUserParam3, context.res as SysUserParam2, context.query as SysUserParam10);
};
