import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ImagesState } from 'src/app/state/images.state';
import { Observable, BehaviorSubject } from 'rxjs';
import { GetFeaturedPhotos } from 'src/app/actions/images.actions';
import { timer, combineLatest } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'hawicreate-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('changeImage', [
      // ...
      state('visible', style({
        opacity: 1.0
      })),
      state('hidden', style({
        opacity: 0.1
      })),
      transition('visible => hidden', [
        animate('0.5s')
      ]),
      transition('hidden => visible', [
        animate('0.5s')
      ]),
    ])
  ],
})
export class HomeComponent implements OnInit, OnDestroy {

  public get isHidden$(): Observable<boolean> {
    return this._isHidden.asObservable();
  }
  // tslint:disable-next-line: variable-name
  public _isHidden = new BehaviorSubject<boolean>(false);

  @Select(ImagesState.featuredImages)
  public featuredImages$!: Observable<Array<string>>;

  public state$: Observable<{ featuredImages: string[], imageIndex: number}>;
  private imageSwitchTimer$ = timer(100, 5000);

  // tslint:disable-next-line: variable-name
  private _imageIndex = new BehaviorSubject<number>(0);
  private get imageIndex$(): Observable<number> {
    return this._imageIndex.asObservable();
  }
  constructor(private store: Store) {
    const waitTime = 1000;
    this.store.dispatch(new GetFeaturedPhotos());
    this.state$ = combineLatest([this.featuredImages$, this.imageIndex$])
      .pipe(
        tap((this.fadeImageOutThenIn.bind(this))),
        debounceTime(waitTime),
        map(([featuredImages, imageIndex]) => ({ featuredImages, imageIndex })),
        );
  }

  public ngOnInit(): void {
    combineLatest([this.featuredImages$, this.imageSwitchTimer$])
      .pipe(map(([featuredImages, imageIndex]) => ({ numberOfImages: featuredImages.length, imageIndex })))
      .subscribe(({numberOfImages, imageIndex}) => {
        const currentImageIndex = this._imageIndex.getValue();
        if (currentImageIndex === numberOfImages - 1) {
          this._imageIndex.next(0);
        } else {
          this._imageIndex.next(currentImageIndex + 1);
        }
      });
  }

  public ngOnDestroy(): void {
  }

  public onChangeImage(): void {
    // this.isHidden = !this.isHidden;
  }

  private fadeImageOutThenIn(): void {
    this._isHidden.next(false);
    console.log(this._isHidden.getValue());
    const timerRef = timer(1000, 1000).subscribe(() => { 
      this._isHidden.next(true);
      console.log(this._isHidden.getValue());
      timerRef.unsubscribe();
    });
  }

}
