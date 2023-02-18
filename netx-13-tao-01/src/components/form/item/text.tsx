import { ReactNode } from 'react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 文本框
 */
export default function FormItemText({
	value,
	...itemProps
}: {
	value: ReactNode;
} & IFormItemProps) {
	return <FormItem labelValign='start' {...itemProps}><p className='text'>{value}</p>
		<style jsx>{`
.text{
font-family: 'Microsoft YaHei UI';
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #3E4D5C;
text-align: left;
width: 100%;
margin: 0;
}
`}</style>
	</FormItem>;
}
