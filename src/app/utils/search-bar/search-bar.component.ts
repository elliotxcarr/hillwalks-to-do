import { Component, inject} from '@angular/core';
import { WalkStore } from '../../store/walk/walks.store';


@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  readonly store = inject(WalkStore);
}
