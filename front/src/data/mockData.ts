import { Annonce, Service, Avis, Reservation } from '../types';

export const allServices: Service[] = [
  { id: 's1', nom: 'Wifi', category: 'GENERAL', icon: 'Wifi' },
  { id: 's2', nom: 'Cuisine équipée', category: 'CUISINE', icon: 'ChefHat' },
  { id: 's3', nom: 'Parking gratuit', category: 'GENERAL', icon: 'Car' },
  { id: 's4', nom: 'Piscine', category: 'EXTERIEUR', icon: 'Waves' },
  { id: 's5', nom: 'Climatisation', category: 'GENERAL', icon: 'Wind' },
  { id: 's6', nom: 'Extincteur', category: 'SECURITE', icon: 'Flame' },
  { id: 's7', nom: 'Détecteur de fumée', category: 'SECURITE', icon: 'AlertTriangle' },
  { id: 's8', nom: 'Télévision', category: 'DIVERTISSEMENT', icon: 'Tv' },
  { id: 's9', nom: 'Jardin', category: 'EXTERIEUR', icon: 'Trees' },
  { id: 's10', nom: 'Lit parapluie', category: 'BEBE', icon: 'Baby' },
  { id: 's11', nom: 'Chaise haute', category: 'BEBE', icon: 'Armchair' },
  { id: 's12', nom: 'Lave-linge', category: 'GENERAL', icon: 'WashingMachine' },
];

