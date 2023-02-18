import { InputNumber, InputNumberProps } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 数字输入框
 */
export default function FormItemInputNumber({
	label,
	labelAfter,
	required,
	labelValign,
	labelSpan,
	labelAfterSpan,
	...props
}: InputNumberProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><InputNumber
			style={{ width: '100%' }}
			{...props}
		/>
	</FormItem>;
}
