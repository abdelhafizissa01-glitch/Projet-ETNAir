export type TypeLogement = 'VILLA' | 'APPARTEMENT' | 'CHAMBRE' | 'YOURTE' | 'CHATEAU' | 'CABANE';
export type TypeEtablissement = 'RESIDENCE' | 'HOTEL' | 'APPART_HOTEL' | 'MAISON_HOTE';
export type TypeService = 'GENERAL' | 'SECURITE' | 'DIVERTISSEMENT' | 'CUISINE' | 'EXTERIEUR' | 'BEBE';
export type ModePaiement = 'CARTE_BANCAIRE' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
export type EtatReservation = 'DEMANDE' | 'ACCEPTE' | 'REFUSE' | 'ANNULE' | 'TERMINE';

export interface Service {
  id: string;
  nom: string;
  category: TypeService;
  icon: string;
}

export interface Photo {
  id: string;
  url: string;
  description?: string;
}

export interface Etablissement {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  pays: string;
  code_postal: string;
  latitude: number;
  longitude: number;
  type: TypeEtablissement;
}

export interface Annonce {
  id: string;
  titre: string;
  description: string;
  type: TypeLogement;
  capacite: number;
  superficie: number;
  prix_par_nuit: number;
  etablissement: Etablissement;
  photos: Photo[];
  services: Service[];
  note_moyenne: number;
  nombre_avis: number;
  hote: {
    nom: string;
    prenom: string;
    url_photo: string;
  };
}

export interface Avis {
  id: string;
  note: number;
  commentaire: string;
  date_creation: string;
  utilisateur: {
    nom: string;
    prenom: string;
    url_photo: string;
  };
}

export interface Reservation {
  id: string;
  date_debut: string;
  date_fin: string;
  nombre_voyageurs: number;
  prix_total: number;
  etat: EtatReservation;
  annonce: Annonce;
  date_creation: string;
}
