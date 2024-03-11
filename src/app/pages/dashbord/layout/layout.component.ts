import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
export interface MenuItem {
  title?: string;
  icon?: string;
  link?: string;
  color?: string;

  hideFor?: string;

  expanded?: boolean;
  subMenu?: MenuItem[];
}

export type Menu = MenuItem[];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '##000'
    },
    {
      title: 'Counter Billing',
      icon: 'assignment',
      link: '/counterbill',
      color: '##000'
    },
    {
      title: 'Table Billing',
      icon: 'table_chart',
      link: '/tablebill',
      color: '##000'
    },
    {
      title: 'Contact',
      icon: 'person_add',
      link: '/contact',
      color: '##000'
    },
    {
      title: 'More',
      icon: 'bar_chart',
      color: '##000',
      subMenu: [
        {
          title: 'Add Menu',
          icon: 'restaurant_menu',
          link: '/menu',
          color: '##000'
        },
    
        {
          title: 'Add Table',
          icon: 'store_mall_directory',
          color: '##000',
          link: '/table'
        },
        {
          title: 'Add Category',
          icon: 'event_note',
          color: '##000',
          link: '/category'
        },
        {
          title: 'Add Attender',
          icon: 'person_pin',
          color: '##000',
          link: '/attender'
        },
      ]
    }
  ];

}
