import { Input } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 密码框
 */
export default function FormItemPassword({
	value,
	placeholder,
	disabled,
	onChange,
	onPressEnter,
	style,
	...itemProps
}: {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	style?: CSSProperties;
	onChange?(value: string): void;
	onPressEnter?(): void;
} & IFormItemProps) {
	return <FormItem {...itemProps}><Input.Password
		allowClear
		disabled={disabled}
		placeholder={placeholder}
		style={{
			width: '100%',
			...style
		}}
		value={value}
		maxLength={20}
		onChange={onChange}
		onPressEnter={onPressEnter}
	/>
	</FormItem>;
}
