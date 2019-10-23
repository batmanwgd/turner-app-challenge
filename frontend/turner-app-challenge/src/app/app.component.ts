import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitlesService } from './titles.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titles$: Observable<any[]>;
  awards$: Observable<any[]>;
  storylines$: Observable<any[]>;
  participants$: Observable<any[]>;
  titleNames: string[];
  isOpen = false;

  selected: string;

  constructor(private api: TitlesService) {
    this.selected = '';
  }

  ngOnInit() {
    this.updateData();
    this.api.getTitleNames().then((names) => {
      this.titleNames = names;
    });
  }

  updateData() {
    this.api.getTitlesAggregatted(this.selected);
    this.titles$ = this.api.titlesObs;
    this.awards$ = this.api.awardsObs;
    this.storylines$ = this.api.storylinesObs;
    this.participants$ = this.api.participantsObs;
  }

  getSearchTerm() {
    if (!this.selected) {
      this.updateData();
      this.isOpen = false;
      this.selected = '';
    } else {
      this.api.getTitlesAggregatted(this.selected);
      this.titles$ = this.api.titlesObs;
      this.awards$ = this.api.awardsObs;
      this.storylines$ = this.api.storylinesObs;
      this.participants$ = this.api.participantsObs;
      this.isOpen = true;
      this.selected = '';
    }
  }
}
