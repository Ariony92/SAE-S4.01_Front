import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../services/tables.service';
import { ChangeService } from '../../services/changes.service';
import { TableAttribut } from '../../modeleTS/tabledetail';

@Component({
  selector: 'app-insert-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert-page.component.html',
  styleUrl: './insert-page.component.sass'
})
export class InsertPageComponent implements OnInit {

  nomTable: string = '';
  attributs: TableAttribut[] = [];
  form: FormGroup = new FormGroup({});
  message: string = '';
  valeursSelect: { [cle: string]: { id: string, label: string }[] } = {};
  clePrimaire: string = '';


  constructor(
    private readonly route: ActivatedRoute,
    private readonly tableService: TableService,
    private readonly changeService: ChangeService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('nomTable');
    if (param === null) {
      this.message = 'Nom de table non fourni';
      return;
    }
  
    this.nomTable = param;
  
    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (res) => {
        this.clePrimaire = res.primaryKey;
      },
      error: () => this.message = "Problème au niveau de la récupération de la clé primaire"
    });
  
    this.tableService.colonnesTable(this.nomTable).subscribe({
      next: (colonnes) => {
        this.attributs = colonnes;
        this.creerFormulaire();
  
        for (let attribut of colonnes) {
          this.tableService.obtenirValeursEtrangeres(attribut.nom).subscribe((valeurs) => {
            if (valeurs.length > 0) {
              this.valeursSelect[attribut.nom] = valeurs;
            }
          });
          
          
        
        }
      },
      error: () => this.message = 'Erreur chargement des attributs'
    });
  }
  

  creerFormulaire(): void {
    const formGroup: { [cle: string]: FormControl<string> } = {};

    for (let attribut of this.attributs) {
      formGroup[attribut.nom] = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
    }

    this.form = new FormGroup(formGroup);
  }

  envoyer(): void {
    if (this.form.invalid) {
      this.message = "Formulaire invalide";
      return;
    }
  
    this.changeService.insererDansTable(this.nomTable, this.form.value).subscribe({
      next: () => {
        this.message = "Donnée inséré avec succès";
        this.creerFormulaire();
        setTimeout(() => this.message = '', 2000);
      },
      error: (err) => {
        this.message = err.error?.erreur;
        setTimeout(() => this.message = '', 2000);
        this.creerFormulaire();
      }
    });
    
  }
  

}
