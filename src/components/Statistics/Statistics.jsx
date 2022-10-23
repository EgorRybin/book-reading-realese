import {
	StatInput,
	StatSubContainer,
	StatLabel,
	StatCommonContainer,
	StatisticsButton,
	StatPagesContainer,
} from 'ui/StatisticsPage';
import { useDispatch } from 'react-redux';
import { addFinishedPages } from '../../redux/library/libraryOperation';

import StatisticsTablet from './StatisticsTablet';
import { useState } from 'react';
const Statistics = () => {
	const dispatch = useDispatch();
	const [pages, setPages] = useState('');

	const handleChangePage = evt => {
		setPages(Number(evt.target.value));
	};

	const handleAddResults = pages => {
		dispatch(addFinishedPages(pages));
		setPages('');
	};

	return (
		<StatPagesContainer>
			<StatCommonContainer>
				<StatSubContainer>
					<StatLabel htmlFor="data">Дата</StatLabel>
					<StatInput id="data" type="text" />
				</StatSubContainer>
				<StatSubContainer>
					<StatLabel htmlFor="pages">Кількість сторінок </StatLabel>
					<StatInput id="pages" type="text" value={pages} onChange={handleChangePage} />
				</StatSubContainer>
			</StatCommonContainer>
			<StatisticsButton type="button" onClick={()=>handleAddResults({pages})}>
				Додати результат
			</StatisticsButton>
			<StatisticsTablet />
		</StatPagesContainer>
	);
};

export default Statistics;
