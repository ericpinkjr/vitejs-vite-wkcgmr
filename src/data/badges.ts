export type BadgeTier = 'Locked' | 'Bronze' | 'Silver' | 'Gold' | 'Hall of Fame' | 'Legend';

export interface Badge {
  name: string;
  description: string;
}

export interface BadgeCategory {
  name: string;
  badges: Badge[];
}

export const badgeCategories: BadgeCategory[] = [
  {
    name: 'Outside Scoring',
    badges: [
      { name: 'Deadeye', description: 'Increases accuracy on contested shots' },
      { name: 'Limitless Range', description: 'Extends the range for making 3-pointers' },
      { name: 'Mini Marksman', description: 'Improves mid-range shooting' },
      { name: 'Set Shot Specialist', description: 'Boosts shot accuracy for set shots' },
      { name: 'Shifty Shooter', description: 'Increases accuracy for shots taken off the dribble' },
    ]
  },
  {
    name: 'Inside Scoring',
    badges: [
      { name: 'Acrobat', description: 'Enhances layup accuracy, especially for tricky shots' },
      { name: 'Putback King', description: 'Boosts putback shots after offensive rebounds' },
      { name: 'Relentless Finisher', description: 'Reduces fatigue when performing contact finishes' },
      { name: 'Post Spin Master', description: 'Increases effectiveness of post spin moves' },
      { name: 'Contact Specialist', description: 'Improves finishing through contact' },
    ]
  },
  {
    name: 'Playmaking',
    badges: [
      { name: 'Quick First Step', description: 'Increases acceleration with the ball' },
      { name: 'Dimer', description: "Boosts teammate's shot accuracy following a pass" },
      { name: 'Ankle Breaker', description: "Increases chances of breaking a defender's ankles" },
      { name: 'Needle Threader', description: 'Improves accuracy for difficult passes' },
      { name: 'Handles for Days', description: 'Reduces stamina loss for dribbling moves' },
    ]
  },
  {
    name: 'Defense',
    badges: [
      { name: 'Clamps', description: 'Enhances on-ball defense against dribbling opponents' },
      { name: 'Pick Dodger', description: 'Increases effectiveness at navigating around screens' },
      { name: 'Interceptor', description: 'Improves chances of intercepting passes' },
      { name: 'Rim Protector', description: 'Boosts shot-blocking ability' },
      { name: 'Intimidator', description: 'Reduces opponent shooting accuracy when closely guarded' },
    ]
  },
  {
    name: 'Rebounding',
    badges: [
      { name: 'Rebound Chaser', description: 'Improves ability to track down rebounds' },
      { name: 'Box Out Master', description: 'Increases effectiveness of boxing out opponents' },
      { name: 'Break Starter', description: 'Improves accuracy for outlet passes after rebounds' },
      { name: 'Glass Cleaner', description: 'Boosts success rate of rebound attempts' },
      { name: 'Second Chance Specialist', description: 'Increases shot accuracy after offensive rebounds' },
    ]
  },
  {
    name: 'General/All Around',
    badges: [
      { name: 'Floor General', description: "Provides a slight boost to teammates' offensive skills" },
      { name: 'Leader of the Pack', description: 'Adds a small boost to team morale when on the floor' },
      { name: 'Stamina Saver', description: 'Reduces stamina consumption throughout the game' },
      { name: 'Clutch Performer', description: 'Increases accuracy and effectiveness in late-game situations' },
      { name: 'Hot Streak', description: 'Slightly increases shot accuracy after making consecutive shots' },
    ]
  }
];