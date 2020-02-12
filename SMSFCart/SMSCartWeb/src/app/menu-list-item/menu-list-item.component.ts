import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NavItem } from '../services/smsfashionapi.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SmsfashionapiService } from '../services/smsfashionapi.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {


  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(private dataservice: SmsfashionapiService,public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }



  }

  ngOnInit() {
    this.dataservice.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.dataservice.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