export const mockAnnonces: Annonce[] = [
  {
    id: '1',
    titre: 'Villa de luxe avec vue sur mer',
    description: 'Magnifique villa moderne avec piscine privée et vue panoramique sur la Méditerranée. Parfait pour des vacances en famille ou entre amis. La villa dispose de grandes baies vitrées, d\'une cuisine équipée haut de gamme et d\'espaces extérieurs aménagés.',
    type: 'VILLA',
    capacite: 8,
    superficie: 250,
    prix_par_nuit: 450,
    etablissement: {
      id: 'e1',
      nom: 'Villa Azure',
      adresse: '15 Chemin des Pins',
      ville: 'Nice',
      pays: 'France',
      code_postal: '06000',
      latitude: 43.7102,
      longitude: 7.2620,
      type: 'RESIDENCE'
    },
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzY1NTQ2MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
      { id: 'p4', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
      { id: 'p5', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' }
    ],
    services: [allServices[0], allServices[1], allServices[2], allServices[3], allServices[4], allServices[5], allServices[6], allServices[7]],
    note_moyenne: 4.95,
    nombre_avis: 47,
    hote: {
      nom: 'Martin',
      prenom: 'Sophie',
      url_photo: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: '2',
    titre: 'Appartement moderne en centre-ville',
    description: 'Superbe appartement rénové au cœur de Paris, à deux pas du Louvre. Idéal pour découvrir la ville à pied. L\'appartement est décoré avec goût et dispose de tout le confort moderne.',
    type: 'APPARTEMENT',
    capacite: 4,
    superficie: 85,
    prix_par_nuit: 180,
    etablissement: {
      id: 'e2',
      nom: 'Résidence Hausmann',
      adresse: '28 Boulevard Hausmann',
      ville: 'Paris',
      pays: 'France',
      code_postal: '75009',
      latitude: 48.8738,
      longitude: 2.3354,
      type: 'RESIDENCE'
    },
    photos: [
      { id: 'p6', url: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjU0NzEzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p7', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
      { id: 'p8', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' },
      { id: 'p9', url: 'https://images.unsplash.com/photo-1502672260066-6bc35f0b3c1f?w=800' },
      { id: 'p10', url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800' }
    ],
    services: [allServices[0], allServices[1], allServices[4], allServices[7], allServices[11]],
    note_moyenne: 4.82,
    nombre_avis: 128,
    hote: {
      nom: 'Dubois',
      prenom: 'Jean',
      url_photo: 'https://i.pravatar.cc/150?img=12'
    }
  },
  {
    id: '3',
    titre: 'Chambre cosy avec vue montagne',
    description: 'Chambre chaleureuse dans un chalet authentique, au pied des pistes. Petit-déjeuner inclus. Parfait pour un séjour au ski en hiver ou des randonnées en été.',
    type: 'CHAMBRE',
    capacite: 2,
    superficie: 25,
    prix_par_nuit: 95,
    etablissement: {
      id: 'e3',
      nom: 'Chalet les Arolles',
      adresse: 'Route des Alpes',
      ville: 'Chamonix',
      pays: 'France',
      code_postal: '74400',
      latitude: 45.9237,
      longitude: 6.8694,
      type: 'MAISON_HOTE'
    },
    photos: [
      { id: 'p11', url: 'https://images.unsplash.com/photo-1667153653404-11bc88130b5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGhvdGVsfGVufDF8fHx8MTc2NTQ3MjMyOHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p12', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800' },
      { id: 'p13', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800' },
      { id: 'p14', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' },
      { id: 'p15', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800' }
    ],
    services: [allServices[0], allServices[4], allServices[5], allServices[6], allServices[7]],
    note_moyenne: 4.88,
    nombre_avis: 63,
    hote: {
      nom: 'Blanc',
      prenom: 'Marie',
      url_photo: 'https://i.pravatar.cc/150?img=9'
    }
  },
  {
    id: '4',
    titre: 'Cabane dans les arbres - Expérience unique',
    description: 'Vivez une expérience inoubliable dans cette cabane perchée à 8 mètres de hauteur. Confort moderne dans un cadre naturel exceptionnel.',
    type: 'CABANE',
    capacite: 2,
    superficie: 30,
    prix_par_nuit: 140,
    etablissement: {
      id: 'e4',
      nom: 'Domaine des Cimes',
      adresse: 'Forêt de Brocéliande',
      ville: 'Paimpont',
      pays: 'France',
      code_postal: '35380',
      latitude: 48.0254,
      longitude: -2.1694,
      type: 'RESIDENCE'
    },
    photos: [
      { id: 'p16', url: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2NTU0NjA5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p17', url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800' },
      { id: 'p18', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800' },
      { id: 'p19', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800' },
      { id: 'p20', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800' }
    ],
    services: [allServices[0], allServices[1], allServices[2], allServices[8]],
    note_moyenne: 4.97,
    nombre_avis: 85,
    hote: {
      nom: 'Forestier',
      prenom: 'Antoine',
      url_photo: 'https://i.pravatar.cc/150?img=15'
    }
  },
  {
    id: '5',
    titre: 'Château historique du XVIIIe siècle',
    description: 'Séjournez dans un véritable château restauré avec tout le confort moderne. Parc de 10 hectares, bibliothèque, salle de billard. Une expérience royale.',
    type: 'CHATEAU',
    capacite: 12,
    superficie: 600,
    prix_par_nuit: 890,
    etablissement: {
      id: 'e5',
      nom: 'Château de Beaumont',
      adresse: '1 Allée du Château',
      ville: 'Amboise',
      pays: 'France',
      code_postal: '37400',
      latitude: 47.4127,
      longitude: 0.9834,
      type: 'RESIDENCE'
    },
    photos: [
      { id: 'p21', url: 'https://images.unsplash.com/photo-1662289861548-34b574ba81a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0bGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1NTMyNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p22', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
      { id: 'p23', url: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800' },
      { id: 'p24', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
      { id: 'p25', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800' }
    ],
    services: [allServices[0], allServices[1], allServices[2], allServices[4], allServices[5], allServices[6], allServices[7], allServices[8], allServices[9], allServices[10]],
    note_moyenne: 4.99,
    nombre_avis: 34,
    hote: {
      nom: 'de Beaumont',
      prenom: 'Charles',
      url_photo: 'https://i.pravatar.cc/150?img=33'
    }
  },
  {
    id: '6',
    titre: 'Yourte mongole de luxe',
    description: 'Glamping haut de gamme dans une yourte authentique avec lit king-size, salle de bain privée et terrasse panoramique. Expérience nature sans compromis sur le confort.',
    type: 'YOURTE',
    capacite: 2,
    superficie: 35,
    prix_par_nuit: 165,
    etablissement: {
      id: 'e6',
      nom: 'Camp des Étoiles',
      adresse: 'Plateau de Valensole',
      ville: 'Valensole',
      pays: 'France',
      code_postal: '04210',
      latitude: 43.8364,
      longitude: 5.9847,
      type: 'RESIDENCE'
    },
    photos: [
      { id: 'p26', url: 'https://images.unsplash.com/photo-1714326029322-fcc1464df757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtcGluZyUyMHRlbnR8ZW58MXx8fHwxNzY1NTQ2MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'p27', url: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800' },
      { id: 'p28', url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800' },
      { id: 'p29', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800' },
      { id: 'p30', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' }
    ],
    services: [allServices[0], allServices[1], allServices[2], allServices[8]],
    note_moyenne: 4.91,
    nombre_avis: 72,
    hote: {
      nom: 'Lavande',
      prenom: 'Camille',
      url_photo: 'https://i.pravatar.cc/150?img=20'
    }
  }
];

export const mockAvis: { [key: string]: Avis[] } = {
  '1': [
    {
      id: 'a1',
      note: 5,
      commentaire: 'Villa absolument magnifique avec une vue à couper le souffle ! L\'hôte était très accueillante et disponible. Nous avons passé un séjour inoubliable.',
      date_creation: '2024-11-15',
      utilisateur: {
        nom: 'Rousseau',
        prenom: 'Claire',
        url_photo: 'https://i.pravatar.cc/150?img=10'
      }
    },
    {
      id: 'a2',
      note: 5,
      commentaire: 'Parfait pour des vacances en famille. La piscine et les équipements sont top !',
      date_creation: '2024-10-28',
      utilisateur: {
        nom: 'Bernard',
        prenom: 'Thomas',
        url_photo: 'https://i.pravatar.cc/150?img=13'
      }
    },
    {
      id: 'a3',
      note: 4,
      commentaire: 'Très bel endroit, légèrement excentré mais ça vaut le coup. Je recommande !',
      date_creation: '2024-09-12',
      utilisateur: {
        nom: 'Petit',
        prenom: 'Julie',
        url_photo: 'https://i.pravatar.cc/150?img=16'
      }
    }
  ],
  '2': [
    {
      id: 'a4',
      note: 5,
      commentaire: 'Emplacement parfait pour visiter Paris ! Appartement propre et moderne.',
      date_creation: '2024-11-20',
      utilisateur: {
        nom: 'Garcia',
        prenom: 'Maria',
        url_photo: 'https://i.pravatar.cc/150?img=23'
      }
    },
    {
      id: 'a5',
      note: 5,
      commentaire: 'Excellente communication avec l\'hôte. Tout était comme décrit.',
      date_creation: '2024-10-05',
      utilisateur: {
        nom: 'Schmidt',
        prenom: 'Hans',
        url_photo: 'https://i.pravatar.cc/150?img=31'
      }
    }
  ]
};

export const mockReservations: Reservation[] = [
  {
    id: 'r1',
    date_debut: '2024-12-20',
    date_fin: '2024-12-27',
    nombre_voyageurs: 4,
    prix_total: 1260,
    etat: 'ACCEPTE',
    annonce: mockAnnonces[1],
    date_creation: '2024-11-15'
  },
  {
    id: 'r2',
    date_debut: '2025-01-10',
    date_fin: '2025-01-15',
    nombre_voyageurs: 2,
    prix_total: 475,
    etat: 'DEMANDE',
    annonce: mockAnnonces[2],
    date_creation: '2024-12-08'
  },
  {
    id: 'r3',
    date_debut: '2024-10-05',
    date_fin: '2024-10-12',
    nombre_voyageurs: 8,
    prix_total: 3150,
    etat: 'TERMINE',
    annonce: mockAnnonces[0],
    date_creation: '2024-09-12'
  }
];
