import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent {
  @Input() totalElements: number = 0;
  @Input() elementsParPage: number = 10;
  @Input() pageActuelle: number = 1;

  @Output() changementPage = new EventEmitter<number>();

  obtenirPages(): number[] {
    let pages: number[] = [];
    let nombrePages = this.totalElements / this.elementsParPage;
    if (this.totalElements % this.elementsParPage !== 0) {
      nombrePages = (this.totalElements - (this.totalElements % this.elementsParPage)) / this.elementsParPage + 1;
    }


    for (let i = 1; i <= nombrePages; i++) {
      pages.push(i);
    }

    return pages;
  }

  pageSuivante(page: number): void {
    if (page >= 1 && page <= this.obtenirPages().length) {
      this.changementPage.emit(page);
    }
  }
}

