// ============================================
// API Model TypeScript Interfaces
// ============================================

export interface CompetitionResult {
  id: string;
  name: string;
  country: string;
  clubs: number;
  players: number;
  totalMarketValue: number;
  meanMarketValue: number;
  continent: string;
}

export interface CompetitionSearchResponse {
  updatedAt: string;
  query: string;
  pageNumber: number;
  lastPageNumber: number;
  results: CompetitionResult[];
}

export interface Club {
  id: string;
  name: string;
}

export interface CompetitionClubsResponse {
  updatedAt: string;
  id: string;
  name: string;
  seasonId: string;
  clubs: Club[];
}

export interface ClubSearchResult {
  id: string;
  url: string;
  name: string;
  country: string;
  squad: number;
  marketValue: number;
}

export interface ClubSearchResponse {
  updatedAt: string;
  query: string;
  pageNumber: number;
  lastPageNumber: number;
  results: ClubSearchResult[];
}

export interface Player {
  id: string;
  name: string;
  position: string;
  dateOfBirth: string;
  age: number;
  nationality: string[];
  currentClub: string;
  height: number;
  foot: string;
  joinedOn: string;
  joined: string;
  signedFrom: string;
  contract: string;
  marketValue: number;
  status: string;
}

export interface ClubPlayersResponse {
  updatedAt: string;
  id: string;
  players: Player[];
}

// ============================================
// Helper Functions for Date Generation
// ============================================

const getISOString = () => new Date().toISOString();

const getBirthDate = (age: number): string => {
  const year = new Date().getFullYear() - age;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const getJoinedDate = (yearsAgo: number): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsAgo);
  return date.toISOString().split('T')[0];
};

const getContractDate = (yearsFromNow: number): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + yearsFromNow);
  return date.toISOString().split('T')[0];
};

// ============================================
// Mock Data - Competitions Search
// ============================================

export const mockCompetitions: CompetitionSearchResponse = {
  updatedAt: getISOString(),
  query: "super lig",
  pageNumber: 1,
  lastPageNumber: 4,
  results: [
    {
      id: "super-lig",
      name: "Trendyol Süper Lig",
      country: "Türkiye",
      clubs: 20,
      players: 520,
      totalMarketValue: 1200000000,
      meanMarketValue: 2300000,
      continent: "Europe"
    },
    {
      id: "premier-league",
      name: "Premier League",
      country: "England",
      clubs: 20,
      players: 550,
      totalMarketValue: 8500000000,
      meanMarketValue: 15000000,
      continent: "Europe"
    },
    {
      id: "la-liga",
      name: "La Liga",
      country: "Spain",
      clubs: 20,
      players: 530,
      totalMarketValue: 7200000000,
      meanMarketValue: 13500000,
      continent: "Europe"
    },
    {
      id: "serie-a",
      name: "Serie A",
      country: "Italy",
      clubs: 20,
      players: 540,
      totalMarketValue: 6500000000,
      meanMarketValue: 12000000,
      continent: "Europe"
    }
  ]
};

// ============================================
// Mock Data - Competition Clubs
// ============================================

export const mockCompetitionClubs: CompetitionClubsResponse[] = [
  {
    updatedAt: getISOString(),
    id: "super-lig",
    name: "Trendyol Süper Lig",
    seasonId: "2024-2025",
    clubs: [
      { id: "fenerbahce", name: "Fenerbahçe" },
      { id: "galatasaray", name: "Galatasaray" },
      { id: "besiktas", name: "Beşiktaş" },
      { id: "trabzonspor", name: "Trabzonspor" },
      { id: "basaksehir", name: "Başakşehir" },
      { id: "alanyaspor", name: "Alanyaspor" },
      { id: "sivasspor", name: "Sivasspor" },
      { id: "konyaspor", name: "Konyaspor" },
      { id: "adana-demirspor", name: "Adana Demirspor" },
      { id: "kasimpasa", name: "Kasımpaşa" },
      { id: "gaziantep-fk", name: "Gaziantep FK" },
      { id: "ankaragucu", name: "Ankaragücü" },
      { id: "antalyaspor", name: "Antalyaspor" },
      { id: "istanbulspor", name: "İstanbulspor" },
      { id: "samsunspor", name: "Samsunspor" },
      { id: "hatayspor", name: "Hatayspor" },
      { id: "rizespor", name: "Rizespor" },
      { id: "pendikspor", name: "Pendikspor" }
    ]
  },
  {
    updatedAt: getISOString(),
    id: "premier-league",
    name: "Premier League",
    seasonId: "2024-2025",
    clubs: [
      { id: "manchester-city", name: "Manchester City" },
      { id: "arsenal", name: "Arsenal" },
      { id: "liverpool", name: "Liverpool" },
      { id: "manchester-united", name: "Manchester United" },
      { id: "chelsea", name: "Chelsea" }
    ]
  },
  {
    updatedAt: getISOString(),
    id: "la-liga",
    name: "La Liga",
    seasonId: "2024-2025",
    clubs: [
      { id: "real-madrid", name: "Real Madrid" },
      { id: "barcelona", name: "Barcelona" },
      { id: "atletico-madrid", name: "Atlético Madrid" },
      { id: "sevilla", name: "Sevilla" },
      { id: "real-sociedad", name: "Real Sociedad" }
    ]
  },
  {
    updatedAt: getISOString(),
    id: "serie-a",
    name: "Serie A",
    seasonId: "2024-2025",
    clubs: [
      { id: "juventus", name: "Juventus" },
      { id: "inter-milan", name: "Inter Milan" },
      { id: "ac-milan", name: "AC Milan" },
      { id: "napoli", name: "Napoli" },
      { id: "roma", name: "AS Roma" }
    ]
  }
];

// ============================================
// Mock Data - Club Search
// ============================================

export const mockClubs: ClubSearchResponse = {
  updatedAt: getISOString(),
  query: "all",
  pageNumber: 1,
  lastPageNumber: 1,
  results: [
    ...mockCompetitionClubs[0].clubs.map(club => ({
      id: club.id,
      url: `https://example.com/clubs/${club.id}`,
      name: club.name,
      country: "Türkiye",
      squad: 25,
      marketValue: Math.floor(Math.random() * 50000000) + 5000000
    })),
    ...mockCompetitionClubs[1].clubs.map(club => ({
      id: club.id,
      url: `https://example.com/clubs/${club.id}`,
      name: club.name,
      country: "England",
      squad: 28,
      marketValue: Math.floor(Math.random() * 500000000) + 100000000
    })),
    ...mockCompetitionClubs[2].clubs.map(club => ({
      id: club.id,
      url: `https://example.com/clubs/${club.id}`,
      name: club.name,
      country: "Spain",
      squad: 26,
      marketValue: Math.floor(Math.random() * 400000000) + 80000000
    })),
    ...mockCompetitionClubs[3].clubs.map(club => ({
      id: club.id,
      url: `https://example.com/clubs/${club.id}`,
      name: club.name,
      country: "Italy",
      squad: 27,
      marketValue: Math.floor(Math.random() * 300000000) + 70000000
    }))
  ]
};

// ============================================
// Mock Data - Club Players
// ============================================

const createPlayer = (
  id: string,
  name: string,
  position: string,
  age: number,
  nationality: string[],
  currentClub: string,
  height: number,
  foot: string,
  marketValue: number
): Player => {
  const joinedYearsAgo = Math.floor(Math.random() * 5) + 1;
  return {
    id,
    name,
    position,
    dateOfBirth: getBirthDate(age),
    age,
    nationality,
    currentClub,
    height,
    foot,
    joinedOn: getJoinedDate(joinedYearsAgo),
    joined: `${joinedYearsAgo} years ago`,
    signedFrom: ["Free Transfer", "Transfer", "Youth Academy"][Math.floor(Math.random() * 3)],
    contract: getContractDate(Math.floor(Math.random() * 3) + 1),
    marketValue,
    status: "Available"
  };
};

