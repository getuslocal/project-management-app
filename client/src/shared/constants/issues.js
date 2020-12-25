export const IssueTypes = {
  TASK: 'Task',
  BUG: 'Bug',
  STORY: 'Story',
  EPIC: 'Epic',
};

export const IssuePriorities = {
  HIGHEST: 'Highest',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  LOWEST: 'Lowest',
};

export const IssueColors = {
  PURPLE: {
    name: 'Purple',
    font: 'rgb(23,43,77)',
    bg: '#ddd6ff',
    border: 'rgb(133, 109, 251)',
    light: '#c0b4ff',
  },
  YELLOW: {
    name: 'Yellow',
    font: '#a05e00',
    bg: 'rgb(251 234 210)',
    border: '#fdb44d',
    light: '#ffd79e',
  },
  BLUE: {
    name: 'Blue',
    font: '#005e94',
    bg: '#d6e6ff',
    border: '#598cff',
    light: '#a5c1ff',
  },
  RED: {
    name: 'Red',
    font: 'rgb(142, 17, 41)',
    bg: '#ffdde4',
    border: '#ff6b88',
    light: '#ffaebe',
  },
};

export const IssueStyles = {
  EPIC: 'Epic',
};

export const IssueHistoryTypes = {
  CREATE: 'Create',
  DELETE: 'Delete',
  UPDATE: 'Update',
  COMMENT: 'Comment',
};
