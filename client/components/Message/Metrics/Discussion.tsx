import React, { FC } from 'react';
import { Message } from '@rocket.chat/fuselage';

import { useTranslation } from '../../../contexts/TranslationContext';
import { useTimeAgo } from '../../../hooks/useTimeAgo';
import { useBlockRendered } from '../hooks/useBlockRendered';

type DicussionOptions = {
	drid: string;
	rid: string;
	count: number;
	lm: Date;
	openDiscussion: () => void;
};

const DiscussionMetric: FC<DicussionOptions> = ({ lm, count, rid, drid, openDiscussion }) => {
	const t = useTranslation();
	const format = useTimeAgo();
	const { className, ref } = useBlockRendered();

	return <Message.Block>
		<div className={className} ref={ref as any} />
		<Message.Metrics>
			<Message.Metrics.Reply data-rid={rid} data-drid={drid} onClick={openDiscussion}>{count ? t('message_counter', { counter: count, count }) : t('Reply')}</Message.Metrics.Reply>
			<Message.Metrics.Item title={lm?.toLocaleString()}>
				<Message.Metrics.Item.Icon name='clock'/>
				<Message.Metrics.Item.Label>{lm ? format(lm) : t('No_messages_yet')}</Message.Metrics.Item.Label>
			</Message.Metrics.Item>
		</Message.Metrics>
	</Message.Block>;
};

export default DiscussionMetric;
