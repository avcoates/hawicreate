import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ImagesState } from 'src/app/state/images.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'hawicreate-app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Select(ImagesState.allImages)
  public allImages$!: Observable<Array<string>>;

  constructor() { }

  ngOnInit() {
  }

}
