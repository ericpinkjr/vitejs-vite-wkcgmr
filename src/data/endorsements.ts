export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4' | 'Tier 5';

export interface Endorsement {
  id: string;
  tier: Tier;
  name: string;
  description: string;
  rewards: {
    xp: number;
    fans: number;
    money: number;
  };
  requirements: {
    claimInterval: number;
    minFans: number;
  };
}

export const endorsements: Endorsement[] = [
  {
    id: 'local-gym',
    tier: 'Tier 1',
    name: 'Local Gym',
    description: 'Promote a local gym on social media.',
    rewards: {
      xp: 500,
      fans: 500,
      money: 250000
    },
    requirements: {
      claimInterval: 10,
      minFans: 15000
    }
  },
  {
    id: 'energy-drink-startup',
    tier: 'Tier 1',
    name: 'Energy Drink Startup',
    description: 'Endorse a small, up-and-coming energy drink company.',
    rewards: {
      xp: 600,
      fans: 750,
      money: 500000
    },
    requirements: {
      claimInterval: 15,
      minFans: 20000
    }
  },
  {
    id: 'regional-fast-food',
    tier: 'Tier 2',
    name: 'Regional Fast Food Chain',
    description: 'Partner with a regional fast food chain, promoting new products.',
    rewards: {
      xp: 1000,
      fans: 2000,
      money: 1500000
    },
    requirements: {
      claimInterval: 25,
      minFans: 30000
    }
  },
  {
    id: 'local-car-dealership',
    tier: 'Tier 2',
    name: 'Local Car Dealership',
    description: 'Collaborate with a car dealership to attract customers.',
    rewards: {
      xp: 750,
      fans: 1500,
      money: 1000000
    },
    requirements: {
      claimInterval: 20,
      minFans: 25000
    }
  },
  {
    id: 'national-energy-drink',
    tier: 'Tier 3',
    name: 'National Energy Drink',
    description: 'Represent a major energy drink brand with nationwide reach.',
    rewards: {
      xp: 1500,
      fans: 5000,
      money: 5000000
    },
    requirements: {
      claimInterval: 30,
      minFans: 50000
    }
  },
  {
    id: 'clothing-line',
    tier: 'Tier 3',
    name: 'Clothing Line',
    description: 'Endorse a trendy clothing brand.',
    rewards: {
      xp: 1200,
      fans: 4000,
      money: 3000000
    },
    requirements: {
      claimInterval: 25,
      minFans: 45000
    }
  },
  {
    id: 'footwear-premium',
    tier: 'Tier 4',
    name: 'Footwear Company (Premium Line)',
    description: 'Collaborate with a top footwear brand on select campaigns.',
    rewards: {
      xp: 2000,
      fans: 8000,
      money: 10000000
    },
    requirements: {
      claimInterval: 50,
      minFans: 100000
    }
  },
  {
    id: 'high-end-fashion',
    tier: 'Tier 4',
    name: 'High-End Fashion Brand',
    description: 'Become a face for a luxury fashion line.',
    rewards: {
      xp: 2500,
      fans: 10000,
      money: 15000000
    },
    requirements: {
      claimInterval: 60,
      minFans: 120000
    }
  },
  {
    id: 'signature-shoe',
    tier: 'Tier 5',
    name: 'Signature Shoe Deal',
    description: 'Develop a signature shoe with a renowned brand.',
    rewards: {
      xp: 5000,
      fans: 20000,
      money: 25000000
    },
    requirements: {
      claimInterval: 75,
      minFans: 200000
    }
  },
  {
    id: 'hollywood-film',
    tier: 'Tier 5',
    name: 'Hollywood Film Deal',
    description: 'Star in a high-profile film production.',
    rewards: {
      xp: 5000,
      fans: 25000,
      money: 50000000
    },
    requirements: {
      claimInterval: 100,
      minFans: 250000
    }
  }
];