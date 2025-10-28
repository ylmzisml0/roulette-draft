export type League = {
  id: string;
  name: string;
  icon: string;
};

export const mockLeagues: League[] = [
  { id: 'superlig', name: 'Türkiye Süper Lig', icon: '🇹🇷' },
  { id: 'premierleague', name: 'Premier League', icon: '🏴' },
  { id: 'laliga', name: 'La Liga', icon: '🇪🇸' },
  { id: 'bundesliga', name: 'Bundesliga', icon: '🇩🇪' },
  { id: 'ucl', name: 'Champions League', icon: '🏆' },
  { id: 'uel', name: 'Europa League', icon: '⭐' },
];

export type Team = {
  id: string;
  leagueId: string;
  name: string;
  shortCode: string;
};

export const mockTeams: Team[] = [
  // Süper Lig
  { id: 'fenerbahce', leagueId: 'superlig', name: 'Fenerbahçe', shortCode: 'FB' },
  { id: 'galatasaray', leagueId: 'superlig', name: 'Galatasaray', shortCode: 'GS' },
  { id: 'besiktas', leagueId: 'superlig', name: 'Beşiktaş', shortCode: 'BJK' },
  { id: 'trabzonspor', leagueId: 'superlig', name: 'Trabzonspor', shortCode: 'TS' },
  { id: 'basaksehir', leagueId: 'superlig', name: 'Başakşehir', shortCode: 'BŞK' },
  { id: 'alanyaspor', leagueId: 'superlig', name: 'Alanyaspor', shortCode: 'ALA' },
  { id: 'antalyaspor', leagueId: 'superlig', name: 'Antalyaspor', shortCode: 'ANT' },
  { id: 'sivasspor', leagueId: 'superlig', name: 'Sivasspor', shortCode: 'SVS' },
  { id: 'konyaspor', leagueId: 'superlig', name: 'Konyaspor', shortCode: 'KON' },
  { id: 'adana', leagueId: 'superlig', name: 'Adana Demirspor', shortCode: 'ADS' },
  { id: 'kasimpasa', leagueId: 'superlig', name: 'Kasımpaşa', shortCode: 'KAS' },
  { id: 'gaziantep', leagueId: 'superlig', name: 'Gaziantep FK', shortCode: 'GZT' },

  // Premier League
  { id: 'manchestercity', leagueId: 'premierleague', name: 'Manchester City', shortCode: 'MCI' },
  { id: 'arsenal', leagueId: 'premierleague', name: 'Arsenal', shortCode: 'ARS' },
  { id: 'liverpool', leagueId: 'premierleague', name: 'Liverpool', shortCode: 'LIV' },
  { id: 'manutd', leagueId: 'premierleague', name: 'Manchester United', shortCode: 'MUN' },
  { id: 'chelsea', leagueId: 'premierleague', name: 'Chelsea', shortCode: 'CHE' },
  { id: 'tottenham', leagueId: 'premierleague', name: 'Tottenham', shortCode: 'TOT' },
  { id: 'newcastle', leagueId: 'premierleague', name: 'Newcastle', shortCode: 'NEW' },
  { id: 'brighton', leagueId: 'premierleague', name: 'Brighton', shortCode: 'BHA' },
  { id: 'westham', leagueId: 'premierleague', name: 'West Ham', shortCode: 'WHU' },
  { id: 'astonvilla', leagueId: 'premierleague', name: 'Aston Villa', shortCode: 'AVL' },
  { id: 'crystalpalace', leagueId: 'premierleague', name: 'Crystal Palace', shortCode: 'CRY' },
  { id: 'fulham', leagueId: 'premierleague', name: 'Fulham', shortCode: 'FUL' },

  // La Liga
  { id: 'realmadrid', leagueId: 'laliga', name: 'Real Madrid', shortCode: 'RMA' },
  { id: 'barcelona', leagueId: 'laliga', name: 'Barcelona', shortCode: 'BAR' },
  { id: 'atletico', leagueId: 'laliga', name: 'Atletico Madrid', shortCode: 'ATM' },
  { id: 'sevilla', leagueId: 'laliga', name: 'Sevilla', shortCode: 'SEV' },
  { id: 'realsociedad', leagueId: 'laliga', name: 'Real Sociedad', shortCode: 'RSO' },
  { id: 'betis', leagueId: 'laliga', name: 'Real Betis', shortCode: 'BET' },
  { id: 'valencia', leagueId: 'laliga', name: 'Valencia', shortCode: 'VAL' },
  { id: 'villareal', leagueId: 'laliga', name: 'Villarreal', shortCode: 'VIL' },
  { id: 'athletic', leagueId: 'laliga', name: 'Athletic Bilbao', shortCode: 'ATH' },
  { id: 'osasuna', leagueId: 'laliga', name: 'Osasuna', shortCode: 'OSA' },
  { id: 'mallorca', leagueId: 'laliga', name: 'Mallorca', shortCode: 'MAL' },
  { id: 'girona', leagueId: 'laliga', name: 'Girona', shortCode: 'GIR' },

  // Bundesliga
  { id: 'bayern', leagueId: 'bundesliga', name: 'Bayern Munich', shortCode: 'BAY' },
  { id: 'dortmund', leagueId: 'bundesliga', name: 'Borussia Dortmund', shortCode: 'BVB' },
  { id: 'leipzig', leagueId: 'bundesliga', name: 'RB Leipzig', shortCode: 'RBL' },
  { id: 'leverkusen', leagueId: 'bundesliga', name: 'Bayer Leverkusen', shortCode: 'B04' },
  { id: 'freiburg', leagueId: 'bundesliga', name: 'Freiburg', shortCode: 'SCF' },
  { id: 'eintracht', leagueId: 'bundesliga', name: 'Eintracht Frankfurt', shortCode: 'SGE' },
  { id: 'union', leagueId: 'bundesliga', name: 'Union Berlin', shortCode: 'FCU' },
  { id: 'wolfsburg', leagueId: 'bundesliga', name: 'Wolfsburg', shortCode: 'WOB' },
  { id: 'mainz', leagueId: 'bundesliga', name: 'Mainz', shortCode: 'M05' },
  { id: 'gladbach', leagueId: 'bundesliga', name: 'Borussia Mönchengladbach', shortCode: 'BMG' },
  { id: 'hoffenheim', leagueId: 'bundesliga', name: 'Hoffenheim', shortCode: 'TSG' },
  { id: 'bochum', leagueId: 'bundesliga', name: 'Bochum', shortCode: 'VFL' },
];

