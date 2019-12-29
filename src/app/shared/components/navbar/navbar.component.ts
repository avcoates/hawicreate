import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRoute } from '@admin/shared/models';

@Component({
  selector: 'hc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public routes!: Array<NavbarRoute>;

  @Input()
  public name!: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public onNavigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}
