export class GetKey {
    // revoir une methode + simple
      static getNomTableDesFK(attribut: string): string {
        let table = '';
    
        switch (attribut) {
          case 'idEcurie':
            table = 'ecuries';
            break;
          case 'idTemps':
            table = 'temps';
            break;
          case 'idJoueur':
            table = 'joueurs';
            break;
          case 'idEquipe':
            table = 'fait_partie';
            break;
          case 'idConditionClimat':
          case 'idConditionsClimatiques':
            table = 'conditionsClimatiques';
            break;
          case 'idPays':
            table = 'pays';
            break;
          case 'idGp':
          case 'idGrandPrix':
            table = 'grandPrix';
            break;
          case 'idCompetition':
            table = 'competitions';
            break;
          case 'idDateDebut':
          case 'idDateFin':
            table = 'temps';
            break;
          case 'idPerformance':
            table = 'performances';
            break;
          case 'idParticipation':
            table = 'participations';
            break;
          case 'pays':
            table = 'pays';
            break;
          default:
            table = attribut.replace('id', '').toLowerCase();
        }
        return table;
      }
    
      static getOptionLabel(attribut: string, obj: { [key: string]: any }): string {
        console.log('getOptionLabel pour', attribut, obj);
      
        let label = '';
        let table = GetKey.getNomTableDesFK(attribut);
      
        switch (table) {
          case 'ecuries':
            label = obj['nomEcurie'];
            break;
          case 'conditionsClimatiques':
            label = obj['libelle'];
            break;
          case 'grandPrix':
            return obj['nom'];
          case 'competitions':
            label = obj['nomCompetition'];
            break;
  
          case 'pays':
            label = obj['nom'];
            break;
          case 'temps':
            if (obj['dateTemps']) {
              label = obj['dateTemps'].split('T')[0];
            }
            break;
          case 'joueurs':
            label = obj['prenom'] + ' ' + obj['nom'];
            break;
          default:
            if (obj['nom']) {
              label = obj['nom'];
            } else if (obj['libelle']) {
              label = obj['libelle'];
            } else if (obj['id']) {
              label = obj['id'];
            }
        }
      
        return label;
      }
      
    }
    