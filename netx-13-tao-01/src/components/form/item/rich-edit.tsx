import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import FormItem, { IFormItemProps } from '../item';

const Quill = dynamic(() => {
	return import('../../rich-edit/quill');
}, {
	ssr: false
});

/**
 * 富文本
 */
export default function FormItemRichEdit({
	required,
	label,
	labelSpan = 4,
	...props
}: {
	value?: string;
	onChange?(value: string): void;
} & Pick<IFormItemProps, 'required' | 'label' | 'labelSpan'>) {
	return <FormItem
		required={required}
		label={label}
		labelValign='start'
		labelSpan={labelSpan}
	>
		<Quill
			{...props}
		/>
	</FormItem>;
}
