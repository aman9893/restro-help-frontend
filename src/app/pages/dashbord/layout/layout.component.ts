import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
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
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  opened = true;
  shopType: any | null;
  menu:any
  mobileview: boolean =false;

    
    constructor(private router: Router,private cdref: ChangeDetectorRef,public dataService: DataService, ) {
    this.mobileview =this.dataService.getIsMobileResolution();


    router.events.subscribe((val:any) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url)
        if(this.mobileview || val.url==='/addcounterbill'){
          this.opened =false;
          this.cdref.detectChanges();
        }

      }
    });
  }

  ngOnInit(): void {
    this.shopType= localStorage.getItem('shop_type')
    if(this.shopType === 'restaurant'){
      this.menu = [
        {
          title: 'Home',
          icon: 'home',
          link: '/home',
          color: '##000'
        },
        {
          title: 'Counter Billing',
          icon: 'receipt',
          link: '/counterbill',
          color: '##000'
        },
        {
          title: 'Add Counter Bill',
          icon: 'restaurant_menu',
          link: '/addcounterbill',
          color: '##000'
        },
        {
          title: 'Table Billing',
          icon: 'table_chart',
          link: '/tablebill',
          color: '##000'
        },
        {
          title: 'Khatabook',
          icon: 'assignment',
          link: '/Khatabook',
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
              title: 'Add Category',
              icon: 'event_note',
              color: '##000',
              link: '/category'
            },
            {
              title: 'Add Item',
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
              title: 'Add Tax',
              icon: 'store_mall_directory',
              color: '##000',
              link: '/tax'
            },
            {
              title: 'Add Attender',
              icon: 'person_pin',
              color: '##000',
              link: '/attender'
            },
            // {
            //   title: 'Add Printer',
            //   icon: 'picture_as_pdf',
            //   color: '##000',
            //   link: '/printer'
            // },
            {
              title: 'Help',
              icon: 'pan_tool',
              color: '##000',
              link: '/help'
            },
          ]
        }
    
      ];
    }
    else{
      this.menu = [
        {
          title: 'Home',
          icon: 'home',
          link: '/home',
          color: '##000'
        },
        {
          title: 'Bill List',
          icon: 'assignment',
          link: '/counterbill',
          color: '##000'
        },
        {
          title: 'Add Bill',
          icon: 'restaurant_menu',
          link: '/addcounterbill',
          color: '##000'
        },
         {
          title: 'Khatabook',
          icon: 'assignment',
          link: '/Khatabook',
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
              title: 'Add Category',
              icon: 'event_note',
              color: '##000',
              link: '/category'
            },
            {
              title: 'Add Item',
              icon: 'restaurant_menu',
              link: '/menu',
              color: '##000'
            },
        
            {
              title: 'Add Tax',
              icon: 'store_mall_directory',
              color: '##000',
              link: '/tax'
            },
            // {
            //   title: 'Add Printer',
            //   icon: 'picture_as_pdf',
            //   color: '##000',
            //   link: '/printer'
            // },
            
            {
              title: 'Help',
              icon: 'pan_tool',
              color: '##000',
              link: '/help'
            },
          ]
        }
    
      ];
    }
  }

 



  toggle(): void {
    this.opened = !this.opened;
    this.cdref.detectChanges();
  }


}
