import { create } from 'zustand';
import { mockLeagues, mockTeams, mockAvailablePlayers } from '../data/mockData';

export type FormationPreset = '4-3-3' | '4-4-2' | '3-5-2' | '4-2-3-1' | '4-1-4-1' | '5-3-2' | '5-2-3' | '4-5-1';

export type DraftPhase = 'spin' | 'spinResult' | 'choosePlayer' | 'chooseSlot' | 'confirm';

export type PitchSlot = {
  slotId: string;
  xPct: number;
  yPct: number;
};

export type PlayerSquad = {
  id: string;
  name: string;
  formation: FormationPreset;
  players: Record<string, string>; // slotId -> playerId
  bench: string[]; // playerIds
};

export type GameState = {
  // League & Team Selection
  selectedLeagues: string[];
  selectedTeams: string[];
  
  // Squad Configuration
  squads: PlayerSquad[];
  
  // Draft State
  draftPhase: DraftPhase;
  currentTurnIndex: number;
  spinResult: { teamId: string; teamName: string } | null;
  draftCandidate: string | null; // playerId
  selectedSlot: string | null; // slotId
  
  // Available Players Pool
  availablePlayers: Record<string, string[]>; // teamId -> playerIds
  
  // UI State
  isSquadOverviewOpen: boolean;
  isFormationModalOpen: boolean;
  formationModalSquadIndex: number | null;
};

export const formationLayouts: Record<FormationPreset, PitchSlot[]> = {
  '4-3-3': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LB', xPct: 25, yPct: 75 },
    { slotId: 'LCB', xPct: 40, yPct: 75 },
    { slotId: 'RCB', xPct: 60, yPct: 75 },
    { slotId: 'RB', xPct: 75, yPct: 75 },
    { slotId: 'LCM', xPct: 30, yPct: 50 },
    { slotId: 'CM', xPct: 50, yPct: 50 },
    { slotId: 'RCM', xPct: 70, yPct: 50 },
    { slotId: 'LW', xPct: 25, yPct: 25 },
    { slotId: 'ST', xPct: 50, yPct: 25 },
    { slotId: 'RW', xPct: 75, yPct: 25 },
  ],
  '4-4-2': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LB', xPct: 25, yPct: 75 },
    { slotId: 'LCB', xPct: 40, yPct: 75 },
    { slotId: 'RCB', xPct: 60, yPct: 75 },
    { slotId: 'RB', xPct: 75, yPct: 75 },
    { slotId: 'LM', xPct: 25, yPct: 50 },
    { slotId: 'LCM', xPct: 40, yPct: 50 },
    { slotId: 'RCM', xPct: 60, yPct: 50 },
    { slotId: 'RM', xPct: 75, yPct: 50 },
    { slotId: 'LST', xPct: 40, yPct: 25 },
    { slotId: 'RST', xPct: 60, yPct: 25 },
  ],
  '3-5-2': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LCB', xPct: 30, yPct: 75 },
    { slotId: 'CB', xPct: 50, yPct: 75 },
    { slotId: 'RCB', xPct: 70, yPct: 75 },
    { slotId: 'LWB', xPct: 20, yPct: 50 },
    { slotId: 'CDM', xPct: 50, yPct: 60 },
    { slotId: 'RWB', xPct: 80, yPct: 50 },
    { slotId: 'LCM', xPct: 35, yPct: 40 },
    { slotId: 'RCM', xPct: 65, yPct: 40 },
    { slotId: 'LST', xPct: 40, yPct: 25 },
    { slotId: 'RST', xPct: 60, yPct: 25 },
  ],
  '4-2-3-1': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LB', xPct: 25, yPct: 75 },
    { slotId: 'LCB', xPct: 40, yPct: 75 },
    { slotId: 'RCB', xPct: 60, yPct: 75 },
    { slotId: 'RB', xPct: 75, yPct: 75 },
    { slotId: 'LCDM', xPct: 40, yPct: 60 },
    { slotId: 'RCDM', xPct: 60, yPct: 60 },
    { slotId: 'LW', xPct: 25, yPct: 40 },
    { slotId: 'CAM', xPct: 50, yPct: 40 },
    { slotId: 'RW', xPct: 75, yPct: 40 },
    { slotId: 'ST', xPct: 50, yPct: 25 },
  ],
  '4-1-4-1': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LB', xPct: 25, yPct: 75 },
    { slotId: 'LCB', xPct: 40, yPct: 75 },
    { slotId: 'RCB', xPct: 60, yPct: 75 },
    { slotId: 'RB', xPct: 75, yPct: 75 },
    { slotId: 'CDM', xPct: 50, yPct: 60 },
    { slotId: 'LM', xPct: 25, yPct: 45 },
    { slotId: 'LCM', xPct: 40, yPct: 45 },
    { slotId: 'RCM', xPct: 60, yPct: 45 },
    { slotId: 'RM', xPct: 75, yPct: 45 },
    { slotId: 'ST', xPct: 50, yPct: 25 },
  ],
  '5-3-2': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LWB', xPct: 20, yPct: 75 },
    { slotId: 'LCB', xPct: 35, yPct: 75 },
    { slotId: 'CB', xPct: 50, yPct: 75 },
    { slotId: 'RCB', xPct: 65, yPct: 75 },
    { slotId: 'RWB', xPct: 80, yPct: 75 },
    { slotId: 'LCM', xPct: 35, yPct: 50 },
    { slotId: 'CM', xPct: 50, yPct: 50 },
    { slotId: 'RCM', xPct: 65, yPct: 50 },
    { slotId: 'LST', xPct: 40, yPct: 25 },
    { slotId: 'RST', xPct: 60, yPct: 25 },
  ],
  '5-2-3': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LWB', xPct: 20, yPct: 75 },
    { slotId: 'LCB', xPct: 35, yPct: 75 },
    { slotId: 'CB', xPct: 50, yPct: 75 },
    { slotId: 'RCB', xPct: 65, yPct: 75 },
    { slotId: 'RWB', xPct: 80, yPct: 75 },
    { slotId: 'LCM', xPct: 40, yPct: 50 },
    { slotId: 'RCM', xPct: 60, yPct: 50 },
    { slotId: 'LW', xPct: 25, yPct: 25 },
    { slotId: 'ST', xPct: 50, yPct: 25 },
    { slotId: 'RW', xPct: 75, yPct: 25 },
  ],
  '4-5-1': [
    { slotId: 'GK', xPct: 50, yPct: 90 },
    { slotId: 'LB', xPct: 25, yPct: 75 },
    { slotId: 'LCB', xPct: 40, yPct: 75 },
    { slotId: 'RCB', xPct: 60, yPct: 75 },
    { slotId: 'RB', xPct: 75, yPct: 75 },
    { slotId: 'LM', xPct: 25, yPct: 50 },
    { slotId: 'LCM', xPct: 40, yPct: 50 },
    { slotId: 'CM', xPct: 50, yPct: 50 },
    { slotId: 'RCM', xPct: 60, yPct: 50 },
    { slotId: 'RM', xPct: 75, yPct: 50 },
    { slotId: 'ST', xPct: 50, yPct: 25 },
  ],
};