export const mockPlayers: ClubPlayersResponse[] = [
  // Fenerbahçe
  {
    updatedAt: getISOString(),
    id: "fenerbahce",
    players: [
      createPlayer("fb-1", "Dominik Livaković", "GK", 29, ["Hırvatistan"], "Fenerbahçe", 188, "right", 8000000),
      createPlayer("fb-2", "İrfan Egribayat", "GK", 24, ["Türkiye"], "Fenerbahçe", 185, "right", 1500000),
      createPlayer("fb-3", "Ferdi Kadıoğlu", "LB", 24, ["Türkiye"], "Fenerbahçe", 175, "left", 15000000),
      createPlayer("fb-4", "Attila Szalai", "CB", 26, ["Macaristan"], "Fenerbahçe", 190, "left", 12000000),
      createPlayer("fb-5", "Serdar Aziz", "CB", 34, ["Türkiye"], "Fenerbahçe", 186, "right", 3000000),
      createPlayer("fb-6", "Osayi-Samuel", "RB", 26, ["Nijerya"], "Fenerbahçe", 178, "right", 5000000),
      createPlayer("fb-7", "İsmail Yüksek", "CM", 25, ["Türkiye"], "Fenerbahçe", 182, "right", 8000000),
      createPlayer("fb-8", "Fred", "CM", 31, ["Brezilya"], "Fenerbahçe", 169, "right", 20000000),
      createPlayer("fb-9", "Sebastian Szymański", "CAM", 25, ["Polonya"], "Fenerbahçe", 174, "left", 10000000),
      createPlayer("fb-10", "İrfan Can Kahveci", "CM", 29, ["Türkiye"], "Fenerbahçe", 175, "right", 6000000),
      createPlayer("fb-11", "Edin Džeko", "ST", 38, ["Bosna-Hersek"], "Fenerbahçe", 193, "right", 2000000),
      createPlayer("fb-12", "Ryan Kent", "LW", 27, ["İngiltere"], "Fenerbahçe", 176, "right", 3000000),
      createPlayer("fb-13", "Cengiz Ünder", "RW", 26, ["Türkiye"], "Fenerbahçe", 173, "left", 12000000),
      createPlayer("fb-14", "Dusan Tadic", "AM", 36, ["Sırbistan"], "Fenerbahçe", 181, "right", 6000000),
      createPlayer("fb-15", "Mert Müldür", "RB", 25, ["Türkiye"], "Fenerbahçe", 180, "right", 4000000),
      createPlayer("fb-16", "Jayden Oosterwolde", "CB", 23, ["Hollanda"], "Fenerbahçe", 188, "left", 2500000),
      createPlayer("fb-17", "Mert Hakan Yandaş", "CM", 29, ["Türkiye"], "Fenerbahçe", 178, "right", 3500000),
      createPlayer("fb-18", "Michy Batshuayi", "ST", 30, ["Belçika"], "Fenerbahçe", 185, "right", 8000000),
      createPlayer("fb-19", "Zeki Çelik", "RB", 27, ["Türkiye"], "Fenerbahçe", 175, "right", 5000000),
      createPlayer("fb-20", "Rıdvan Yılmaz", "LB", 23, ["Türkiye"], "Fenerbahçe", 173, "left", 6000000)
    ]
  },
  // Galatasaray
  {
    updatedAt: getISOString(),
    id: "galatasaray",
    players: [
      createPlayer("gs-1", "Fernando Muslera", "GK", 37, ["Uruguay"], "Galatasaray", 190, "right", 3000000),
      createPlayer("gs-2", "Jankat Yılmaz", "GK", 23, ["Türkiye"], "Galatasaray", 188, "right", 1000000),
      createPlayer("gs-3", "Abdülkerim Bardakcı", "CB", 29, ["Türkiye"], "Galatasaray", 185, "left", 5000000),
      createPlayer("gs-4", "Davinson Sánchez", "CB", 28, ["Kolombiya"], "Galatasaray", 187, "right", 15000000),
      createPlayer("gs-5", "Angeliño", "LB", 27, ["İspanya"], "Galatasaray", 175, "left", 8000000),
      createPlayer("gs-6", "Sacha Boey", "RB", 23, ["Fransa"], "Galatasaray", 178, "right", 12000000),
      createPlayer("gs-7", "Lucas Torreira", "CDM", 28, ["Uruguay"], "Galatasaray", 168, "right", 18000000),
      createPlayer("gs-8", "Kerem Demirbay", "CM", 31, ["Türkiye"], "Galatasaray", 182, "left", 6000000),
      createPlayer("gs-9", "Dries Mertens", "CAM", 37, ["Belçika"], "Galatasaray", 169, "right", 4000000),
      createPlayer("gs-10", "Yunus Akgün", "RW", 24, ["Türkiye"], "Galatasaray", 174, "left", 8000000),
      createPlayer("gs-11", "Mauro Icardi", "ST", 31, ["Arjantin"], "Galatasaray", 181, "right", 25000000),
      createPlayer("gs-12", "Hakim Ziyech", "RW", 31, ["Fas"], "Galatasaray", 180, "left", 15000000),
      createPlayer("gs-13", "Tete", "RW", 24, ["Brezilya"], "Galatasaray", 173, "right", 10000000),
      createPlayer("gs-14", "Wilfried Zaha", "LW", 31, ["Fildişi Sahili"], "Galatasaray", 180, "right", 12000000),
      createPlayer("gs-15", "Victor Nelsson", "CB", 26, ["Danimarka"], "Galatasaray", 189, "right", 10000000),
      createPlayer("gs-16", "Barış Alıcı", "RB", 26, ["Türkiye"], "Galatasaray", 178, "right", 3000000),
      createPlayer("gs-17", "Kazımcan Karataş", "LB", 21, ["Türkiye"], "Galatasaray", 176, "left", 4000000),
      createPlayer("gs-18", "Lucas Torreira", "CDM", 28, ["Uruguay"], "Galatasaray", 168, "right", 18000000),
      createPlayer("gs-19", "Halil Dervişoğlu", "ST", 25, ["Türkiye"], "Galatasaray", 185, "right", 5000000),
      createPlayer("gs-20", "Gedson Fernandes", "CM", 25, ["Portekiz"], "Galatasaray", 182, "right", 8000000)
    ]
  },
  // Beşiktaş
  {
    updatedAt: getISOString(),
    id: "besiktas",
    players: [
      createPlayer("bjk-1", "Mert Günok", "GK", 35, ["Türkiye"], "Beşiktaş", 191, "right", 3000000),
      createPlayer("bjk-2", "Ersin Destanoğlu", "GK", 23, ["Türkiye"], "Beşiktaş", 188, "right", 2000000),
      createPlayer("bjk-3", "Arthur Masuaku", "LB", 30, ["Kongo"], "Beşiktaş", 178, "left", 4000000),
      createPlayer("bjk-4", "Welinton", "CB", 31, ["Brezilya"], "Beşiktaş", 188, "right", 5000000),
      createPlayer("bjk-5", "Domagoj Vida", "CB", 35, ["Hırvatistan"], "Beşiktaş", 184, "right", 2000000),
      createPlayer("bjk-6", "Ridvan Yılmaz", "RB", 23, ["Türkiye"], "Beşiktaş", 175, "left", 8000000),
      createPlayer("bjk-7", "Gedson Fernandes", "CM", 25, ["Portekiz"], "Beşiktaş", 182, "right", 12000000),
      createPlayer("bjk-8", "Salih Uçan", "CM", 30, ["Türkiye"], "Beşiktaş", 178, "right", 4000000),
      createPlayer("bjk-9", "Alex Teixeira", "CAM", 34, ["Brezilya"], "Beşiktaş", 173, "right", 6000000),
      createPlayer("bjk-10", "Cenk Tosun", "ST", 33, ["Türkiye"], "Beşiktaş", 186, "right", 3000000),
      createPlayer("bjk-11", "Vincent Aboubakar", "ST", 32, ["Kamerun"], "Beşiktaş", 184, "right", 8000000),
      createPlayer("bjk-12", "Al-Musrati", "CDM", 28, ["Libya"], "Beşiktaş", 186, "right", 10000000),
      createPlayer("bjk-13", "Antonio Silva", "CB", 21, ["Portekiz"], "Beşiktaş", 190, "right", 15000000),
      createPlayer("bjk-14", "Rafa Silva", "AM", 31, ["Portekiz"], "Beşiktaş", 175, "right", 12000000),
      createPlayer("bjk-15", "Amir Hadžiahmetović", "CM", 27, ["Bosna-Hersek"], "Beşiktaş", 182, "right", 6000000),
      createPlayer("bjk-16", "Jean Onana", "CM", 25, ["Kamerun"], "Beşiktaş", 185, "right", 7000000),
      createPlayer("bjk-17", "Sergen Yalçın", "LW", 27, ["Türkiye"], "Beşiktaş", 176, "right", 4000000),
      createPlayer("bjk-18", "Mert Günok", "GK", 35, ["Türkiye"], "Beşiktaş", 191, "right", 3000000),
      createPlayer("bjk-19", "Eric Bailly", "CB", 30, ["Fildişi Sahili"], "Beşiktaş", 187, "right", 5000000),
      createPlayer("bjk-20", "Jackson Muleka", "ST", 25, ["Kongo"], "Beşiktaş", 182, "right", 6000000)
    ]
  },
  // Trabzonspor
  {
    updatedAt: getISOString(),
    id: "trabzonspor",
    players: [
      createPlayer("ts-1", "Uğurcan Çakır", "GK", 28, ["Türkiye"], "Trabzonspor", 191, "right", 8000000),
      createPlayer("ts-2", "Onurcan Piri", "GK", 25, ["Türkiye"], "Trabzonspor", 185, "right", 1000000),
      createPlayer("ts-3", "Marc Bartra", "CB", 33, ["İspanya"], "Trabzonspor", 184, "right", 3000000),
      createPlayer("ts-4", "Stefano Denswil", "CB", 31, ["Belçika"], "Trabzonspor", 186, "left", 2000000),
      createPlayer("ts-5", "Eren Elmalı", "LB", 26, ["Türkiye"], "Trabzonspor", 177, "left", 4000000),
      createPlayer("ts-6", "Petros", "RB", 29, ["Yunanistan"], "Trabzonspor", 179, "right", 3000000),
      createPlayer("ts-7", "Abdülkadir Ömür", "CM", 25, ["Türkiye"], "Trabzonspor", 173, "right", 6000000),
      createPlayer("ts-8", "Manolis Siopis", "CDM", 30, ["Yunanistan"], "Trabzonspor", 175, "right", 4000000),
      createPlayer("ts-9", "Edin Višća", "CAM", 34, ["Bosna-Hersek"], "Trabzonspor", 172, "left", 5000000),
      createPlayer("ts-10", "Maxi Gómez", "ST", 27, ["Uruguay"], "Trabzonspor", 186, "right", 8000000),
      createPlayer("ts-11", "Anastasios Bakasetas", "CAM", 31, ["Yunanistan"], "Trabzonspor", 181, "right", 4000000),
      createPlayer("ts-12", "Enis Destan", "ST", 22, ["Türkiye"], "Trabzonspor", 185, "right", 5000000),
      createPlayer("ts-13", "Umut Bozok", "ST", 28, ["Türkiye"], "Trabzonspor", 183, "right", 3500000),
      createPlayer("ts-14", "Mislav Oršić", "LW", 31, ["Hırvatistan"], "Trabzonspor", 178, "right", 6000000),
      createPlayer("ts-15", "Trezeguet", "RW", 29, ["Mısır"], "Trabzonspor", 175, "right", 8000000),
      createPlayer("ts-16", "Onur Bulut", "RB", 29, ["Türkiye"], "Trabzonspor", 179, "right", 3000000),
      createPlayer("ts-17", "Eren Elmalı", "LB", 26, ["Türkiye"], "Trabzonspor", 177, "left", 4000000),
      createPlayer("ts-18", "Banou Diawara", "CM", 28, ["Mali"], "Trabzonspor", 182, "right", 3500000),
      createPlayer("ts-19", "Berat Özdemir", "CDM", 25, ["Türkiye"], "Trabzonspor", 184, "right", 4000000),
      createPlayer("ts-20", "Uğurcan Çakır", "GK", 28, ["Türkiye"], "Trabzonspor", 191, "right", 8000000)
    ]
  },
  // Başakşehir
  {
    updatedAt: getISOString(),
    id: "basaksehir",
    players: [
      createPlayer("bsk-1", "Volkan Babacan", "GK", 35, ["Türkiye"], "Başakşehir", 192, "right", 2000000),
      createPlayer("bsk-2", "Leo Duarte", "CB", 28, ["Brezilya"], "Başakşehir", 186, "right", 4000000),
      createPlayer("bsk-3", "Lucas Lima", "CB", 30, ["Brezilya"], "Başakşehir", 185, "left", 3000000),
      createPlayer("bsk-4", "Mahmut Tekdemir", "CDM", 34, ["Türkiye"], "Başakşehir", 178, "right", 3000000),
      createPlayer("bsk-5", "Berkay Özcan", "CM", 27, ["Türkiye"], "Başakşehir", 175, "right", 4000000),
      createPlayer("bsk-6", "Deniz Türüç", "CAM", 31, ["Türkiye"], "Başakşehir", 177, "left", 3000000),
      createPlayer("bsk-7", "Stefano Okaka", "ST", 35, ["İtalya"], "Başakşehir", 186, "right", 2000000),
      createPlayer("bsk-8", "Serdar Gürler", "RW", 33, ["Türkiye"], "Başakşehir", 178, "right", 3000000),
      createPlayer("bsk-9", "Okan Kocuk", "GK", 29, ["Türkiye"], "Başakşehir", 192, "right", 2500000),
      createPlayer("bsk-10", "Emre Belözoğlu", "CM", 44, ["Türkiye"], "Başakşehir", 178, "right", 2000000),
      createPlayer("bsk-11", "Edin Visca", "RW", 34, ["Bosna-Hersek"], "Başakşehir", 172, "left", 5000000),
      createPlayer("bsk-12", "İrfan Can Eğribayat", "GK", 24, ["Türkiye"], "Başakşehir", 185, "right", 1500000),
      createPlayer("bsk-13", "Enzo Crivelli", "ST", 29, ["Fransa"], "Başakşehir", 188, "right", 4000000),
      createPlayer("bsk-14", "Youssouf Ndayishimiye", "CDM", 25, ["Burundi"], "Başakşehir", 183, "right", 3500000),
      createPlayer("bsk-15", "Lucas Biglia", "CM", 38, ["Arjantin"], "Başakşehir", 182, "right", 2000000),
      createPlayer("bsk-16", "Onur Ergun", "LB", 28, ["Türkiye"], "Başakşehir", 176, "left", 2500000),
      createPlayer("bsk-17", "Ömer Ali Şahiner", "RB", 27, ["Türkiye"], "Başakşehir", 179, "right", 2000000)
    ]
  },
  // Alanyaspor
  {
    updatedAt: getISOString(),
    id: "alanyaspor",
    players: [
      createPlayer("ala-1", "Marafona", "GK", 35, ["Brezilya"], "Alanyaspor", 190, "right", 2000000),
      createPlayer("ala-2", "Baran Moğultay", "LB", 24, ["Türkiye"], "Alanyaspor", 178, "left", 500000),
      createPlayer("ala-3", "João Novais", "CB", 30, ["Portekiz"], "Alanyaspor", 183, "left", 1000000),
      createPlayer("ala-4", "Fatih Aksoy", "CB", 27, ["Türkiye"], "Alanyaspor", 186, "right", 800000),
      createPlayer("ala-5", "Efkan Bekiroğlu", "CM", 29, ["Türkiye"], "Alanyaspor", 180, "right", 1000000),
      createPlayer("ala-6", "Kharbin", "CDM", 28, ["Suriye"], "Alanyaspor", 175, "right", 800000),
      createPlayer("ala-7", "Pape Diop", "CM", 26, ["Senegal"], "Alanyaspor", 182, "right", 1000000),
      createPlayer("ala-8", "Wilson Eduardo", "ST", 34, ["Portekiz"], "Alanyaspor", 185, "right", 1000000),
      createPlayer("ala-9", "Daniel Candeias", "RW", 36, ["Portekiz"], "Alanyaspor", 175, "right", 800000),
      createPlayer("ala-10", "Emre Akbaba", "LW", 32, ["Türkiye"], "Alanyaspor", 178, "left", 1000000),
      createPlayer("ala-11", "Ahmet Gülay", "RB", 25, ["Türkiye"], "Alanyaspor", 179, "right", 600000),
      createPlayer("ala-12", "Leroy Fer", "CM", 34, ["Hollanda"], "Alanyaspor", 188, "right", 1500000),
      createPlayer("ala-13", "Ousmane Coulibaly", "CB", 32, ["Mali"], "Alanyaspor", 190, "right", 1200000),
      createPlayer("ala-14", "Lucas Beraldo", "LB", 26, ["Brezilya"], "Alanyaspor", 182, "left", 2000000),
      createPlayer("ala-15", "Ahmed Hassan", "CAM", 28, ["Mısır"], "Alanyaspor", 175, "right", 1500000)
    ]
  },
  // Sivasspor
  {
    updatedAt: getISOString(),
    id: "sivasspor",
    players: [
      createPlayer("siv-1", "Ali Şaşal Vural", "GK", 30, ["Türkiye"], "Sivasspor", 189, "right", 2000000),
      createPlayer("siv-2", "Muammer Yıldırım", "GK", 26, ["Türkiye"], "Sivasspor", 186, "right", 800000),
      createPlayer("siv-3", "Caner Osmanpaşa", "CB", 32, ["Türkiye"], "Sivasspor", 188, "right", 3000000),
      createPlayer("siv-4", "Dimitris Goutas", "CB", 29, ["Yunanistan"], "Sivasspor", 190, "right", 2500000),
      createPlayer("siv-5", "Ziya Erdal", "LB", 27, ["Türkiye"], "Sivasspor", 176, "left", 1500000),
      createPlayer("siv-6", "Murat Paluli", "RB", 28, ["Türkiye"], "Sivasspor", 178, "right", 2000000),
      createPlayer("siv-7", "Max Gradel", "LW", 36, ["Fildişi Sahili"], "Sivasspor", 175, "right", 1500000),
      createPlayer("siv-8", "Erdoğan Yeşilyurt", "CM", 29, ["Türkiye"], "Sivasspor", 178, "right", 2000000),
      createPlayer("siv-9", "Hakan Arslan", "CM", 32, ["Türkiye"], "Sivasspor", 180, "right", 2500000),
      createPlayer("siv-10", "Clinton N'Jie", "RW", 30, ["Kamerun"], "Sivasspor", 177, "right", 3000000),
      createPlayer("siv-11", "Arouna Koné", "ST", 41, ["Fildişi Sahili"], "Sivasspor", 182, "right", 500000),
      createPlayer("siv-12", "Yasin Öztekin", "CAM", 37, ["Türkiye"], "Sivasspor", 173, "right", 1000000),
      createPlayer("siv-13", "Emre Kılınç", "CM", 30, ["Türkiye"], "Sivasspor", 182, "right", 2000000),
      createPlayer("siv-14", "Charis Charisis", "CB", 27, ["Yunanistan"], "Sivasspor", 186, "right", 1800000),
      createPlayer("siv-15", "Samu Saiz", "AM", 28, ["İspanya"], "Sivasspor", 175, "left", 2500000)
    ]
  },
  // Konyaspor
  {
    updatedAt: getISOString(),
    id: "konyaspor",
    players: [
      createPlayer("kon-1", "Erhan Erentürk", "GK", 29, ["Türkiye"], "Konyaspor", 191, "right", 2500000),
      createPlayer("kon-2", "İbrahim Şeşen", "GK", 24, ["Türkiye"], "Konyaspor", 188, "right", 800000),
      createPlayer("kon-3", "Francisco Calvo", "CB", 31, ["Kosta Rika"], "Konyaspor", 185, "left", 3000000),
      createPlayer("kon-4", "Adil Demirbağ", "CB", 29, ["Türkiye"], "Konyaspor", 187, "right", 2000000),
      createPlayer("kon-5", "Ahmet Oğuz", "LB", 28, ["Türkiye"], "Konyaspor", 178, "left", 1800000),
      createPlayer("kon-6", "Endri Çekiçi", "RB", 26, ["Türkiye"], "Konyaspor", 179, "right", 1500000),
      createPlayer("kon-7", "Soner Dikmen", "CDM", 29, ["Türkiye"], "Konyaspor", 182, "right", 2500000),
      createPlayer("kon-8", "Bruno Paz", "CM", 27, ["Portekiz"], "Konyaspor", 180, "right", 3000000),
      createPlayer("kon-9", "Dimitrios Siopis", "CM", 30, ["Yunanistan"], "Konyaspor", 178, "right", 2800000),
      createPlayer("kon-10", "Sokol Cikalleshi", "ST", 34, ["Arnavutluk"], "Konyaspor", 185, "right", 2000000),
      createPlayer("kon-11", "Amilton", "RW", 26, ["Brezilya"], "Konyaspor", 177, "right", 2500000),
      createPlayer("kon-12", "Uğurcan Yazğılı", "LW", 25, ["Türkiye"], "Konyaspor", 175, "left", 1800000),
      createPlayer("kon-13", "Konrad Michalak", "AM", 26, ["Polonya"], "Konyaspor", 173, "right", 2200000),
      createPlayer("kon-14", "Mame Thiam", "ST", 31, ["Senegal"], "Konyaspor", 187, "right", 2500000),
      createPlayer("kon-15", "Marcin Cebula", "CM", 29, ["Polonya"], "Konyaspor", 181, "right", 2000000)
    ]
  },
  // Adana Demirspor
  {
    updatedAt: getISOString(),
    id: "adana-demirspor",
    players: [
      createPlayer("ads-1", "Eray Birniçan", "GK", 28, ["Türkiye"], "Adana Demirspor", 190, "right", 3000000),
      createPlayer("ads-2", "Yavuz Aygün", "GK", 25, ["Türkiye"], "Adana Demirspor", 187, "right", 1000000),
      createPlayer("ads-3", "Semih Güler", "CB", 29, ["Türkiye"], "Adana Demirspor", 189, "right", 2500000),
      createPlayer("ads-4", "Abdulsamet Burak", "CB", 26, ["Türkiye"], "Adana Demirspor", 186, "right", 2000000),
      createPlayer("ads-5", "Joher Rassoul", "LB", 27, ["Fransa"], "Adana Demirspor", 178, "left", 2200000),
      createPlayer("ads-6", "Kevin Rodrigues", "LB", 29, ["Fransa"], "Adana Demirspor", 176, "left", 2800000),
      createPlayer("ads-7", "Yusuf Sarı", "RB", 28, ["Türkiye"], "Adana Demirspor", 179, "right", 2000000),
      createPlayer("ads-8", "Younès Belhanda", "CAM", 34, ["Fas"], "Adana Demirspor", 175, "right", 3500000),
      createPlayer("ads-9", "Gökhan Inler", "CM", 40, ["İsviçre"], "Adana Demirspor", 183, "right", 1000000),
      createPlayer("ads-10", "Emre Akbaba", "AM", 31, ["Türkiye"], "Adana Demirspor", 177, "right", 3000000),
      createPlayer("ads-11", "Younès Belhanda", "RW", 34, ["Fas"], "Adana Demirspor", 175, "right", 3500000),
      createPlayer("ads-12", "Mario Balotelli", "ST", 34, ["İtalya"], "Adana Demirspor", 189, "right", 4000000),
      createPlayer("ads-13", "David Akintola", "ST", 28, ["Nijerya"], "Adana Demirspor", 185, "right", 2500000),
      createPlayer("ads-14", "Abdullah Öztürk", "CM", 26, ["Türkiye"], "Adana Demirspor", 181, "right", 1800000),
      createPlayer("ads-15", "Benjamin Stambouli", "CDM", 33, ["Fransa"], "Adana Demirspor", 184, "right", 2000000)
    ]
  },
  // Kasımpaşa
  {
    updatedAt: getISOString(),
    id: "kasimpasa",
    players: [
      createPlayer("kas-1", "Ertuğrul Taşkıran", "GK", 28, ["Türkiye"], "Kasımpaşa", 188, "right", 2000000),
      createPlayer("kas-2", "Ramazan Köse", "GK", 24, ["Türkiye"], "Kasımpaşa", 186, "right", 800000),
      createPlayer("kas-3", "Kenneth Omeruo", "CB", 30, ["Nijerya"], "Kasımpaşa", 185, "right", 3000000),
      createPlayer("kas-4", "Tayyip Talha Sanuç", "CB", 24, ["Türkiye"], "Kasımpaşa", 190, "right", 2500000),
      createPlayer("kas-5", "Mortadha Ben Ouanes", "LB", 26, ["Tunus"], "Kasımpaşa", 178, "left", 1800000),
      createPlayer("kas-6", "Valentin Eysseric", "LW", 32, ["Fransa"], "Kasımpaşa", 175, "right", 2500000),
      createPlayer("kas-7", "Mamadou Fall", "CM", 27, ["Senegal"], "Kasımpaşa", 182, "right", 2000000),
      createPlayer("kas-8", "Florent Hadergjonaj", "RB", 29, ["İsviçre"], "Kasımpaşa", 177, "right", 2200000),
      createPlayer("kas-9", "Ahmet Engin", "CDM", 28, ["Türkiye"], "Kasımpaşa", 183, "right", 1800000),
      createPlayer("kas-10", "Yasin Öztekin", "RW", 37, ["Türkiye"], "Kasımpaşa", 173, "right", 1000000),
      createPlayer("kas-11", "Aytac Kara", "ST", 32, ["Türkiye"], "Kasımpaşa", 184, "right", 2000000),
      createPlayer("kas-12", "Mamadou Fall", "ST", 27, ["Senegal"], "Kasımpaşa", 186, "right", 2500000),
      createPlayer("kas-13", "Stéphane Badji", "CM", 30, ["Senegal"], "Kasımpaşa", 185, "right", 2000000),
      createPlayer("kas-14", "Tomás Barcos", "ST", 33, ["Arjantin"], "Kasımpaşa", 182, "right", 2200000),
      createPlayer("kas-15", "Mustafa Pektemek", "ST", 35, ["Türkiye"], "Kasımpaşa", 180, "right", 1000000)
    ]
  },
  // Gaziantep FK
  {
    updatedAt: getISOString(),
    id: "gaziantep-fk",
    players: [
      createPlayer("gaz-1", "Günay Güvenç", "GK", 30, ["Türkiye"], "Gaziantep FK", 189, "right", 2500000),
      createPlayer("gaz-2", "Batuhan Şen", "GK", 25, ["Türkiye"], "Gaziantep FK", 187, "right", 900000),
      createPlayer("gaz-3", "Ertuğrul Ersoy", "CB", 28, ["Türkiye"], "Gaziantep FK", 188, "left", 2000000),
      createPlayer("gaz-4", "Júnior Morais", "CB", 34, ["Brezilya"], "Gaziantep FK", 186, "right", 1800000),
      createPlayer("gaz-5", "Paulo Henrique", "LB", 27, ["Brezilya"], "Gaziantep FK", 177, "left", 2200000),
      createPlayer("gaz-6", "Souleymane Diarra", "RB", 29, ["Mali"], "Gaziantep FK", 178, "right", 2000000),
      createPlayer("gaz-7", "Nani", "LW", 37, ["Portekiz"], "Gaziantep FK", 175, "right", 3000000),
      createPlayer("gaz-8", "Oğuz Ceylan", "CM", 29, ["Türkiye"], "Gaziantep FK", 180, "right", 2200000),
      createPlayer("gaz-9", "Brandon Deville", "CDM", 26, ["Fransa"], "Gaziantep FK", 184, "right", 2500000),
      createPlayer("gaz-10", "Lucas Biglia", "CM", 38, ["Arjantin"], "Gaziantep FK", 182, "right", 2000000),
      createPlayer("gaz-11", "Mirza Cihan", "RW", 28, ["Türkiye"], "Gaziantep FK", 176, "right", 1800000),
      createPlayer("gaz-12", "Mustafa Eskihellaç", "ST", 30, ["Türkiye"], "Gaziantep FK", 185, "right", 2000000),
      createPlayer("gaz-13", "Ángelo Sagal", "ST", 30, ["Şili"], "Gaziantep FK", 180, "right", 2500000),
      createPlayer("gaz-14", "Deni Milošević", "AM", 27, ["Hırvatistan"], "Gaziantep FK", 175, "right", 2200000),
      createPlayer("gaz-15", "Onurhan Babuscu", "CM", 24, ["Türkiye"], "Gaziantep FK", 179, "right", 1500000)
    ]
  },
  // Ankaragücü
  {
    updatedAt: getISOString(),
    id: "ankaragucu",
    players: [
      createPlayer("agu-1", "Bahadır Han Güngördü", "GK", 29, ["Türkiye"], "Ankaragücü", 188, "right", 2000000),
      createPlayer("agu-2", "Doğukan Özkan", "GK", 23, ["Türkiye"], "Ankaragücü", 186, "right", 700000),
      createPlayer("agu-3", "Matej Hanousek", "CB", 26, ["Çek Cumhuriyeti"], "Ankaragücü", 185, "right", 2200000),
      createPlayer("agu-4", "Atakan Çankaya", "CB", 28, ["Türkiye"], "Ankaragücü", 187, "right", 1800000),
      createPlayer("agu-5", "Nihad Mujakić", "LB", 25, ["Bosna-Hersek"], "Ankaragücü", 178, "left", 2000000),
      createPlayer("agu-6", "Stelios Kitsiou", "RB", 30, ["Yunanistan"], "Ankaragücü", 179, "right", 1800000),
      createPlayer("agu-7", "Pedro Augusto", "CDM", 28, ["Brezilya"], "Ankaragücü", 183, "right", 2500000),
      createPlayer("agu-8", "Anastasios Chatzigiovanis", "CM", 27, ["Yunanistan"], "Ankaragücü", 181, "right", 2200000),
      createPlayer("agu-9", "Ender Aygören", "CM", 28, ["Türkiye"], "Ankaragücü", 180, "right", 2000000),
      createPlayer("agu-10", "Olimpiu Moruțan", "AM", 24, ["Romanya"], "Ankaragücü", 175, "right", 2500000),
      createPlayer("agu-11", "Uroš Radaković", "ST", 26, ["Sırbistan"], "Ankaragücü", 187, "right", 2200000),
      createPlayer("agu-12", "Ali Sowe", "ST", 29, ["Gambiya"], "Ankaragücü", 185, "right", 2500000),
      createPlayer("agu-13", "Efkan Bekiroğlu", "LW", 29, ["Türkiye"], "Ankaragücü", 177, "right", 1800000),
      createPlayer("agu-14", "Tolga Ciğerci", "CM", 32, ["Türkiye"], "Ankaragücü", 182, "right", 1500000),
      createPlayer("agu-15", "Riad Bajić", "RW", 30, ["Bosna-Hersek"], "Ankaragücü", 176, "right", 2000000)
    ]
  },
  // Antalyaspor
  {
    updatedAt: getISOString(),
    id: "antalyaspor",
    players: [
      createPlayer("ant-1", "Helton Leite", "GK", 28, ["Brezilya"], "Antalyaspor", 190, "right", 3000000),
      createPlayer("ant-2", "Alperen Uysal", "GK", 25, ["Türkiye"], "Antalyaspor", 187, "right", 1000000),
      createPlayer("ant-3", "Ömer Toprak", "CB", 34, ["Türkiye"], "Antalyaspor", 186, "right", 2500000),
      createPlayer("ant-4", "Veysel Sarı", "CB", 30, ["Türkiye"], "Antalyaspor", 188, "right", 2000000),
      createPlayer("ant-5", "Dudu", "LB", 27, ["Brezilya"], "Antalyaspor", 176, "left", 2200000),
      createPlayer("ant-6", "Ömer Alıcı", "RB", 28, ["Türkiye"], "Antalyaspor", 178, "right", 1800000),
      createPlayer("ant-7", "Uros Milovanovic", "CDM", 29, ["Sırbistan"], "Antalyaspor", 185, "right", 2500000),
      createPlayer("ant-8", "Fredy", "CM", 32, ["Brezilya"], "Antalyaspor", 181, "right", 2000000),
      createPlayer("ant-9", "Ersin Karaer", "CM", 26, ["Türkiye"], "Antalyaspor", 180, "right", 1800000),
      createPlayer("ant-10", "Sam Larsson", "LW", 31, ["İsveç"], "Antalyaspor", 177, "right", 2500000),
      createPlayer("ant-11", "Adam Buksa", "ST", 27, ["Polonya"], "Antalyaspor", 193, "right", 3000000),
      createPlayer("ant-12", "Wright", "RW", 28, ["ABD"], "Antalyaspor", 175, "right", 2200000),
      createPlayer("ant-13", "Hakan Yılmaz", "AM", 29, ["Türkiye"], "Antalyaspor", 173, "right", 2000000),
      createPlayer("ant-14", "Luiz Adriano", "ST", 37, ["Brezilya"], "Antalyaspor", 183, "right", 1500000),
      createPlayer("ant-15", "Eren Albayrak", "CB", 27, ["Türkiye"], "Antalyaspor", 184, "left", 1800000)
    ]
  },
  // İstanbulspor
  {
    updatedAt: getISOString(),
    id: "istanbulspor",
    players: [
      createPlayer("ist-1", "Jensen", "GK", 28, ["Danimarka"], "İstanbulspor", 189, "right", 2200000),
      createPlayer("ist-2", "Alp Arda", "GK", 24, ["Türkiye"], "İstanbulspor", 187, "right", 800000),
      createPlayer("ist-3", "Duhan Aksu", "CB", 26, ["Türkiye"], "İstanbulspor", 186, "right", 1800000),
      createPlayer("ist-4", "Demeaco Duhaney", "CB", 25, ["İngiltere"], "İstanbulspor", 185, "right", 2000000),
      createPlayer("ist-5", "Muhammed Emin Sarıkaya", "LB", 27, ["Türkiye"], "İstanbulspor", 177, "left", 1500000),
      createPlayer("ist-6", "Davidson", "RB", 29, ["Brezilya"], "İstanbulspor", 178, "right", 1800000),
      createPlayer("ist-7", "Ali Yavuz Kol", "CDM", 28, ["Türkiye"], "İstanbulspor", 183, "right", 2000000),
      createPlayer("ist-8", "Jetmir Topalli", "CM", 26, ["Arnavutluk"], "İstanbulspor", 181, "right", 2200000),
      createPlayer("ist-9", "Eduardo", "CM", 32, ["Brezilya"], "İstanbulspor", 180, "right", 2000000),
      createPlayer("ist-10", "Florian Loshaj", "AM", 26, ["Kosova"], "İstanbulspor", 175, "right", 2500000),
      createPlayer("ist-11", "Valon Ethemi", "ST", 27, ["Kosova"], "İstanbulspor", 187, "right", 2800000),
      createPlayer("ist-12", "Aldair", "ST", 28, ["Brezilya"], "İstanbulspor", 185, "right", 2500000),
      createPlayer("ist-13", "Alaaddin Okumuş", "LW", 25, ["Türkiye"], "İstanbulspor", 176, "left", 1800000),
      createPlayer("ist-14", "İbrahim Yılmaz", "RW", 27, ["Türkiye"], "İstanbulspor", 175, "right", 1500000),
      createPlayer("ist-15", "Okan Derici", "CM", 28, ["Türkiye"], "İstanbulspor", 179, "right", 1800000)
    ]
  },
  // Samsunspor
  {
    updatedAt: getISOString(),
    id: "samsunspor",
    players: [
      createPlayer("sam-1", "Özgür Özkaya", "GK", 30, ["Türkiye"], "Samsunspor", 188, "right", 2500000),
      createPlayer("sam-2", "Nusret Pekdemir", "GK", 25, ["Türkiye"], "Samsunspor", 186, "right", 900000),
      createPlayer("sam-3", "Yasin Öztekin", "CB", 37, ["Türkiye"], "Samsunspor", 185, "right", 1000000),
      createPlayer("sam-4", "Landry Dimata", "CB", 26, ["Belçika"], "Samsunspor", 187, "right", 2200000),
      createPlayer("sam-5", "Yasin Öztekin", "LB", 37, ["Türkiye"], "Samsunspor", 177, "left", 1000000),
      createPlayer("sam-6", "Ahmet Sagat", "RB", 28, ["Türkiye"], "Samsunspor", 178, "right", 1800000),
      createPlayer("sam-7", "Moryké Fofana", "CDM", 28, ["Fransa"], "Samsunspor", 184, "right", 2500000),
      createPlayer("sam-8", "Gaëtan Laura", "CM", 26, ["Fransa"], "Samsunspor", 181, "right", 2200000),
      createPlayer("sam-9", "Elhadj Bah", "CM", 27, ["Fransa"], "Samsunspor", 180, "right", 2000000),
      createPlayer("sam-10", "Marius Mouandilmadji", "AM", 25, ["Çad"], "Samsunspor", 175, "right", 2500000),
      createPlayer("sam-11", "Osman Çelik", "ST", 29, ["Türkiye"], "Samsunspor", 186, "right", 2200000),
      createPlayer("sam-12", "Emre Kılınç", "ST", 30, ["Türkiye"], "Samsunspor", 185, "right", 2500000),
      createPlayer("sam-13", "Taylan Antalyalı", "LW", 28, ["Türkiye"], "Samsunspor", 177, "right", 1800000),
      createPlayer("sam-14", "Yannick Bolasie", "RW", 35, ["Kongo"], "Samsunspor", 176, "right", 2000000),
      createPlayer("sam-15", "Emre Taşdemir", "CB", 29, ["Türkiye"], "Samsunspor", 183, "left", 1800000)
    ]
  },
  // Hatayspor
  {
    updatedAt: getISOString(),
    id: "hatayspor",
    players: [
      createPlayer("hat-1", "Munir", "GK", 29, ["Fas"], "Hatayspor", 189, "right", 2500000),
      createPlayer("hat-2", "Erce Kardeşler", "GK", 26, ["Türkiye"], "Hatayspor", 186, "right", 1000000),
      createPlayer("hat-3", "Faouzi Ghoulam", "CB", 33, ["Cezayir"], "Hatayspor", 187, "left", 2000000),
      createPlayer("hat-4", "Sami Fradj", "CB", 28, ["Tunus"], "Hatayspor", 185, "right", 1800000),
      createPlayer("hat-5", "Burak Bekaroğlu", "LB", 27, ["Türkiye"], "Hatayspor", 177, "left", 1500000),
      createPlayer("hat-6", "Mehdi Boussefiane", "RB", 26, ["Fas"], "Hatayspor", 178, "right", 1800000),
      createPlayer("hat-7", "Didier Lamkel Zé", "CM", 27, ["Kamerun"], "Hatayspor", 182, "right", 2500000),
      createPlayer("hat-8", "Aminu Umar", "CDM", 29, ["Nijerya"], "Hatayspor", 184, "right", 2200000),
      createPlayer("hat-9", "Rayane Aabid", "CM", 28, ["Fas"], "Hatayspor", 180, "right", 2000000),
      createPlayer("hat-10", "Ayoub El Kaabi", "ST", 30, ["Fas"], "Hatayspor", 186, "right", 3000000),
      createPlayer("hat-11", "Rigobert Song", "ST", 47, ["Kamerun"], "Hatayspor", 184, "right", 500000),
      createPlayer("hat-12", "Fisayo Dele-Bashiru", "AM", 27, ["Nijerya"], "Hatayspor", 175, "right", 2500000),
      createPlayer("hat-13", "Rúben Ribeiro", "LW", 35, ["Portekiz"], "Hatayspor", 176, "left", 1500000),
      createPlayer("hat-14", "Felipe Avenatti", "RW", 30, ["Uruguay"], "Hatayspor", 187, "right", 2200000),
      createPlayer("hat-15", "Görkem Sağlam", "CM", 26, ["Türkiye"], "Hatayspor", 179, "right", 1800000)
    ]
  },
  // Rizespor
  {
    updatedAt: getISOString(),
    id: "rizespor",
    players: [
      createPlayer("riz-1", "Gökhan Akkan", "GK", 29, ["Türkiye"], "Rizespor", 188, "right", 2500000),
      createPlayer("riz-2", "Çağlar Şahin Akbaba", "GK", 25, ["Türkiye"], "Rizespor", 186, "right", 900000),
      createPlayer("riz-3", "Emirhan Topçu", "CB", 27, ["Türkiye"], "Rizespor", 187, "right", 2000000),
      createPlayer("riz-4", "Dorian Rotariu", "CB", 29, ["Romanya"], "Rizespor", 185, "right", 2200000),
      createPlayer("riz-5", "Emirhan Topçu", "LB", 27, ["Türkiye"], "Rizespor", 177, "left", 2000000),
      createPlayer("riz-6", "Güray Vural", "RB", 32, ["Türkiye"], "Rizespor", 178, "right", 1500000),
      createPlayer("riz-7", "Alperen Uysal", "CDM", 25, ["Türkiye"], "Rizespor", 183, "right", 1800000),
      createPlayer("riz-8", "Fabiano", "CM", 30, ["Brezilya"], "Rizespor", 181, "right", 2200000),
      createPlayer("riz-9", "Altin Kryeziu", "CM", 26, ["Arnavutluk"], "Rizespor", 180, "right", 2000000),
      createPlayer("riz-10", "Miroslav Kocic", "AM", 28, ["Sırbistan"], "Rizespor", 175, "right", 2500000),
      createPlayer("riz-11", "Yasin Pehlivan", "ST", 30, ["Türkiye"], "Rizespor", 186, "right", 2200000),
      createPlayer("riz-12", "Gustavo Sauer", "ST", 30, ["Brezilya"], "Rizespor", 185, "right", 2500000),
      createPlayer("riz-13", "Emirhan Topçu", "LW", 27, ["Türkiye"], "Rizespor", 176, "left", 2000000),
      createPlayer("riz-14", "İbrahim Olawoyin", "RW", 26, ["Nijerya"], "Rizespor", 175, "right", 2200000),
      createPlayer("riz-15", "Attila Mocsi", "CB", 28, ["Macaristan"], "Rizespor", 184, "right", 2000000)
    ]
  },
  // Pendikspor
  {
    updatedAt: getISOString(),
    id: "pendikspor",
    players: [
      createPlayer("pen-1", "Murat Akça", "GK", 30, ["Türkiye"], "Pendikspor", 188, "right", 2000000),
      createPlayer("pen-2", "Ertuğrul Taşkıran", "GK", 28, ["Türkiye"], "Pendikspor", 186, "right", 1500000),
      createPlayer("pen-3", "Alpaslan Öztürk", "CB", 31, ["Türkiye"], "Pendikspor", 187, "right", 1800000),
      createPlayer("pen-4", "Emre Taşdemir", "CB", 29, ["Türkiye"], "Pendikspor", 185, "left", 1500000),
      createPlayer("pen-5", "Erdem Özgenç", "LB", 27, ["Türkiye"], "Pendikspor", 177, "left", 1300000),
      createPlayer("pen-6", "Gökhan Süzen", "RB", 28, ["Türkiye"], "Pendikspor", 178, "right", 1500000),
      createPlayer("pen-7", "Thibaut Vion", "CDM", 27, ["Fransa"], "Pendikspor", 183, "right", 2000000),
      createPlayer("pen-8", "Halil Akbunar", "CM", 30, ["Türkiye"], "Pendikspor", 181, "right", 1800000),
      createPlayer("pen-9", "Mehdi Bourabia", "CM", 32, ["Fas"], "Pendikspor", 180, "right", 2000000),
      createPlayer("pen-10", "Abdoulaye Diaby", "AM", 32, ["Mali"], "Pendikspor", 175, "right", 2200000),
      createPlayer("pen-11", "Erencan Yardımcı", "ST", 28, ["Türkiye"], "Pendikspor", 186, "right", 2000000),
      createPlayer("pen-12", "Murat Yıldırım", "ST", 30, ["Türkiye"], "Pendikspor", 185, "right", 1800000),
      createPlayer("pen-13", "Leandro Kappel", "LW", 27, ["Brezilya"], "Pendikspor", 176, "left", 2200000),
      createPlayer("pen-14", "İbrahim Yılmaz", "RW", 27, ["Türkiye"], "Pendikspor", 175, "right", 1500000),
      createPlayer("pen-15", "Emre Akbaba", "CM", 31, ["Türkiye"], "Pendikspor", 179, "right", 1800000)
    ]
  },
  // Manchester City
  {
    updatedAt: getISOString(),
    id: "manchester-city",
    players: [
      createPlayer("mci-1", "Ederson", "GK", 30, ["Brezilya"], "Manchester City", 188, "right", 50000000),
      createPlayer("mci-2", "Stefan Ortega", "GK", 31, ["Almanya"], "Manchester City", 185, "right", 5000000),
      createPlayer("mci-3", "Rúben Dias", "CB", 27, ["Portekiz"], "Manchester City", 187, "right", 80000000),
      createPlayer("mci-4", "John Stones", "CB", 30, ["İngiltere"], "Manchester City", 188, "right", 40000000),
      createPlayer("mci-5", "Nathan Aké", "LB", 29, ["Hollanda"], "Manchester City", 180, "left", 35000000),
      createPlayer("mci-6", "Kyle Walker", "RB", 34, ["İngiltere"], "Manchester City", 183, "right", 15000000),
      createPlayer("mci-7", "Rodri", "CDM", 28, ["İspanya"], "Manchester City", 191, "right", 100000000),
      createPlayer("mci-8", "Kevin De Bruyne", "CAM", 33, ["Belçika"], "Manchester City", 181, "right", 80000000),
      createPlayer("mci-9", "Bernardo Silva", "CM", 30, ["Portekiz"], "Manchester City", 173, "left", 70000000),
      createPlayer("mci-10", "Phil Foden", "CAM", 24, ["İngiltere"], "Manchester City", 171, "right", 90000000),
      createPlayer("mci-11", "Erling Haaland", "ST", 24, ["Norveç"], "Manchester City", 194, "left", 180000000)
    ]
  },
  // Arsenal
  {
    updatedAt: getISOString(),
    id: "arsenal",
    players: [
      createPlayer("ars-1", "Aaron Ramsdale", "GK", 26, ["İngiltere"], "Arsenal", 188, "right", 30000000),
      createPlayer("ars-2", "David Raya", "GK", 29, ["İspanya"], "Arsenal", 186, "right", 25000000),
      createPlayer("ars-3", "William Saliba", "CB", 23, ["Fransa"], "Arsenal", 192, "right", 50000000),
      createPlayer("ars-4", "Gabriel", "CB", 26, ["Brezilya"], "Arsenal", 190, "left", 40000000),
      createPlayer("ars-5", "Oleksandr Zinchenko", "LB", 27, ["Ukrayna"], "Arsenal", 175, "left", 35000000),
      createPlayer("ars-6", "Ben White", "RB", 27, ["İngiltere"], "Arsenal", 185, "right", 45000000),
      createPlayer("ars-7", "Declan Rice", "CDM", 25, ["İngiltere"], "Arsenal", 185, "right", 100000000),
      createPlayer("ars-8", "Martin Ødegaard", "CAM", 25, ["Norveç"], "Arsenal", 178, "left", 90000000),
      createPlayer("ars-9", "Kai Havertz", "CM", 25, ["Almanya"], "Arsenal", 193, "right", 70000000),
      createPlayer("ars-10", "Bukayo Saka", "RW", 23, ["İngiltere"], "Arsenal", 178, "left", 120000000),
      createPlayer("ars-11", "Gabriel Martinelli", "LW", 23, ["Brezilya"], "Arsenal", 178, "right", 80000000)
    ]
  },
  // Liverpool
  {
    updatedAt: getISOString(),
    id: "liverpool",
    players: [
      createPlayer("liv-1", "Alisson", "GK", 31, ["Brezilya"], "Liverpool", 191, "right", 60000000),
      createPlayer("liv-2", "Caoimhin Kelleher", "GK", 26, ["İrlanda"], "Liverpool", 188, "right", 8000000),
      createPlayer("liv-3", "Virgil van Dijk", "CB", 33, ["Hollanda"], "Liverpool", 193, "right", 50000000),
      createPlayer("liv-4", "Joël Matip", "CB", 33, ["Kamerun"], "Liverpool", 195, "right", 15000000),
      createPlayer("liv-5", "Andy Robertson", "LB", 30, ["İskoçya"], "Liverpool", 178, "left", 40000000),
      createPlayer("liv-6", "Trent Alexander-Arnold", "RB", 26, ["İngiltere"], "Liverpool", 180, "right", 70000000),
      createPlayer("liv-7", "Fabinho", "CDM", 31, ["Brezilya"], "Liverpool", 188, "right", 50000000),
      createPlayer("liv-8", "Jordan Henderson", "CM", 34, ["İngiltere"], "Liverpool", 182, "right", 20000000),
      createPlayer("liv-9", "Mohamed Salah", "RW", 32, ["Mısır"], "Liverpool", 175, "left", 100000000),
      createPlayer("liv-10", "Diogo Jota", "LW", 27, ["Portekiz"], "Liverpool", 178, "right", 45000000),
      createPlayer("liv-11", "Darwin Núñez", "ST", 25, ["Uruguay"], "Liverpool", 187, "right", 70000000)
    ]
  },
  // Manchester United
  {
    updatedAt: getISOString(),
    id: "manchester-united",
    players: [
      createPlayer("mun-1", "André Onana", "GK", 28, ["Kamerun"], "Manchester United", 190, "right", 35000000),
      createPlayer("mun-2", "Altay Bayındır", "GK", 26, ["Türkiye"], "Manchester United", 192, "right", 5000000),
      createPlayer("mun-3", "Raphaël Varane", "CB", 31, ["Fransa"], "Manchester United", 191, "right", 40000000),
      createPlayer("mun-4", "Lisandro Martínez", "CB", 26, ["Arjantin"], "Manchester United", 178, "left", 45000000),
      createPlayer("mun-5", "Luke Shaw", "LB", 29, ["İngiltere"], "Manchester United", 185, "left", 35000000),
      createPlayer("mun-6", "Diogo Dalot", "RB", 25, ["Portekiz"], "Manchester United", 183, "right", 30000000),
      createPlayer("mun-7", "Casemiro", "CDM", 32, ["Brezilya"], "Manchester United", 185, "right", 40000000),
      createPlayer("mun-8", "Bruno Fernandes", "CAM", 30, ["Portekiz"], "Manchester United", 179, "right", 70000000),
      createPlayer("mun-9", "Christian Eriksen", "CM", 32, ["Danimarka"], "Manchester United", 182, "right", 20000000),
      createPlayer("mun-10", "Marcus Rashford", "LW", 27, ["İngiltere"], "Manchester United", 180, "right", 75000000),
      createPlayer("mun-11", "Rasmus Højlund", "ST", 21, ["Danimarka"], "Manchester United", 191, "right", 65000000)
    ]
  },
  // Chelsea
  {
    updatedAt: getISOString(),
    id: "chelsea",
    players: [
      createPlayer("che-1", "Robert Sánchez", "GK", 27, ["İspanya"], "Chelsea", 197, "right", 25000000),
      createPlayer("che-2", "Djordje Petrović", "GK", 24, ["Sırbistan"], "Chelsea", 194, "right", 15000000),
      createPlayer("che-3", "Thiago Silva", "CB", 40, ["Brezilya"], "Chelsea", 183, "right", 8000000),
      createPlayer("che-4", "Axel Disasi", "CB", 26, ["Fransa"], "Chelsea", 190, "right", 35000000),
      createPlayer("che-5", "Ben Chilwell", "LB", 28, ["İngiltere"], "Chelsea", 178, "left", 35000000),
      createPlayer("che-6", "Reece James", "RB", 25, ["İngiltere"], "Chelsea", 182, "right", 50000000),
      createPlayer("che-7", "Moisés Caicedo", "CDM", 23, ["Ekvador"], "Chelsea", 178, "right", 80000000),
      createPlayer("che-8", "Enzo Fernández", "CM", 23, ["Arjantin"], "Chelsea", 178, "right", 70000000),
      createPlayer("che-9", "Cole Palmer", "CAM", 22, ["İngiltere"], "Chelsea", 185, "left", 40000000),
      createPlayer("che-10", "Raheem Sterling", "LW", 30, ["İngiltere"], "Chelsea", 170, "right", 40000000),
      createPlayer("che-11", "Nicolas Jackson", "ST", 23, ["Senegal"], "Chelsea", 185, "right", 30000000)
    ]
  },
  // Real Madrid
  {
    updatedAt: getISOString(),
    id: "real-madrid",
    players: [
      createPlayer("rma-1", "Thibaut Courtois", "GK", 32, ["Belçika"], "Real Madrid", 199, "right", 40000000),
      createPlayer("rma-2", "Andriy Lunin", "GK", 25, ["Ukrayna"], "Real Madrid", 192, "right", 5000000),
      createPlayer("rma-3", "David Alaba", "CB", 32, ["Avusturya"], "Real Madrid", 180, "left", 45000000),
      createPlayer("rma-4", "Éder Militão", "CB", 26, ["Brezilya"], "Real Madrid", 186, "right", 70000000),
      createPlayer("rma-5", "Ferland Mendy", "LB", 29, ["Fransa"], "Real Madrid", 180, "left", 25000000),
      createPlayer("rma-6", "Dani Carvajal", "RB", 32, ["İspanya"], "Real Madrid", 173, "right", 15000000),
      createPlayer("rma-7", "Aurélien Tchouaméni", "CDM", 24, ["Fransa"], "Real Madrid", 187, "right", 90000000),
      createPlayer("rma-8", "Luka Modrić", "CM", 39, ["Hırvatistan"], "Real Madrid", 172, "right", 10000000),
      createPlayer("rma-9", "Toni Kroos", "CM", 34, ["Almanya"], "Real Madrid", 183, "left", 12000000),
      createPlayer("rma-10", "Fede Valverde", "CM", 26, ["Uruguay"], "Real Madrid", 182, "right", 90000000),
      createPlayer("rma-11", "Vinícius Jr.", "LW", 24, ["Brezilya"], "Real Madrid", 176, "right", 150000000)
    ]
  },
  // Barcelona
  {
    updatedAt: getISOString(),
    id: "barcelona",
    players: [
      createPlayer("bar-1", "Marc-André ter Stegen", "GK", 32, ["Almanya"], "Barcelona", 187, "right", 40000000),
      createPlayer("bar-2", "Iñaki Peña", "GK", 25, ["İspanya"], "Barcelona", 188, "right", 8000000),
      createPlayer("bar-3", "Ronald Araújo", "CB", 25, ["Uruguay"], "Barcelona", 191, "right", 70000000),
      createPlayer("bar-4", "Jules Koundé", "CB", 26, ["Fransa"], "Barcelona", 178, "right", 60000000),
      createPlayer("bar-5", "Alejandro Balde", "LB", 21, ["İspanya"], "Barcelona", 175, "left", 80000000),
      createPlayer("bar-6", "João Cancelo", "RB", 30, ["Portekiz"], "Barcelona", 182, "right", 35000000),
      createPlayer("bar-7", "Pedri", "CM", 22, ["İspanya"], "Barcelona", 174, "left", 100000000),
      createPlayer("bar-8", "Gavi", "CM", 20, ["İspanya"], "Barcelona", 173, "left", 90000000),
      createPlayer("bar-9", "Frenkie de Jong", "CM", 27, ["Hollanda"], "Barcelona", 180, "right", 70000000),
      createPlayer("bar-10", "Robert Lewandowski", "ST", 36, ["Polonya"], "Barcelona", 185, "right", 30000000),
      createPlayer("bar-11", "Lamine Yamal", "RW", 17, ["İspanya"], "Barcelona", 180, "left", 75000000)
    ]
  },
  // Atlético Madrid
  {
    updatedAt: getISOString(),
    id: "atletico-madrid",
    players: [
      createPlayer("atm-1", "Jan Oblak", "GK", 31, ["Slovenya"], "Atlético Madrid", 188, "right", 45000000),
      createPlayer("atm-2", "Ivo Grbić", "GK", 28, ["Hırvatistan"], "Atlético Madrid", 193, "right", 5000000),
      createPlayer("atm-3", "José Giménez", "CB", 29, ["Uruguay"], "Atlético Madrid", 185, "right", 40000000),
      createPlayer("atm-4", "Stefan Savić", "CB", 33, ["Karadağ"], "Atlético Madrid", 187, "right", 15000000),
      createPlayer("atm-5", "Reinildo Mandava", "LB", 30, ["Mozambik"], "Atlético Madrid", 178, "left", 20000000),
      createPlayer("atm-6", "Nahuel Molina", "RB", 26, ["Arjantin"], "Atlético Madrid", 175, "right", 35000000),
      createPlayer("atm-7", "Rodrigo de Paul", "CM", 30, ["Arjantin"], "Atlético Madrid", 180, "right", 40000000),
      createPlayer("atm-8", "Koke", "CM", 32, ["İspanya"], "Atlético Madrid", 176, "right", 20000000),
      createPlayer("atm-9", "Saúl Ñíguez", "CM", 29, ["İspanya"], "Atlético Madrid", 184, "left", 30000000),
      createPlayer("atm-10", "Antoine Griezmann", "ST", 33, ["Fransa"], "Atlético Madrid", 176, "right", 35000000),
      createPlayer("atm-11", "Álvaro Morata", "ST", 31, ["İspanya"], "Atlético Madrid", 190, "right", 25000000)
    ]
  },
  // Sevilla
  {
    updatedAt: getISOString(),
    id: "sevilla",
    players: [
      createPlayer("sev-1", "Yassine Bounou", "GK", 33, ["Fas"], "Sevilla", 192, "right", 20000000),
      createPlayer("sev-2", "Marko Dmitrović", "GK", 32, ["Sırbistan"], "Sevilla", 192, "right", 8000000),
      createPlayer("sev-3", "Sergio Ramos", "CB", 38, ["İspanya"], "Sevilla", 184, "right", 5000000),
      createPlayer("sev-4", "Loïc Badé", "CB", 24, ["Fransa"], "Sevilla", 190, "right", 15000000),
      createPlayer("sev-5", "Marcos Acuña", "LB", 33, ["Arjantin"], "Sevilla", 172, "left", 12000000),
      createPlayer("sev-6", "Jesús Navas", "RB", 39, ["İspanya"], "Sevilla", 172, "right", 2000000),
      createPlayer("sev-7", "Fernando", "CDM", 37, ["Brezilya"], "Sevilla", 183, "right", 5000000),
      createPlayer("sev-8", "Joan Jordán", "CM", 30, ["İspanya"], "Sevilla", 184, "right", 15000000),
      createPlayer("sev-9", "Iván Rakitić", "CM", 36, ["Hırvatistan"], "Sevilla", 184, "right", 8000000),
      createPlayer("sev-10", "Youssef En-Nesyri", "ST", 27, ["Fas"], "Sevilla", 189, "right", 30000000),
      createPlayer("sev-11", "Lucas Ocampos", "RW", 30, ["Arjantin"], "Sevilla", 187, "right", 20000000)
    ]
  },
  // Real Sociedad
  {
    updatedAt: getISOString(),
    id: "real-sociedad",
    players: [
      createPlayer("rso-1", "Álex Remiro", "GK", 29, ["İspanya"], "Real Sociedad", 189, "right", 18000000),
      createPlayer("rso-2", "Unai Marrero", "GK", 27, ["İspanya"], "Real Sociedad", 188, "right", 3000000),
      createPlayer("rso-3", "Robin Le Normand", "CB", 28, ["İspanya"], "Real Sociedad", 187, "right", 25000000),
      createPlayer("rso-4", "Igor Zubeldia", "CB", 27, ["İspanya"], "Real Sociedad", 182, "right", 20000000),
      createPlayer("rso-5", "Aihen Muñoz", "LB", 26, ["İspanya"], "Real Sociedad", 175, "left", 15000000),
      createPlayer("rso-6", "Hamari Traoré", "RB", 32, ["Mali"], "Real Sociedad", 175, "right", 12000000),
      createPlayer("rso-7", "Martín Zubimendi", "CDM", 25, ["İspanya"], "Real Sociedad", 183, "right", 60000000),
      createPlayer("rso-8", "Mikel Merino", "CM", 28, ["İspanya"], "Real Sociedad", 188, "right", 40000000),
      createPlayer("rso-9", "Takefusa Kubo", "RW", 23, ["Japonya"], "Real Sociedad", 173, "left", 50000000),
      createPlayer("rso-10", "Mikel Oyarzabal", "LW", 27, ["İspanya"], "Real Sociedad", 181, "right", 45000000),
      createPlayer("rso-11", "Alexander Sørloth", "ST", 29, ["Norveç"], "Real Sociedad", 195, "right", 35000000)
    ]
  },
  // Juventus
  {
    updatedAt: getISOString(),
    id: "juventus",
    players: [
      createPlayer("juv-1", "Wojciech Szczęsny", "GK", 34, ["Polonya"], "Juventus", 196, "right", 15000000),
      createPlayer("juv-2", "Mattia Perin", "GK", 31, ["İtalya"], "Juventus", 188, "right", 8000000),
      createPlayer("juv-3", "Gleison Bremer", "CB", 27, ["Brezilya"], "Juventus", 188, "right", 50000000),
      createPlayer("juv-4", "Danilo", "CB", 33, ["Brezilya"], "Juventus", 184, "right", 20000000),
      createPlayer("juv-5", "Alex Sandro", "LB", 34, ["Brezilya"], "Juventus", 181, "left", 10000000),
      createPlayer("juv-6", "Juan Cuadrado", "RB", 36, ["Kolombiya"], "Juventus", 176, "right", 5000000),
      createPlayer("juv-7", "Manuel Locatelli", "CDM", 26, ["İtalya"], "Juventus", 185, "right", 35000000),
      createPlayer("juv-8", "Paul Pogba", "CM", 31, ["Fransa"], "Juventus", 191, "right", 25000000),
      createPlayer("juv-9", "Federico Chiesa", "LW", 26, ["İtalya"], "Juventus", 175, "right", 50000000),
      createPlayer("juv-10", "Dušan Vlahović", "ST", 24, ["Sırbistan"], "Juventus", 190, "right", 70000000),
      createPlayer("juv-11", "Moise Kean", "ST", 24, ["İtalya"], "Juventus", 183, "right", 20000000)
    ]
  },
  // Inter Milan
  {
    updatedAt: getISOString(),
    id: "inter-milan",
    players: [
      createPlayer("int-1", "Yann Sommer", "GK", 35, ["İsviçre"], "Inter Milan", 183, "right", 8000000),
      createPlayer("int-2", "Emil Audero", "GK", 27, ["İtalya"], "Inter Milan", 190, "right", 10000000),
      createPlayer("int-3", "Francesco Acerbi", "CB", 36, ["İtalya"], "Inter Milan", 192, "left", 10000000),
      createPlayer("int-4", "Alessandro Bastoni", "CB", 25, ["İtalya"], "Inter Milan", 190, "left", 60000000),
      createPlayer("int-5", "Federico Dimarco", "LB", 27, ["İtalya"], "Inter Milan", 175, "left", 35000000),
      createPlayer("int-6", "Denzel Dumfries", "RB", 28, ["Hollanda"], "Inter Milan", 188, "right", 30000000),
      createPlayer("int-7", "Nicolò Barella", "CM", 27, ["İtalya"], "Inter Milan", 175, "right", 70000000),
      createPlayer("int-8", "Hakan Çalhanoğlu", "CM", 30, ["Türkiye"], "Inter Milan", 178, "right", 30000000),
      createPlayer("int-9", "Henrikh Mkhitaryan", "CAM", 35, ["Ermenistan"], "Inter Milan", 177, "right", 10000000),
      createPlayer("int-10", "Lautaro Martínez", "ST", 27, ["Arjantin"], "Inter Milan", 174, "right", 110000000),
      createPlayer("int-11", "Marcus Thuram", "ST", 27, ["Fransa"], "Inter Milan", 192, "right", 50000000)
    ]
  },
  // AC Milan
  {
    updatedAt: getISOString(),
    id: "ac-milan",
    players: [
      createPlayer("mil-1", "Mike Maignan", "GK", 29, ["Fransa"], "AC Milan", 191, "right", 45000000),
      createPlayer("mil-2", "Antonio Mirante", "GK", 41, ["İtalya"], "AC Milan", 193, "right", 500000),
      createPlayer("mil-3", "Fikayo Tomori", "CB", 26, ["İngiltere"], "AC Milan", 185, "right", 40000000),
      createPlayer("mil-4", "Simon Kjær", "CB", 35, ["Danimarka"], "AC Milan", 190, "right", 8000000),
      createPlayer("mil-5", "Theo Hernández", "LB", 26, ["Fransa"], "AC Milan", 184, "left", 60000000),
      createPlayer("mil-6", "Davide Calabria", "RB", 28, ["İtalya"], "AC Milan", 177, "right", 20000000),
      createPlayer("mil-7", "Ismaël Bennacer", "CDM", 27, ["Cezayir"], "AC Milan", 175, "right", 40000000),
      createPlayer("mil-8", "Sandro Tonali", "CM", 24, ["İtalya"], "AC Milan", 181, "right", 50000000),
      createPlayer("mil-9", "Rafael Leão", "LW", 25, ["Portekiz"], "AC Milan", 188, "right", 90000000),
      createPlayer("mil-10", "Olivier Giroud", "ST", 38, ["Fransa"], "AC Milan", 193, "right", 3000000),
      createPlayer("mil-11", "Christian Pulisic", "RW", 26, ["ABD"], "AC Milan", 178, "left", 40000000)
    ]
  },
  // Napoli
  {
    updatedAt: getISOString(),
    id: "napoli",
    players: [
      createPlayer("nap-1", "Alex Meret", "GK", 27, ["İtalya"], "Napoli", 190, "right", 20000000),
      createPlayer("nap-2", "Pierluigi Gollini", "GK", 29, ["İtalya"], "Napoli", 194, "right", 8000000),
      createPlayer("nap-3", "Amir Rrahmani", "CB", 30, ["Kosova"], "Napoli", 192, "right", 25000000),
      createPlayer("nap-4", "Juan Jesus", "CB", 33, ["Brezilya"], "Napoli", 185, "left", 8000000),
      createPlayer("nap-5", "Mário Rui", "LB", 33, ["Portekiz"], "Napoli", 170, "left", 10000000),
      createPlayer("nap-6", "Giovanni Di Lorenzo", "RB", 31, ["İtalya"], "Napoli", 183, "right", 25000000),
      createPlayer("nap-7", "Stanislav Lobotka", "CDM", 30, ["Slovakya"], "Napoli", 170, "right", 35000000),
      createPlayer("nap-8", "André-Frank Zambo Anguissa", "CM", 29, ["Kamerun"], "Napoli", 184, "right", 40000000),
      createPlayer("nap-9", "Khvicha Kvaratskhelia", "LW", 23, ["Gürcistan"], "Napoli", 183, "right", 80000000),
      createPlayer("nap-10", "Victor Osimhen", "ST", 25, ["Nijerya"], "Napoli", 186, "right", 120000000),
      createPlayer("nap-11", "Matteo Politano", "RW", 31, ["İtalya"], "Napoli", 171, "left", 15000000)
    ]
  },
  // AS Roma
  {
    updatedAt: getISOString(),
    id: "roma",
    players: [
      createPlayer("rom-1", "Rui Patrício", "GK", 36, ["Portekiz"], "AS Roma", 190, "right", 8000000),
      createPlayer("rom-2", "Mile Svilar", "GK", 25, ["Belçika"], "AS Roma", 192, "right", 5000000),
      createPlayer("rom-3", "Chris Smalling", "CB", 35, ["İngiltere"], "AS Roma", 194, "right", 10000000),
      createPlayer("rom-4", "Gianluca Mancini", "CB", 28, ["İtalya"], "AS Roma", 190, "right", 25000000),
      createPlayer("rom-5", "Leonardo Spinazzola", "LB", 31, ["İtalya"], "AS Roma", 186, "left", 15000000),
      createPlayer("rom-6", "Rick Karsdorp", "RB", 29, ["Hollanda"], "AS Roma", 185, "right", 12000000),
      createPlayer("rom-7", "Bryan Cristante", "CDM", 29, ["İtalya"], "AS Roma", 186, "right", 30000000),
      createPlayer("rom-8", "Lorenzo Pellegrini", "CM", 28, ["İtalya"], "AS Roma", 186, "right", 40000000),
      createPlayer("rom-9", "Paulo Dybala", "CAM", 31, ["Arjantin"], "AS Roma", 177, "left", 30000000),
      createPlayer("rom-10", "Romelu Lukaku", "ST", 31, ["Belçika"], "AS Roma", 191, "right", 40000000),
      createPlayer("rom-11", "Stephan El Shaarawy", "LW", 32, ["İtalya"], "AS Roma", 178, "right", 15000000)
    ]
  }
];

