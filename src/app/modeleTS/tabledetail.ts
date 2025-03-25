export interface TupleTable {
  [attribut: string]: string | number;
}

export interface Insertions {
  data: TupleTable[];
}

export interface nomColonne {
  columns: string[];
}

export interface TableAttribut{
  nom: string;
  type : string;
}
