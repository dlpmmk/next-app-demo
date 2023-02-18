import { Popconfirm, PopconfirmProps } from '@arco-design/web-react';
import { ReactNode, RefAttributes } from 'react';

export default function Confirm(props: PopconfirmProps & {
	children?: ReactNode;
} & RefAttributes<unknown>) {
	return <Popconfirm
		focusLock
		okText='确认'
		cancelText='取消'
		{...props}
	/>;
}
