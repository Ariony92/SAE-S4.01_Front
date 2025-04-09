export interface TupleTable {
  [attribut: string]: string | number;
}

export interface Insertions {
  entry: TupleTable[];
}

export interface nomColonne {
  columns: string[];
}

export interface TableAttribut{
  nom: string;
  types : string;
}
