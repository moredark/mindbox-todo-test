export const formatTaskCount = (count: number): string => {
  if (count === 0) {
    return 'All tasks completed';
  }
  
  return `${count} item${count !== 1 ? 's' : ''} left`;
};
