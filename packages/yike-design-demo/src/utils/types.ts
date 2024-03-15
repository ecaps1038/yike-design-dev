export interface NavBar {
  title: string;
  list: NavBarList[];
}

export interface NavBarList {
  name: string;
  src: string;
}
