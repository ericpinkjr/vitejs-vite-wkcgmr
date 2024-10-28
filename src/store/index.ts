import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerState, PlayerInfo, GameResult, BadgeTier } from '../types';
import { badgeCategories } from '../data/badges';

// Initialize empty badges object with all categories
const initializeBadges = () => {
  const badges: Record<string, Record<string, BadgeTier>> = {};
  badgeCategories.forEach(category => {
    badges[category.name] = {};
    category.badges.forEach(badge => {
      badges[category.name][badge.name] = 'Locked';
    });
  });
  return badges;
};

const useStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      playerInfo: null,

      setPlayerInfo: (info: PlayerInfo) => set({ 
        playerInfo: {
          ...info,
          xp: Number(info.xp) || 0,
          badges: info.badges || initializeBadges()
        }
      }),

      updateXP: (amount: number) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          xp: Math.max(0, Number(state.playerInfo.xp || 0) + Number(amount))
        } : null
      })),

      updateFans: (amount: number) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          fanBase: Math.max(0, Number(state.playerInfo.fanBase || 0) + Number(amount))
        } : null
      })),

      updateBankBalance: (amount: number) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          bankBalance: Math.max(0, Number(state.playerInfo.bankBalance || 0) + Number(amount))
        } : null
      })),

      updateAttributes: (category: string, attribute: string, value: number, cost: number) => set((state) => {
        if (!state.playerInfo) return { playerInfo: null };
        
        const currentXP = Number(state.playerInfo.xp || 0);
        const updatedXP = Math.max(0, currentXP - Number(cost));
        
        return {
          playerInfo: {
            ...state.playerInfo,
            xp: updatedXP,
            attributes: {
              ...state.playerInfo.attributes,
              [category]: {
                ...state.playerInfo.attributes[category],
                [attribute]: Number(value)
              }
            }
          }
        };
      }),

      updateBadges: (category: string, badge: string, newTier: BadgeTier, cost: number) => set((state) => {
        if (!state.playerInfo) return { playerInfo: null };

        const currentXP = Number(state.playerInfo.xp || 0);
        const updatedXP = Math.max(0, currentXP - Number(cost));

        const currentBadges = state.playerInfo.badges || initializeBadges();

        if (!currentBadges[category]) {
          currentBadges[category] = {};
        }

        return {
          playerInfo: {
            ...state.playerInfo,
            xp: updatedXP,
            badges: {
              ...currentBadges,
              [category]: {
                ...currentBadges[category],
                [badge]: newTier
              }
            }
          }
        };
      }),

      addCompletedGame: (game: GameResult) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          completedGames: [...(state.playerInfo.completedGames || []), game],
          winStreak: game.result === 'W' ? (Number(state.playerInfo.winStreak || 0) + 1) : 0
        } : null
      })),

      updateTeamRecord: (isWin: boolean) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          teamRecord: {
            wins: Number(state.playerInfo.teamRecord?.wins || 0) + (isWin ? 1 : 0),
            losses: Number(state.playerInfo.teamRecord?.losses || 0) + (isWin ? 0 : 1)
          }
        } : null
      })),

      activateEndorsement: (endorsement) => set((state) => ({
        playerInfo: state.playerInfo ? {
          ...state.playerInfo,
          activeEndorsements: [
            ...(state.playerInfo.activeEndorsements || []),
            {
              endorsementId: endorsement.id,
              gamesRemaining: endorsement.requirements.claimInterval,
              totalClaims: 0
            }
          ]
        } : null
      })),

      claimEndorsement: (endorsement) => {
        const state = get();
        if (!state.playerInfo) return;

        const updatedXP = Number(state.playerInfo.xp) + Number(endorsement.rewards.xp);
        const updatedFans = Number(state.playerInfo.fanBase) + Number(endorsement.rewards.fans);
        const updatedBalance = Number(state.playerInfo.bankBalance) + Number(endorsement.rewards.money);

        const updatedActiveEndorsements = state.playerInfo.activeEndorsements.map(e => {
          if (e.endorsementId === endorsement.id) {
            return {
              ...e,
              gamesRemaining: endorsement.requirements.claimInterval,
              totalClaims: Number(e.totalClaims) + 1
            };
          }
          return e;
        });

        set({
          playerInfo: {
            ...state.playerInfo,
            xp: updatedXP,
            fanBase: updatedFans,
            bankBalance: updatedBalance,
            activeEndorsements: updatedActiveEndorsements
          }
        });
      },

      updateEndorsements: () => set((state) => {
        if (!state.playerInfo) return { playerInfo: null };

        const activeEndorsements = state.playerInfo.activeEndorsements || [];
        const endorsementCooldowns = state.playerInfo.endorsementCooldowns || [];

        const updatedActiveEndorsements = activeEndorsements.map(endorsement => ({
          ...endorsement,
          gamesRemaining: Math.max(0, Number(endorsement.gamesRemaining || 0) - 1)
        }));

        const updatedCooldowns = endorsementCooldowns
          .map(cooldown => ({
            ...cooldown,
            gamesRemaining: Math.max(0, Number(cooldown.gamesRemaining || 0) - 1)
          }))
          .filter(cooldown => cooldown.gamesRemaining > 0);

        return {
          playerInfo: {
            ...state.playerInfo,
            activeEndorsements: updatedActiveEndorsements,
            endorsementCooldowns: updatedCooldowns
          }
        };
      }),

      reset: () => set({ playerInfo: null })
    }),
    {
      name: 'career-companion-storage',
      version: 1
    }
  )
);

export default useStore;