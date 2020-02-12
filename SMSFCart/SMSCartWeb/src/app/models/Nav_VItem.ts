export interface Nav_VItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: Nav_VItem[];
}
