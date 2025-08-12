import { Component } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { BibleSummary } from '../models/bible.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bibles',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bibles.component.html',
})
export class BiblesComponent {
  constructor(private bibleService: BibleApiService) {
  }

  public get bibleSummaries(): ReadonlyArray<BibleSummary> {
    return this.bibleService.getBibles();
  }
}
