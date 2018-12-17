export enum IssueType {
  Bug = 'BUG',
  Feat = 'FEAT',
  Story = 'STORY',
  Epic = 'EPIC',
}

export const ISSUE_TYPE_OPTIONS = [
  { value: IssueType.Bug, name: 'Bug', color: '#3F51B5' },
  { value: IssueType.Feat, name: 'Feature', color: '#00BCD4' },
  { value: IssueType.Story, name: 'Story', color: '#9C27B0' },
  { value: IssueType.Epic, name: 'Epic', color: '#FF9800' },
];