// ============================================
// Legacy Compatibility Helpers (for gradual migration)
// ============================================

// These can be used temporarily while updating components
export const mockLeagues = mockCompetitions.results.map(result => ({
  id: result.id,
  name: result.name,
  icon: result.continent === "Europe" ? "🇪🇺" : "🌍"
}));

export const mockTeams = mockCompetitionClubs.flatMap(competition =>
  competition.clubs.map(club => ({
    id: club.id,
    leagueId: competition.id,
    name: club.name,
    shortCode: club.name.substring(0, 3).toUpperCase()
  }))
);

export const mockAvailablePlayers: Record<string, Array<{
  id: string;
  teamId: string;
  teamName: string;
  name: string;
  position: string;
  nationality: string;
  marketValue: string;
}>> = {};

// Populate mockAvailablePlayers from mockPlayers
mockPlayers.forEach(clubData => {
  mockAvailablePlayers[clubData.id] = clubData.players.map(player => ({
    id: player.id,
    teamId: clubData.id,
    teamName: mockTeams.find(t => t.id === clubData.id)?.name || clubData.id,
    name: player.name,
    position: player.position,
    nationality: player.nationality[0] || "Unknown",
    marketValue: `€${(player.marketValue / 1000000).toFixed(1)}M`
  }));
});
