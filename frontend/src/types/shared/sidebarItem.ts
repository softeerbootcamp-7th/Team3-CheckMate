export interface SidebarItem {
  id: string;
  name: string;
  path: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subMenus?: SidebarItem[];
}
