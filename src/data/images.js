// Picsum.photos seeded URLs — always return an image, deterministic per seed.
const pic = (seed, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/jo-${seed}/${w}/${h}`;

// Hero uses a confirmed Unsplash landscape (Oregon-feel).
const HERO =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2200";

export const images = {
  hero: HERO,
  heroAlt: "Oregon's wilderness at golden hour.",

  candidatePortrait: pic("portrait-candidate", 1200, 1500),
  candidatePortraitAlt: "Portrait of Jade Oregon, candidate for Congress.",

  // Landscapes for sub-page headers
  craterLake: pic("crater-lake", 1800, 900),
  coast: pic("oregon-coast", 1800, 900),
  forest: pic("oregon-forest", 1800, 900),
  cityPortland: pic("portland-city", 1800, 900),
  farm: pic("oregon-farm", 1800, 900),

  // Event imagery
  townHall: pic("event-town-hall", 1600, 1200),
  coffeeMeet: pic("event-coffee", 1600, 1200),
  doorKnock: pic("event-doorknock", 1600, 1200),
  veteransRoundtable: pic("event-veterans", 1600, 1200),
  campaignKickoff: pic("event-kickoff", 1600, 1200),
  policyForum: pic("event-policy", 1600, 1200),

  // Endorser headshots (small, square crop)
  endorser1: pic("endorser-1", 400, 400),
  endorser2: pic("endorser-2", 400, 400),
  endorser3: pic("endorser-3", 400, 400),
  endorser4: pic("endorser-4", 400, 400),
  endorser5: pic("endorser-5", 400, 400),
  endorser6: pic("endorser-6", 400, 400),
  endorser7: pic("endorser-7", 400, 400),
  endorser8: pic("endorser-8", 400, 400),
};
