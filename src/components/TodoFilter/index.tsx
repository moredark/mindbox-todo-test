import React from 'react';
import { Box, Button, Text } from 'grommet';
import { FilterButton } from '../common/FilterButton';
import { formatTaskCount } from '../../utils/formatters';
import { TodoFilterProps } from './types';

export const TodoFilter: React.FC<TodoFilterProps> = ({
    activeFilter,
    activeCount,
    onFilterChange,
    onClearCompleted,
    hasCompleted
}) => {
    return (
        <Box
            direction="row"
            align="center"
            justify="between"
            pad="small"
            background="background-contrast"
            round="small"
            margin={{ vertical: 'small' }}
            data-testid="todo-filter"
            border={{ color: 'dark-3', size: '1px' }}
        >
            <Text size="small" data-testid="todo-count" color="text">
                {formatTaskCount(activeCount)}
            </Text>

            <Box direction="row" gap="small">
                <FilterButton
                    label="All"
                    isActive={activeFilter === 'all'}
                    onClick={() => onFilterChange('all')}
                    testId="filter-all"
                />
                <FilterButton
                    label="Active"
                    isActive={activeFilter === 'active'}
                    onClick={() => onFilterChange('active')}
                    testId="filter-active"
                />
                <FilterButton
                    label="Completed"
                    isActive={activeFilter === 'completed'}
                    onClick={() => onFilterChange('completed')}
                    testId="filter-completed"
                />
            </Box>

            <Button
                label="Clear completed"
                onClick={onClearCompleted}
                disabled={!hasCompleted}
                size="small"
                color="accent-2"
                data-testid="clear-completed"
            />
        </Box>
    );
};