const initialState: GameState = {
  selectedLeagues: [],
  selectedTeams: [],
  squads: [],
  draftPhase: 'spin',
  currentTurnIndex: 0,
  spinResult: null,
  draftCandidate: null,
  selectedSlot: null,
  availablePlayers: {},
  isSquadOverviewOpen: false,
  isFormationModalOpen: false,
  formationModalSquadIndex: null,
};

export const useGameStore = create<GameState & {
  // Actions
  toggleLeague: (id: string) => void;
  toggleTeam: (teamId: string) => void;
  initSquads: (configs: { name: string; formation: FormationPreset }[]) => void;
  hydrateRostersFromMock: () => void;
  finishSpin: (teamId: string, teamName: string) => void;
  continueAfterSpinResult: () => void;
  chooseDraftCandidate: (playerId: string) => void;
  selectSlotForCandidate: (slotId: string) => void;
  confirmPick: () => void;
  changeFormationForSquad: (squadIndex: number, newFormation: FormationPreset) => void;
  swapPlayers: (squadIndex: number, fromSlotId: string, toSlotId: string) => void;
  openSquadOverview: () => void;
  closeSquadOverview: () => void;
  openFormationModal: (squadIndex: number) => void;
  closeFormationModal: () => void;
  resetGame: () => void;
}>((set, get) => ({
  ...initialState,

  toggleLeague: (id: string) => {
    set((state) => ({
      selectedLeagues: state.selectedLeagues.includes(id)
        ? state.selectedLeagues.filter(leagueId => leagueId !== id)
        : [...state.selectedLeagues, id],
    }));
  },

  toggleTeam: (teamId: string) => {
    set((state) => ({
      selectedTeams: state.selectedTeams.includes(teamId)
        ? state.selectedTeams.filter(id => id !== teamId)
        : [...state.selectedTeams, teamId],
    }));
  },

  initSquads: (configs: { name: string; formation: FormationPreset }[]) => {
    const squads: PlayerSquad[] = configs.map((config, index) => ({
      id: `squad-${index}`,
      name: config.name,
      formation: config.formation,
      players: {},
      bench: [],
    }));
    set({ squads });
  },

  hydrateRostersFromMock: () => {
    const state = get();
    const availablePlayers: Record<string, string[]> = {};
    
    state.selectedTeams.forEach(teamId => {
      const teamPlayers = mockAvailablePlayers[teamId] || [];
      availablePlayers[teamId] = teamPlayers.map(player => player.id);
    });
    
    set({ availablePlayers });
  },

  finishSpin: (teamId: string, teamName: string) => {
    set({
      draftPhase: 'spinResult',
      spinResult: { teamId, teamName },
    });
  },

  continueAfterSpinResult: () => {
    set({
      draftPhase: 'choosePlayer',
      // Don't clear spinResult here - we need it for currentTeamId
    });
  },

  chooseDraftCandidate: (playerId: string) => {
    set({
      draftPhase: 'chooseSlot',
      draftCandidate: playerId,
    });
  },

  selectSlotForCandidate: (slotId: string) => {
    set({
      selectedSlot: slotId,
    });
  },

  confirmPick: () => {
    const state = get();
    const { draftCandidate, selectedSlot, currentTurnIndex, squads } = state;
    
    if (!draftCandidate || !selectedSlot) return;

    // Add player to squad
    const updatedSquads = [...squads];
    updatedSquads[currentTurnIndex].players[selectedSlot] = draftCandidate;

    // Remove player from available pool
    const updatedAvailablePlayers = { ...state.availablePlayers };
    const playerTeamId = Object.keys(updatedAvailablePlayers).find(teamId =>
      updatedAvailablePlayers[teamId].includes(draftCandidate)
    );
    
    if (playerTeamId) {
      updatedAvailablePlayers[playerTeamId] = updatedAvailablePlayers[playerTeamId].filter(
        id => id !== draftCandidate
      );
    }

    // Check if draft is complete
    const isDraftComplete = updatedSquads.every(squad => 
      Object.keys(squad.players).length >= 11
    );

    if (isDraftComplete) {
      set({
        draftPhase: 'spin',
        squads: updatedSquads,
        availablePlayers: updatedAvailablePlayers,
        draftCandidate: null,
        selectedSlot: null,
        spinResult: null, // Clear spin result
      });
    } else {
      // Move to next turn
      const nextTurnIndex = (currentTurnIndex + 1) % updatedSquads.length;
      set({
        draftPhase: 'spin',
        currentTurnIndex: nextTurnIndex,
        squads: updatedSquads,
        availablePlayers: updatedAvailablePlayers,
        draftCandidate: null,
        selectedSlot: null,
        spinResult: null, // Clear spin result
      });
    }
  },

  changeFormationForSquad: (squadIndex: number, newFormation: FormationPreset) => {
    set((state) => {
      const updatedSquads = [...state.squads];
      const currentSquad = updatedSquads[squadIndex];
      const oldFormationSlots = formationLayouts[currentSquad.formation];
      const newFormationSlots = formationLayouts[newFormation];
      
      // Position similarity groups
      const getPositionGroup = (slotId: string): string => {
        if (slotId === 'GK') return 'GK';
        if (slotId.includes('CB') || slotId === 'CB') return 'CB';
        if (slotId.includes('WB') || slotId === 'LB' || slotId === 'RB') return 'FB';
        if (slotId.includes('DM') || slotId === 'CDM') return 'DM';
        if (slotId.includes('CM') || slotId === 'CM' || slotId === 'LM' || slotId === 'RM') return 'CM';
        if (slotId.includes('AM') || slotId === 'CAM' || slotId === 'LW' || slotId === 'RW') return 'AM';
        if (slotId.includes('ST') || slotId === 'ST' || slotId === 'CF') return 'ST';
        return 'OTHER';
      };
      
      // Helper to calculate distance between two slots
      const calculateDistance = (slot1: PitchSlot, slot2: PitchSlot): number => {
        const dx = slot1.xPct - slot2.xPct;
        const dy = slot1.yPct - slot2.yPct;
        return Math.sqrt(dx * dx + dy * dy);
      };
      
      // Map old players to new slots intelligently
      const updatedPlayers: Record<string, string> = {};
      const usedNewSlots = new Set<string>();
      const playersToMap: Array<{ oldSlot: PitchSlot; playerId: string }> = [];
      
      // First pass: exact slotId match
      Object.entries(currentSquad.players).forEach(([oldSlotId, playerId]) => {
        const oldSlot = oldFormationSlots.find(s => s.slotId === oldSlotId);
        if (!oldSlot) return;
        
        const exactMatch = newFormationSlots.find(s => s.slotId === oldSlotId && !usedNewSlots.has(s.slotId));
        if (exactMatch) {
          updatedPlayers[exactMatch.slotId] = playerId;
          usedNewSlots.add(exactMatch.slotId);
        } else {
          playersToMap.push({ oldSlot, playerId });
        }
      });
      
      // Second pass: map by position group similarity
      playersToMap.forEach(({ oldSlot, playerId }) => {
        const oldGroup = getPositionGroup(oldSlot.slotId);
        const candidates = newFormationSlots
          .filter(slot => !usedNewSlots.has(slot.slotId))
          .map(slot => ({
            slot,
            group: getPositionGroup(slot.slotId),
            distance: calculateDistance(oldSlot, slot),
          }))
          .filter(c => {
            // Prioritize same or similar groups
            if (oldGroup === 'GK') return c.group === 'GK';
            if (oldGroup === 'CB') return c.group === 'CB';
            if (oldGroup === 'FB') return c.group === 'FB';
            if (oldGroup === 'DM') return c.group === 'DM' || c.group === 'CM';
            if (oldGroup === 'CM') return c.group === 'CM' || c.group === 'DM';
            if (oldGroup === 'AM') return c.group === 'AM' || c.group === 'CM' || c.group === 'ST';
            if (oldGroup === 'ST') return c.group === 'ST' || c.group === 'AM';
            return true;
          })
          .sort((a, b) => {
            // Same group first, then by distance
            if (a.group === oldGroup && b.group !== oldGroup) return -1;
            if (a.group !== oldGroup && b.group === oldGroup) return 1;
            return a.distance - b.distance;
          });
        
        if (candidates.length > 0) {
          const bestMatch = candidates[0];
          updatedPlayers[bestMatch.slot.slotId] = playerId;
          usedNewSlots.add(bestMatch.slot.slotId);
        }
      });
      
      // Third pass: find any empty slot for remaining players
      playersToMap.forEach(({ oldSlot, playerId }) => {
        if (!Object.values(updatedPlayers).includes(playerId)) {
          const emptySlot = newFormationSlots.find(slot => !usedNewSlots.has(slot.slotId));
          if (emptySlot) {
            updatedPlayers[emptySlot.slotId] = playerId;
            usedNewSlots.add(emptySlot.slotId);
          }
        }
      });
      
      // Remaining players go to bench
      const playersToBench: string[] = [];
      Object.entries(currentSquad.players).forEach(([_, playerId]) => {
        if (!Object.values(updatedPlayers).includes(playerId)) {
          playersToBench.push(playerId);
        }
      });
      
      // Update formation and players
      updatedSquads[squadIndex] = {
        ...currentSquad,
        formation: newFormation,
        players: updatedPlayers,
        bench: [...currentSquad.bench, ...playersToBench],
      };
      
      return { squads: updatedSquads };
    });
  },

  swapPlayers: (squadIndex: number, fromSlotId: string, toSlotId: string) => {
    set((state) => {
      const updatedSquads = [...state.squads];
      const squad = updatedSquads[squadIndex];
      const fromPlayerId = squad.players[fromSlotId];
      const toPlayerId = squad.players[toSlotId];
      
      const updatedPlayers = { ...squad.players };
      
      if (fromPlayerId && toPlayerId) {
        // Swap both players
        updatedPlayers[fromSlotId] = toPlayerId;
        updatedPlayers[toSlotId] = fromPlayerId;
      } else if (fromPlayerId) {
        // Move player from fromSlotId to empty toSlotId
        updatedPlayers[toSlotId] = fromPlayerId;
        delete updatedPlayers[fromSlotId];
      } else if (toPlayerId) {
        // Move player from toSlotId to empty fromSlotId
        updatedPlayers[fromSlotId] = toPlayerId;
        delete updatedPlayers[toSlotId];
      }
      
      updatedSquads[squadIndex] = {
        ...squad,
        players: updatedPlayers,
      };
      
      return { squads: updatedSquads };
    });
  },

  openSquadOverview: () => {
    set({ isSquadOverviewOpen: true });
  },

  closeSquadOverview: () => {
    set({ isSquadOverviewOpen: false });
  },

  openFormationModal: (squadIndex: number) => {
    set({ 
      isFormationModalOpen: true,
      formationModalSquadIndex: squadIndex,
    });
  },

  closeFormationModal: () => {
    set({ 
      isFormationModalOpen: false,
      formationModalSquadIndex: null,
    });
  },

  resetGame: () => {
    set(initialState);
  },
}));
