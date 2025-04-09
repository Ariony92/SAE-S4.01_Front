import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableService } from '../../services/tables.service';

@Component({
  selector: 'app-import-donnees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-donnees.component.html',
  styleUrls: ['./import-donnees.component.sass']
})
export class ImportDonneesComponent {
  script: string = '';
  message: string = '';

  constructor(private readonly tableService: TableService) {}

  envoyer(): void {
    const contenu = this.script.trim();

    if (!contenu) {
      this.message = 'Le script ne peut pas être vide.';
      setTimeout(() => { this.message = ''; }, 2000);
      return;
    }

    if (contenu.toLocaleLowerCase().startsWith('--')) {
      this.message = 'Enlevez vos commentaires du script et laissez les insertions uniquements';
      setTimeout(() => { this.message = ''; }, 2000);
      return;
    }

    if (!contenu.toLowerCase().startsWith('insert')) {
      this.message = 'Seuls les INSERT sont autorisés.';
      setTimeout(() => { this.message = ''; }, 2000);
      return;
    }

    this.tableService.initialiserDepuisScript(contenu).subscribe({
      next: (resultat) => {
        this.message = resultat.message;
        this.script = '';
        setTimeout(() => { this.message = ''; }, 2000);
      },

      error: (erreur) => {
        this.message = (erreur.error?.erreur || 'Erreur lors de l’importation.');
        setTimeout(() => { this.message = ''; }, 2000);
      }
    });
    
  }
}
