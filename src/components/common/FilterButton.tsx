import React from 'react';
import { Button } from 'grommet';
import { accentColor } from '../../theme/theme';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  isActive, 
  onClick, 
  testId 
}) => (
  <Button
    label={label}
    onClick={onClick}
    active={isActive}
    plain
    size="small"
    color={isActive ? 'accent-1' : 'text-weak'}
    data-testid={testId}
    style={{
      background: "none",
      borderBottom: isActive ? `2px solid ${accentColor}` : 'none',
      fontWeight: isActive ? 'bold' : 'normal'
    }}
  />
);
