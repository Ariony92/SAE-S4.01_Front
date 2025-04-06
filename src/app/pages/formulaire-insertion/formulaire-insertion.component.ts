import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { TableService } from '../../services/tables.service';
import { GetKey } from '../../modeleTS/getkey';

@Component({
  selector: 'app-formulaire-insertion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulaire-insertion.component.html',
  styleUrl: './formulaire-insertion.component.sass',
})
export class FormulaireInsertionComponent implements OnInit {
  @Output() insertionEffectuee = new EventEmitter<void>();

  tablesDisponibles: string[] = [];
  tableSelected: string = '';
  attributs: string[] = [];
  form!: FormGroup;
  selectOptions: { [key: string]: { [key: string]: string | number }[] } = {};
  primaryKey: string = '';

  constructor(private fb: FormBuilder, private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.nomTables().pipe(take(1)).subscribe({
      next: (res) => this.tablesDisponibles = res.tables,
      error: () => alert("Problème lors du chargement des tables")
    });
  }

  onTableChange(): void {
    this.tableService.colonnesTable(this.tableSelected).pipe(take(1)).subscribe({
      next: (colonnes) => {  
        this.tableService.getPrimaryKey(this.tableSelected).pipe(take(1)).subscribe({
          next: (keyRes) => {
            this.primaryKey = keyRes.primary_key;
  
            this.attributs = colonnes
            .filter(col => col.nom !== this.primaryKey)
            .map(col => col.nom);
          
  
            let group: { [key: string]: object } = {};
            this.selectOptions = {};
  
            for (let attribut of this.attributs) {
              group[attribut] = this.fb.control('', Validators.required);
  
              if ((attribut.toLowerCase().startsWith('id') || attribut === 'pays') && attribut !== this.primaryKey) {
                let tableFK = GetKey.getNomTableDesFK(attribut);
  
                if (tableFK !== this.tableSelected.toLowerCase()) {
                  this.tableService.contenueTable(tableFK).pipe(take(1)).subscribe({
                    next: (resTable: { data: { [key: string]: string | number }[] }) => {
                      this.selectOptions[attribut] = resTable?.data || [];
                    },
                    error: () => this.selectOptions[attribut] = []
                  });
                }
              }
            }
  
            this.form = this.fb.group(group);
          }
        });
      },
      error: () => alert("Problème lors du chargement des colonnes")
    });
  }
  

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    let payload = this.form.value;
    delete payload[this.primaryKey];

    this.tableService.insererDansTable(this.tableSelected, payload).pipe(take(1)).subscribe({
      next: () => {
        alert("Insertion ok");
        this.form.reset();
        this.insertionEffectuee.emit();
      },  
      error: () => alert("Problème lors de l'insertion")
    });
  }

  getOptionLabel(attribut: string, obj: { [key: string]: string | number }): string {
    return GetKey.getOptionLabel(attribut, obj);
  }
  

  onTableSelect(event: Event): void {
    let selectElement = event.target;
    if (selectElement) {
      let element = event.target as HTMLSelectElement;
      this.tableSelected = element.value;      
      this.onTableChange();
    }
  }
  getPrimaryKeyValue(obj: { [key: string]: string | number }): string | number {
    for (let key in obj) {
      if (key.toLowerCase().startsWith('id')) {
        return obj[key];
      }
    }
    return '';
  }
  
}
