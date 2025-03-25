import React, { useCallback } from 'react';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
import { FilterButton } from '../common/FilterButton';
import { formatTaskCount } from '../../utils/formatters';
import { TodoFilterProps } from './types';
import { FilterType } from '../../types';

export const TodoFilter: React.FC<TodoFilterProps> = ({
    activeFilter,
    activeCount,
    onFilterChange,
    onClearCompleted,
    hasCompleted
}) => {
    const size = React.useContext(ResponsiveContext);
    const isMobile = size === 'small';

    const handleFilterChange = useCallback((filter: FilterType) => {
        onFilterChange(filter);
    }, [onFilterChange]);

    const filterButtons = [
        { label: 'All', value: 'all' as FilterType },
        { label: 'Active', value: 'active' as FilterType },
        { label: 'Completed', value: 'completed' as FilterType }
    ];

    return (
        <Box
            direction={isMobile ? 'column' : 'row'}
            align={isMobile ? 'stretch' : 'center'}
            justify="between"
            pad="small"
            background="background-contrast"
            round="small"
            margin={{ vertical: 'small' }}
            data-testid="todo-filter"
            border={{ color: 'dark-3', size: '1px' }}
            gap="small"
        >
            <Text 
                size="small" 
                data-testid="todo-count" 
                color="text"
                textAlign={isMobile ? 'center' : 'start'}
            >
                {formatTaskCount(activeCount)}
            </Text>

            <Box 
                direction="row" 
                gap="small" 
                justify={isMobile ? 'center' : 'start'}
                wrap={true}
            >
                {filterButtons.map(({ label, value }) => (
                    <FilterButton
                        key={value}
                        label={label}
                        isActive={activeFilter === value}
                        onClick={() => handleFilterChange(value)}
                        testId={`filter-${value}`}
                    />
                ))}
            </Box>

            <Button
                label="Clear completed"
                onClick={onClearCompleted}
                disabled={!hasCompleted}
                size="small"
                color="accent-2"
                data-testid="clear-completed"
                fill={isMobile ? 'horizontal' : false}
            />
        </Box>
    );
};