export type RealPlayer = {
  id: string;             // internal unique id, still needed for drafting logic
  teamId: string;         // internal key like "alanyaspor" or "fenerbahce"
  teamName: string;       // e.g. "Alanyaspor"
  name: string;           // e.g. "Baran Moğultay"
  position: string;       // e.g. "Left-Back"
  nationality: string;    // e.g. "Türkiye"
  marketValue: string;    // e.g. "€250k"
};

export type AvailablePlayersByTeam = Record<string, RealPlayer[]>;

export const mockAvailablePlayers: AvailablePlayersByTeam = {
  fenerbahce: [
    { id: 'fb-gk1', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Dominik Livaković', position: 'GK', nationality: 'Hırvatistan', marketValue: '€8M' },
    { id: 'fb-gk2', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'İrfan Egribayat', position: 'GK', nationality: 'Türkiye', marketValue: '€500K' },
    { id: 'fb-def1', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Ferdi Kadıoğlu', position: 'LB', nationality: 'Türkiye', marketValue: '€15M' },
    { id: 'fb-def2', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Attila Szalai', position: 'CB', nationality: 'Macaristan', marketValue: '€12M' },
    { id: 'fb-def3', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Serdar Aziz', position: 'CB', nationality: 'Türkiye', marketValue: '€3M' },
    { id: 'fb-def4', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Osayi-Samuel', position: 'RB', nationality: 'Nijerya', marketValue: '€5M' },
    { id: 'fb-mid1', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'İsmail Yüksek', position: 'CM', nationality: 'Türkiye', marketValue: '€8M' },
    { id: 'fb-mid2', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Fred', position: 'CM', nationality: 'Brezilya', marketValue: '€20M' },
    { id: 'fb-mid3', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Sebastian Szymański', position: 'CAM', nationality: 'Polonya', marketValue: '€10M' },
    { id: 'fb-mid4', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'İrfan Can Kahveci', position: 'CM', nationality: 'Türkiye', marketValue: '€6M' },
    { id: 'fb-att1', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Edin Džeko', position: 'ST', nationality: 'Bosna-Hersek', marketValue: '€2M' },
    { id: 'fb-att2', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Michy Batshuayi', position: 'ST', nationality: 'Belçika', marketValue: '€8M' },
    { id: 'fb-att3', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Joshua King', position: 'LW', nationality: 'Norveç', marketValue: '€4M' },
    { id: 'fb-att4', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Ryan Kent', position: 'RW', nationality: 'İngiltere', marketValue: '€3M' },
    { id: 'fb-att5', teamId: 'fenerbahce', teamName: 'Fenerbahçe', name: 'Cengiz Ünder', position: 'RW', nationality: 'Türkiye', marketValue: '€12M' },
  ],
  galatasaray: [
    { id: 'gs-gk1', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Fernando Muslera', position: 'GK', nationality: 'Uruguay', marketValue: '€3M' },
    { id: 'gs-gk2', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Jankat Yılmaz', position: 'GK', nationality: 'Türkiye', marketValue: '€1M' },
    { id: 'gs-def1', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Abdülkerim Bardakcı', position: 'CB', nationality: 'Türkiye', marketValue: '€5M' },
    { id: 'gs-def2', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Davinson Sánchez', position: 'CB', nationality: 'Kolombiya', marketValue: '€15M' },
    { id: 'gs-def3', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Angeliño', position: 'LB', nationality: 'İspanya', marketValue: '€8M' },
    { id: 'gs-def4', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Sacha Boey', position: 'RB', nationality: 'Fransa', marketValue: '€12M' },
    { id: 'gs-mid1', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Lucas Torreira', position: 'CDM', nationality: 'Uruguay', marketValue: '€18M' },
    { id: 'gs-mid2', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Kerem Demirbay', position: 'CM', nationality: 'Türkiye', marketValue: '€6M' },
    { id: 'gs-mid3', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Dries Mertens', position: 'CAM', nationality: 'Belçika', marketValue: '€4M' },
    { id: 'gs-mid4', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Yunus Akgün', position: 'RW', nationality: 'Türkiye', marketValue: '€8M' },
    { id: 'gs-att1', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Mauro Icardi', position: 'ST', nationality: 'Arjantin', marketValue: '€25M' },
    { id: 'gs-att2', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Wilfried Zaha', position: 'LW', nationality: 'Fildişi Sahili', marketValue: '€12M' },
    { id: 'gs-att3', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Tete', position: 'RW', nationality: 'Brezilya', marketValue: '€10M' },
    { id: 'gs-att4', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Barış Alper Yılmaz', position: 'ST', nationality: 'Türkiye', marketValue: '€4M' },
    { id: 'gs-att5', teamId: 'galatasaray', teamName: 'Galatasaray', name: 'Hakim Ziyech', position: 'CAM', nationality: 'Fas', marketValue: '€15M' },
  ],
  manchestercity: [
    { id: 'mci-gk1', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Ederson', position: 'GK', nationality: 'Brezilya', marketValue: '€50M' },
    { id: 'mci-gk2', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Stefan Ortega', position: 'GK', nationality: 'Almanya', marketValue: '€5M' },
    { id: 'mci-def1', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Rúben Dias', position: 'CB', nationality: 'Portekiz', marketValue: '€80M' },
    { id: 'mci-def2', teamId: 'manchestercity', teamName: 'Manchester City', name: 'John Stones', position: 'CB', nationality: 'İngiltere', marketValue: '€40M' },
    { id: 'mci-def3', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Nathan Aké', position: 'LB', nationality: 'Hollanda', marketValue: '€35M' },
    { id: 'mci-def4', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Kyle Walker', position: 'RB', nationality: 'İngiltere', marketValue: '€15M' },
    { id: 'mci-mid1', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Rodri', position: 'CDM', nationality: 'İspanya', marketValue: '€100M' },
    { id: 'mci-mid2', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Kevin De Bruyne', position: 'CAM', nationality: 'Belçika', marketValue: '€80M' },
    { id: 'mci-mid3', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Bernardo Silva', position: 'CM', nationality: 'Portekiz', marketValue: '€70M' },
    { id: 'mci-mid4', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Phil Foden', position: 'CAM', nationality: 'İngiltere', marketValue: '€90M' },
    { id: 'mci-att1', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Erling Haaland', position: 'ST', nationality: 'Norveç', marketValue: '€180M' },
    { id: 'mci-att2', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Jack Grealish', position: 'LW', nationality: 'İngiltere', marketValue: '€60M' },
    { id: 'mci-att3', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Jeremy Doku', position: 'RW', nationality: 'Belçika', marketValue: '€50M' },
    { id: 'mci-att4', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Julian Álvarez', position: 'ST', nationality: 'Arjantin', marketValue: '€80M' },
    { id: 'mci-att5', teamId: 'manchestercity', teamName: 'Manchester City', name: 'Cole Palmer', position: 'RW', nationality: 'İngiltere', marketValue: '€40M' },
  ],
  realmadrid: [
    { id: 'rma-gk1', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Thibaut Courtois', position: 'GK', nationality: 'Belçika', marketValue: '€40M' },
    { id: 'rma-gk2', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Andriy Lunin', position: 'GK', nationality: 'Ukrayna', marketValue: '€5M' },
    { id: 'rma-def1', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'David Alaba', position: 'CB', nationality: 'Avusturya', marketValue: '€45M' },
    { id: 'rma-def2', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Éder Militão', position: 'CB', nationality: 'Brezilya', marketValue: '€70M' },
    { id: 'rma-def3', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Ferland Mendy', position: 'LB', nationality: 'Fransa', marketValue: '€25M' },
    { id: 'rma-def4', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Dani Carvajal', position: 'RB', nationality: 'İspanya', marketValue: '€15M' },
    { id: 'rma-mid1', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Casemiro', position: 'CDM', nationality: 'Brezilya', marketValue: '€40M' },
    { id: 'rma-mid2', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Luka Modrić', position: 'CM', nationality: 'Hırvatistan', marketValue: '€10M' },
    { id: 'rma-mid3', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Toni Kroos', position: 'CM', nationality: 'Almanya', marketValue: '€12M' },
    { id: 'rma-mid4', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Fede Valverde', position: 'CM', nationality: 'Uruguay', marketValue: '€90M' },
    { id: 'rma-att1', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Karim Benzema', position: 'ST', nationality: 'Fransa', marketValue: '€25M' },
    { id: 'rma-att2', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Vinícius Jr.', position: 'LW', nationality: 'Brezilya', marketValue: '€150M' },
    { id: 'rma-att3', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Rodrygo', position: 'RW', nationality: 'Brezilya', marketValue: '€80M' },
    { id: 'rma-att4', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Marco Asensio', position: 'RW', nationality: 'İspanya', marketValue: '€20M' },
    { id: 'rma-att5', teamId: 'realmadrid', teamName: 'Real Madrid', name: 'Eden Hazard', position: 'LW', nationality: 'Belçika', marketValue: '€8M' },
  ],
  bayern: [
    { id: 'bay-gk1', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Manuel Neuer', position: 'GK', nationality: 'Almanya', marketValue: '€8M' },
    { id: 'bay-gk2', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Sven Ulreich', position: 'GK', nationality: 'Almanya', marketValue: '€2M' },
    { id: 'bay-def1', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Matthijs de Ligt', position: 'CB', nationality: 'Hollanda', marketValue: '€70M' },
    { id: 'bay-def2', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Dayot Upamecano', position: 'CB', nationality: 'Fransa', marketValue: '€60M' },
    { id: 'bay-def3', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Alphonso Davies', position: 'LB', nationality: 'Kanada', marketValue: '€70M' },
    { id: 'bay-def4', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Benjamin Pavard', position: 'RB', nationality: 'Fransa', marketValue: '€30M' },
    { id: 'bay-mid1', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Joshua Kimmich', position: 'CDM', nationality: 'Almanya', marketValue: '€80M' },
    { id: 'bay-mid2', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Leon Goretzka', position: 'CM', nationality: 'Almanya', marketValue: '€65M' },
    { id: 'bay-mid3', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Jamal Musiala', position: 'CAM', nationality: 'Almanya', marketValue: '€110M' },
    { id: 'bay-mid4', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Thomas Müller', position: 'CAM', nationality: 'Almanya', marketValue: '€8M' },
    { id: 'bay-att1', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Robert Lewandowski', position: 'ST', nationality: 'Polonya', marketValue: '€30M' },
    { id: 'bay-att2', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Kingsley Coman', position: 'LW', nationality: 'Fransa', marketValue: '€60M' },
    { id: 'bay-att3', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Serge Gnabry', position: 'RW', nationality: 'Almanya', marketValue: '€45M' },
    { id: 'bay-att4', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Leroy Sané', position: 'LW', nationality: 'Almanya', marketValue: '€50M' },
    { id: 'bay-att5', teamId: 'bayern', teamName: 'Bayern Munich', name: 'Sadio Mané', position: 'ST', nationality: 'Senegal', marketValue: '€25M' },
  ],
  besiktas: [
    { id: 'bjk-gk1', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Mert Günok', position: 'GK', nationality: 'Türkiye', marketValue: '€3M' },
    { id: 'bjk-gk2', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Ersin Destanoğlu', position: 'GK', nationality: 'Türkiye', marketValue: '€2M' },
    { id: 'bjk-def1', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Arthur Masuaku', position: 'LB', nationality: 'Kongo', marketValue: '€4M' },
    { id: 'bjk-def2', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Welinton', position: 'CB', nationality: 'Brezilya', marketValue: '€5M' },
    { id: 'bjk-def3', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Domagoj Vida', position: 'CB', nationality: 'Hırvatistan', marketValue: '€2M' },
    { id: 'bjk-def4', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Ridvan Yılmaz', position: 'RB', nationality: 'Türkiye', marketValue: '€8M' },
    { id: 'bjk-mid1', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Gedson Fernandes', position: 'CM', nationality: 'Portekiz', marketValue: '€12M' },
    { id: 'bjk-mid2', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Salih Uçan', position: 'CM', nationality: 'Türkiye', marketValue: '€4M' },
    { id: 'bjk-mid3', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Alex Teixeira', position: 'CAM', nationality: 'Brezilya', marketValue: '€6M' },
    { id: 'bjk-mid4', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Atiba Hutchinson', position: 'CDM', nationality: 'Kanada', marketValue: '€1M' },
    { id: 'bjk-att1', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Cenk Tosun', position: 'ST', nationality: 'Türkiye', marketValue: '€3M' },
    { id: 'bjk-att2', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Vincent Aboubakar', position: 'ST', nationality: 'Kamerun', marketValue: '€8M' },
    { id: 'bjk-att3', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Rachid Ghezzal', position: 'RW', nationality: 'Cezayir', marketValue: '€5M' },
    { id: 'bjk-att4', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Nkodou', position: 'LW', nationality: 'Fransa', marketValue: '€4M' },
    { id: 'bjk-att5', teamId: 'besiktas', teamName: 'Beşiktaş', name: 'Larin', position: 'ST', nationality: 'Kanada', marketValue: '€6M' },
  ],
  trabzonspor: [
    { id: 'ts-gk1', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Uğurcan Çakır', position: 'GK', nationality: 'Türkiye', marketValue: '€8M' },
    { id: 'ts-gk2', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Onurcan Piri', position: 'GK', nationality: 'Türkiye', marketValue: '€1M' },
    { id: 'ts-def1', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Marc Bartra', position: 'CB', nationality: 'İspanya', marketValue: '€3M' },
    { id: 'ts-def2', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Stefano Denswil', position: 'CB', nationality: 'Belçika', marketValue: '€2M' },
    { id: 'ts-def3', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Eren Elmalı', position: 'LB', nationality: 'Türkiye', marketValue: '€4M' },
    { id: 'ts-def4', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Petros', position: 'RB', nationality: 'Yunanistan', marketValue: '€3M' },
    { id: 'ts-mid1', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Abdülkadir Ömür', position: 'CM', nationality: 'Türkiye', marketValue: '€6M' },
    { id: 'ts-mid2', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Manolis Siopis', position: 'CDM', nationality: 'Yunanistan', marketValue: '€4M' },
    { id: 'ts-mid3', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Edin Višća', position: 'CAM', nationality: 'Bosna-Hersek', marketValue: '€5M' },
    { id: 'ts-mid4', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Yusuf Sarı', position: 'CM', nationality: 'Türkiye', marketValue: '€3M' },
    { id: 'ts-att1', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Maxi Gómez', position: 'ST', nationality: 'Uruguay', marketValue: '€8M' },
    { id: 'ts-att2', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Djaniny', position: 'ST', nationality: 'Yeşil Burun Adaları', marketValue: '€6M' },
    { id: 'ts-att3', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Anastasios Bakasetas', position: 'CAM', nationality: 'Yunanistan', marketValue: '€4M' },
    { id: 'ts-att4', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Marek Hamšík', position: 'CM', nationality: 'Slovakya', marketValue: '€2M' },
    { id: 'ts-att5', teamId: 'trabzonspor', teamName: 'Trabzonspor', name: 'Anthony Nwakaeme', position: 'LW', nationality: 'Nijerya', marketValue: '€5M' },
  ],
  arsenal: [
    { id: 'ars-gk1', teamId: 'arsenal', teamName: 'Arsenal', name: 'Aaron Ramsdale', position: 'GK', nationality: 'İngiltere', marketValue: '€30M' },
    { id: 'ars-gk2', teamId: 'arsenal', teamName: 'Arsenal', name: 'David Raya', position: 'GK', nationality: 'İspanya', marketValue: '€25M' },
    { id: 'ars-def1', teamId: 'arsenal', teamName: 'Arsenal', name: 'William Saliba', position: 'CB', nationality: 'Fransa', marketValue: '€50M' },
    { id: 'ars-def2', teamId: 'arsenal', teamName: 'Arsenal', name: 'Gabriel', position: 'CB', nationality: 'Brezilya', marketValue: '€40M' },
    { id: 'ars-def3', teamId: 'arsenal', teamName: 'Arsenal', name: 'Oleksandr Zinchenko', position: 'LB', nationality: 'Ukrayna', marketValue: '€35M' },
    { id: 'ars-def4', teamId: 'arsenal', teamName: 'Arsenal', name: 'Ben White', position: 'RB', nationality: 'İngiltere', marketValue: '€45M' },
    { id: 'ars-mid1', teamId: 'arsenal', teamName: 'Arsenal', name: 'Declan Rice', position: 'CDM', nationality: 'İngiltere', marketValue: '€100M' },
    { id: 'ars-mid2', teamId: 'arsenal', teamName: 'Arsenal', name: 'Martin Ødegaard', position: 'CAM', nationality: 'Norveç', marketValue: '€90M' },
    { id: 'ars-mid3', teamId: 'arsenal', teamName: 'Arsenal', name: 'Kai Havertz', position: 'CM', nationality: 'Almanya', marketValue: '€70M' },
    { id: 'ars-mid4', teamId: 'arsenal', teamName: 'Arsenal', name: 'Jorginho', position: 'CDM', nationality: 'İtalya', marketValue: '€15M' },
    { id: 'ars-att1', teamId: 'arsenal', teamName: 'Arsenal', name: 'Gabriel Jesus', position: 'ST', nationality: 'Brezilya', marketValue: '€60M' },
    { id: 'ars-att2', teamId: 'arsenal', teamName: 'Arsenal', name: 'Bukayo Saka', position: 'RW', nationality: 'İngiltere', marketValue: '€120M' },
    { id: 'ars-att3', teamId: 'arsenal', teamName: 'Arsenal', name: 'Gabriel Martinelli', position: 'LW', nationality: 'Brezilya', marketValue: '€80M' },
    { id: 'ars-att4', teamId: 'arsenal', teamName: 'Arsenal', name: 'Eddie Nketiah', position: 'ST', nationality: 'İngiltere', marketValue: '€25M' },
    { id: 'ars-att5', teamId: 'arsenal', teamName: 'Arsenal', name: 'Leandro Trossard', position: 'LW', nationality: 'Belçika', marketValue: '€30M' },
  ],
  liverpool: [
    { id: 'liv-gk1', teamId: 'liverpool', teamName: 'Liverpool', name: 'Alisson', position: 'GK', nationality: 'Brezilya', marketValue: '€60M' },
    { id: 'liv-gk2', teamId: 'liverpool', teamName: 'Liverpool', name: 'Caoimhin Kelleher', position: 'GK', nationality: 'İrlanda', marketValue: '€8M' },
    { id: 'liv-def1', teamId: 'liverpool', teamName: 'Liverpool', name: 'Virgil van Dijk', position: 'CB', nationality: 'Hollanda', marketValue: '€50M' },
    { id: 'liv-def2', teamId: 'liverpool', teamName: 'Liverpool', name: 'Joël Matip', position: 'CB', nationality: 'Kamerun', marketValue: '€15M' },
    { id: 'liv-def3', teamId: 'liverpool', teamName: 'Liverpool', name: 'Andy Robertson', position: 'LB', nationality: 'İskoçya', marketValue: '€40M' },
    { id: 'liv-def4', teamId: 'liverpool', teamName: 'Liverpool', name: 'Trent Alexander-Arnold', position: 'RB', nationality: 'İngiltere', marketValue: '€70M' },
    { id: 'liv-mid1', teamId: 'liverpool', teamName: 'Liverpool', name: 'Fabinho', position: 'CDM', nationality: 'Brezilya', marketValue: '€50M' },
    { id: 'liv-mid2', teamId: 'liverpool', teamName: 'Liverpool', name: 'Jordan Henderson', position: 'CM', nationality: 'İngiltere', marketValue: '€20M' },
    { id: 'liv-mid3', teamId: 'liverpool', teamName: 'Liverpool', name: 'Thiago', position: 'CM', nationality: 'İspanya', marketValue: '€15M' },
    { id: 'liv-mid4', teamId: 'liverpool', teamName: 'Liverpool', name: 'Curtis Jones', position: 'CM', nationality: 'İngiltere', marketValue: '€25M' },
    { id: 'liv-att1', teamId: 'liverpool', teamName: 'Liverpool', name: 'Mohamed Salah', position: 'RW', nationality: 'Mısır', marketValue: '€100M' },
    { id: 'liv-att2', teamId: 'liverpool', teamName: 'Liverpool', name: 'Sadio Mané', position: 'LW', nationality: 'Senegal', marketValue: '€30M' },
    { id: 'liv-att3', teamId: 'liverpool', teamName: 'Liverpool', name: 'Roberto Firmino', position: 'ST', nationality: 'Brezilya', marketValue: '€25M' },
    { id: 'liv-att4', teamId: 'liverpool', teamName: 'Liverpool', name: 'Diogo Jota', position: 'LW', nationality: 'Portekiz', marketValue: '€45M' },
    { id: 'liv-att5', teamId: 'liverpool', teamName: 'Liverpool', name: 'Darwin Núñez', position: 'ST', nationality: 'Uruguay', marketValue: '€70M' },
  ],
};
