import { StateCreator } from 'zustand';
import { Endorsement } from '../data/endorsements';
import { ActiveEndorsement, PlayerEndorsements } from '../types';

export interface EndorsementSlice {
  endorsements: PlayerEndorsements;
  activateEndorsement: (endorsement: Endorsement) => void;
  claimEndorsement: (endorsementId: string) => void;
  updateEndorsementProgress: () => void;
}

export const createEndorsementSlice: StateCreator<EndorsementSlice> = (set, get) => ({
  endorsements: {
    active: [],
    completed: [],
    cooldowns: {}
  },

  activateEndorsement: (endorsement: Endorsement) => {
    set((state) => {
      const newEndorsement: ActiveEndorsement = {
        id: `${endorsement.id}-${Date.now()}`,
        endorsementId: endorsement.id,
        gamesUntilClaim: endorsement.requirements.claimInterval,
        totalClaims: 0,
        lastClaimDate: new Date().toISOString()
      };

      return {
        endorsements: {
          ...state.endorsements,
          active: [...state.endorsements.active, newEndorsement]
        }
      };
    });
  },

  claimEndorsement: (endorsementId: string) => {
    set((state) => {
      const updatedActive = state.endorsements.active.map(endorsement => {
        if (endorsement.endorsementId === endorsementId) {
          return {
            ...endorsement,
            totalClaims: endorsement.totalClaims + 1,
            lastClaimDate: new Date().toISOString(),
            gamesUntilClaim: endorsement.gamesUntilClaim
          };
        }
        return endorsement;
      });

      return {
        endorsements: {
          ...state.endorsements,
          active: updatedActive
        }
      };
    });
  },

  updateEndorsementProgress: () => {
    set((state) => {
      const updatedActive = state.endorsements.active.map(endorsement => ({
        ...endorsement,
        gamesUntilClaim: Math.max(0, endorsement.gamesUntilClaim - 1)
      }));

      return {
        endorsements: {
          ...state.endorsements,
          active: updatedActive
        }
      };
    });
  }
});