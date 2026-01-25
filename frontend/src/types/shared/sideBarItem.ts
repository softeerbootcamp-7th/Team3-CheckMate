export interface SideBarItem {
  id: string;
  name: string;
  path: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subMenus?: SideBarItem[];
}
