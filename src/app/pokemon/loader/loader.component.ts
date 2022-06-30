import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
  <div *ngIf="!error" class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  <h4 *ngIf="error" class="center" style="font-weight: bold; cursor: default;">
    Ce pokémon n'existe pas !
  </h4>
  `
})
export class LoaderComponent implements OnInit { 
  error: boolean = false;

  ngOnInit(): void {
    timer(2000).subscribe((): void => {
      this.error = true;
    })
  }
}
