import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const MOVIES = [
  {
    adult: false,
    backdrop_path: "/zm5KTTutG2oN06BehOa8uD1SVhy.jpg",
    genre_ids: [28, 35, 80],
    id: 1168190,
    original_language: "en",
    original_title: "The Wrecking Crew",
    overview:
      "Estranged half-brothers Jonny and James reunite after their father's mysterious death. As they search for the truth, buried secrets reveal a conspiracy threatening to tear their family apart.",
    popularity: 761.4033,
    poster_path: "/gbVwHl4YPSq6BcC92TQpe7qUTh6.jpg",
    release_date: "2026-01-28",
    title: "The Wrecking Crew",
    video: false,
    vote_average: 6.741,
    vote_count: 303,
  },
  {
    adult: false,
    backdrop_path: "/tyjXlexbNZQ0ZT1KEJslQtBirqc.jpg",
    genre_ids: [12, 53, 878],
    id: 840464,
    original_language: "en",
    original_title: "Greenland 2: Migration",
    overview:
      "Having found the safety of the Greenland bunker after the comet Clarke decimated the Earth, the Garrity family must now risk everything to embark on a perilous journey across the wasteland of Europe to find a new home.",
    popularity: 677.7898,
    poster_path: "/1mF4othta76CEXcL1YFInYudQ7K.jpg",
    release_date: "2026-01-07",
    title: "Greenland 2: Migration",
    video: false,
    vote_average: 6.47,
    vote_count: 285,
  },
  {
    adult: false,
    backdrop_path: "/5h2EsPKNDdB3MAtOk9MB9Ycg9Rz.jpg",
    genre_ids: [16, 35, 12, 10751, 9648],
    id: 1084242,
    original_language: "en",
    original_title: "Zootopia 2",
    overview:
      "After cracking the biggest case in Zootopia's history, rookie cops Judy Hopps and Nick Wilde find themselves on the twisting trail of a great mystery when Gary De'Snake arrives and turns the animal metropolis upside down. To crack the case, Judy and Nick must go undercover to unexpected new parts of town, where their growing partnership is tested like never before.",
    popularity: 370.855,
    poster_path: "/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg",
    release_date: "2025-11-26",
    title: "Zootopia 2",
    video: false,
    vote_average: 7.636,
    vote_count: 1483,
  },
  {
    adult: false,
    backdrop_path: "/4BtL2vvEufDXDP4u6xQjjQ1Y2aT.jpg",
    genre_ids: [28, 80, 18, 53],
    id: 1419406,
    original_language: "zh",
    original_title: "捕风追影",
    overview:
      "Macau Police brings the tracking expert police officer out of retirement to help catch a dangerous group of professional thieves.",
    popularity: 359.6419,
    poster_path: "/e0RU6KpdnrqFxDKlI3NOqN8nHL6.jpg",
    release_date: "2025-08-16",
    title: "The Shadow's Edge",
    video: false,
    vote_average: 7.156,
    vote_count: 389,
  },
  {
    adult: false,
    backdrop_path: "/swxhEJsAWms6X1fDZ4HdbvYBSf9.jpg",
    genre_ids: [12, 35, 27],
    id: 1234731,
    original_language: "en",
    original_title: "Anaconda",
    overview:
      "A group of friends facing mid-life crises head to the rainforest with the intention of remaking their favorite movie from their youth, only to find themselves in a fight for their lives against natural disasters, giant snakes and violent criminals.",
    popularity: 247.4222,
    poster_path: "/qxMv3HwAB3XPuwNLMhVRg795Ktp.jpg",
    release_date: "2025-12-24",
    title: "Anaconda",
    video: false,
    vote_average: 5.863,
    vote_count: 428,
  },
  {
    adult: false,
    backdrop_path: "/lAtuFCx6cYkNBmTMSNnLE0qlCLx.jpg",
    genre_ids: [28, 80, 10749],
    id: 1271895,
    original_language: "zh",
    original_title: "96分鐘",
    overview:
      "Former bomb disposal expert, Song Kang-Ren, and his fiancée, Huang Xin, board a high-speed train that contains a bomb. At the same time, Liu Kai, a well-known physics teacher who was involved in an affair scandal, also boards this same train in order to win back his wife, Ting Juan, who took the prior high-speed rail to return home in frustration…  After all, can the bomb be successfully defused this time? and resolve the crisis?",
    popularity: 238.0953,
    poster_path: "/gWKZ1iLhukvLoh8XY2N4tMvRQ2M.jpg",
    release_date: "2025-09-05",
    title: "96 Minutes",
    video: false,
    vote_average: 6.381,
    vote_count: 21,
  },
  {
    adult: false,
    backdrop_path: "/eUERZRVjCTNdgnESlQxyaOJ2d4K.jpg",
    genre_ids: [28],
    id: 1584215,
    original_language: "en",
    original_title: "The Internship",
    overview:
      "A CIA-trained assassin recruits other graduates from her secret childhood program, The Internship, to violently destroy the organization. The CIA fights back with deadly force.",
    popularity: 218.4812,
    poster_path: "/fYqSOkix4rbDiZW0ACNnvZCpT6X.jpg",
    release_date: "2026-01-13",
    title: "The Internship",
    video: false,
    vote_average: 6.056,
    vote_count: 36,
  },
  {
    adult: false,
    backdrop_path: "/6D6M5z4reppUxo2cnBEKI02Csp1.jpg",
    genre_ids: [28, 80, 53],
    id: 1601243,
    original_language: "en",
    original_title: "Oscar Shaw",
    overview:
      "After retiring from the police force, a relentless detective haunted by the tragic loss of his closest friend sets out on a perilous quest for vengeance, seeking redemption and fighting to restore justice to the streets he once swore to protect.",
    popularity: 238.7457,
    poster_path: "/tsE3nySukwrfUjouz8vzvKTcXNC.jpg",
    release_date: "2026-01-09",
    title: "Oscar Shaw",
    video: false,
    vote_average: 5.833,
    vote_count: 12,
  },
  {
    adult: false,
    backdrop_path: "/gLXibzLQ4qegvjdqDC0f8yTij2P.jpg",
    genre_ids: [9648, 53, 28],
    id: 1310568,
    original_language: "en",
    original_title: "Murder at the Embassy",
    overview:
      "1934. Private detective Miranda Green investigates a murder perpetrated in the British Embassy in Cairo, where a top secret document was stolen, risking to jeopardize both Buckingham Palace and the peace of the world. All those present in this closed place are suspected: the American photographer, the English student, the American actress, the Egyptian security guard, the ambassador interpreter, the Egyptian gardener and - why not? — the Ambassador himself. But who would have expected that a small group of Nazis would be behind a plot, risking to jeopardize both Buckingham Palace and the peace of the world?",
    popularity: 229.7887,
    poster_path: "/3DBmBItPdy0A2ol59jgHhS54Lua.jpg",
    release_date: "2025-11-14",
    title: "Murder at the Embassy",
    video: false,
    vote_average: 5.517,
    vote_count: 30,
  },
  {
    adult: false,
    backdrop_path: "/gEHDCtR9PNZvLG70sFBYJCFznRY.jpg",
    genre_ids: [9648, 53],
    id: 1368166,
    original_language: "en",
    original_title: "The Housemaid",
    overview:
      "Trying to escape her past, Millie Calloway accepts a job as a live-in housemaid for the wealthy Nina and Andrew Winchester. But what begins as a dream job quickly unravels into something far more dangerous—a sexy, seductive game of secrets, scandal, and power.",
    popularity: 226.366,
    poster_path: "/cWsBscZzwu5brg9YjNkGewRUvJX.jpg",
    release_date: "2025-12-18",
    title: "The Housemaid",
    video: false,
    vote_average: 7.071,
    vote_count: 619,
  },
  {
    adult: false,
    backdrop_path: "/ebyxeBh56QNXxSJgTnmz7fXAlwk.jpg",
    genre_ids: [28, 878, 12],
    id: 1242898,
    original_language: "en",
    original_title: "Predator: Badlands",
    overview:
      "Cast out from his clan, a young Predator finds an unlikely ally in a damaged android and embarks on a treacherous journey in search of the ultimate adversary.",
    popularity: 165.6074,
    poster_path: "/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg",
    release_date: "2025-11-05",
    title: "Predator: Badlands",
    video: false,
    vote_average: 7.755,
    vote_count: 1781,
  },
  {
    adult: false,
    backdrop_path: "/u8DU5fkLoM5tTRukzPC31oGPxaQ.jpg",
    genre_ids: [878, 12, 14],
    id: 83533,
    original_language: "en",
    original_title: "Avatar: Fire and Ash",
    overview:
      "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    popularity: 168.9763,
    poster_path: "/5bxrxnRaxZooBAxgUVBZ13dpzC7.jpg",
    release_date: "2025-12-17",
    title: "Avatar: Fire and Ash",
    video: false,
    vote_average: 7.3,
    vote_count: 1678,
  },
  {
    adult: false,
    backdrop_path: "/3F2EXWF1thX0BdrVaKvnm6mAhqh.jpg",
    genre_ids: [28, 53, 80],
    id: 1306368,
    original_language: "en",
    original_title: "The Rip",
    overview:
      "Trust frays when a team of Miami cops discovers millions in cash inside a run-down stash house, calling everyone — and everything — into question.",
    popularity: 152.5968,
    poster_path: "/eZo31Dhl5BQ6GfbMNf3oU0tUvPZ.jpg",
    release_date: "2026-01-13",
    title: "The Rip",
    video: false,
    vote_average: 7.025,
    vote_count: 1022,
  },
  {
    adult: false,
    backdrop_path: "/oN4TQ1TxchynXlFiXFBL3NHLT54.jpg",
    genre_ids: [16, 10751, 18],
    id: 1167307,
    original_language: "en",
    original_title: "David",
    overview:
      "From the songs of his mother’s heart to the whispers of a faithful God, David’s story begins in quiet devotion. When the giant Goliath rises to terrorize a nation, a young shepherd armed with only a sling, a few stones, and unshakable faith steps forward. Pursued by power and driven by purpose, his journey tests the limits of loyalty, love, and courage—culminating in a battle not just for a crown, but for the soul of a kingdom.",
    popularity: 146.6882,
    poster_path: "/bESlrLOrsQ9gKzaGQGHXKOyIUtX.jpg",
    release_date: "2025-12-14",
    title: "David",
    video: false,
    vote_average: 8.135,
    vote_count: 63,
  },
  {
    adult: false,
    backdrop_path: "/hO2jx1H3XafR7Y8QbFgVH1sHTY9.jpg",
    genre_ids: [27, 53, 35],
    id: 1198994,
    original_language: "en",
    original_title: "Send Help",
    overview:
      "Two colleagues become stranded on a deserted island, the only survivors of a plane crash. On the island, they must overcome past grievances and work together to survive, but ultimately, it's a battle of wills and wits to make it out alive.",
    popularity: 117.8711,
    poster_path: "/mlV70IuchLZXcXKowjwSpSfdfUB.jpg",
    release_date: "2026-01-22",
    title: "Send Help",
    video: false,
    vote_average: 7.1,
    vote_count: 133,
  },
  {
    adult: false,
    backdrop_path: "/AecGG1XVCmkk7fT10ko3FC0dLIP.jpg",
    genre_ids: [28, 14, 53],
    id: 1043197,
    original_language: "en",
    original_title: "Dust Bunny",
    overview:
      "Ten-year-old Aurora asks her hitman neighbor to kill the monster under her bed that she claims ate her family. To protect her, he must battle an onslaught of assassins while accepting that some monsters are real.",
    popularity: 110.3252,
    poster_path: "/vobigFZFvbYPf6ElYJu07P9rH8C.jpg",
    release_date: "2025-12-11",
    title: "Dust Bunny",
    video: false,
    vote_average: 6.613,
    vote_count: 143,
  },
  {
    adult: false,
    backdrop_path: "/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
    genre_ids: [878, 53],
    id: 755898,
    original_language: "en",
    original_title: "War of the Worlds",
    overview:
      "Will Radford is a top analyst for Homeland Security who tracks potential threats through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
    popularity: 114.6094,
    poster_path: "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
    release_date: "2025-07-29",
    title: "War of the Worlds",
    video: false,
    vote_average: 4.217,
    vote_count: 875,
  },
  {
    adult: false,
    backdrop_path: "/kVSUUWiXoNwq2wVCZ4Mcqkniqvr.jpg",
    genre_ids: [16, 10751, 35, 12, 14],
    id: 991494,
    original_language: "en",
    original_title: "The SpongeBob Movie: Search for SquarePants",
    overview:
      "Desperate to be a big guy, SpongeBob sets out to prove his bravery to Mr. Krabs by following The Flying Dutchman – a mysterious swashbuckling ghost pirate – on a seafaring adventure that takes him to the deepest depths of the deep sea, where no Sponge has gone before.",
    popularity: 96.391,
    poster_path: "/pDWYW9v8fmJdA7N0I1MOdQA3ETq.jpg",
    release_date: "2025-12-16",
    title: "The SpongeBob Movie: Search for SquarePants",
    video: false,
    vote_average: 6.7,
    vote_count: 162,
  },
  {
    adult: false,
    backdrop_path: "/xGbNoh7aWmU81oYuxJoFI07Rz5I.jpg",
    genre_ids: [28, 53, 80],
    id: 1326878,
    original_language: "en",
    original_title: "Strangers",
    overview:
      "Seeking revenge on her abusive husband, a woman's life takes a dark turn when she meets a mysterious hitman. Drawn into a whirlwind romance, she spirals into a dangerous vigilante spree. As the body count rises, she begins to unravel the true nature of her partner and the secrets they both conceal.",
    popularity: 87.3379,
    poster_path: "/v6hYeC1asK2ZRU7Ygukn4tV1zlS.jpg",
    release_date: "2024-08-16",
    title: "Strangers",
    video: false,
    vote_average: 5.8,
    vote_count: 29,
  },
  {
    adult: false,
    backdrop_path: "/kv8kCuvfhSQ50YxjowqpVn1QqhJ.jpg",
    genre_ids: [27, 53],
    id: 801937,
    original_language: "en",
    original_title: "Silent Night, Deadly Night",
    overview:
      "After witnessing his parents' brutal murder on Christmas Eve, Billy transforms into a Killer Santa, delivering a yearly spree of calculated, chilling violence. This year, his blood-soaked mission collides with love, as a young woman challenges him to confront his darkness.",
    popularity: 88.5697,
    poster_path: "/xCdSd7NnRdnL8DGLVhI95WhUNoi.jpg",
    release_date: "2025-12-11",
    title: "Silent Night, Deadly Night",
    video: false,
    vote_average: 6.254,
    vote_count: 61,
  },
];

//Theatre ID

const THEATRE_ID = [
  "d7cd8c3a-1ea2-4afd-ba63-10d30a5f8d27",

  "68c9d91e-ae86-4e7e-8555-fd77e2d9098b",

  "17662f88-f1da-4a5c-a17e-4e2c6be99a0e",

  "907e9e61-ba60-4dc3-a57a-4f28c53e8303",

  "1b21610b-c000-4614-8d36-45a81f97c274",

  "7c39ca4a-fb14-456a-b32c-16cd4bc9ff54",

  "ceed92bf-038c-4b1d-a612-779efc270e83",

  "42725580-e9ba-48c2-bb5d-5702e6d39cac",

  "f8ba9914-3377-4af7-9bc4-177264f07017",

  "4fde8024-db64-4f40-b670-385848f91cc1",
];

// Theatres
const THEATRES = [
  {
    id: THEATRE_ID[0],
    name: "Grand Cinema",
    location: "Downtown",
  },
  {
    id: THEATRE_ID[1],
    name: "City Plex",
    location: "Mall Road",
  },
  {
    id: THEATRE_ID[2],
    name: "IMAX Arena",
    location: "Tech Park",
  },
  {
    id: THEATRE_ID[3],
    name: "Grand Cinema",
    location: "New Road",
  },
  {
    id: THEATRE_ID[4],
    name: "City Plex",
    location: "Baneshwor",
  },
  {
    id: THEATRE_ID[5],
    name: "IMAX Arena",
    location: "Dillibazar",
  },
  {
    id: THEATRE_ID[6],
    name: "Grand Cinema",
    location: "Pulchowk",
  },
  {
    id: THEATRE_ID[7],
    name: "City Plex",
    location: "Bhaktapur",
  },
  {
    id: THEATRE_ID[8],
    name: "IMAX Arena",
    location: "Kirtipur",
  },
  {
    id: THEATRE_ID[9],
    name: "Grand Cinema",
    location: "Radhe Radhe",
  },
];

// Showtimes (movie ↔ theatre mapping)
const SHOWTIMES = [
  // Movie 1: The Wrecking Crew (1168190)
  { id: "s1_1", movieID: 1168190, theatreID: THEATRE_ID[0], time: "10:30" }, // Grand Cinema (Downtown)
  { id: "s1_2", movieID: 1168190, theatreID: THEATRE_ID[0], time: "13:45" },
  { id: "s1_3", movieID: 1168190, theatreID: THEATRE_ID[0], time: "18:00" },
  { id: "s1_4", movieID: 1168190, theatreID: THEATRE_ID[1], time: "11:00" }, // City Plex
  { id: "s1_5", movieID: 1168190, theatreID: THEATRE_ID[1], time: "15:30" },
  { id: "s1_6", movieID: 1168190, theatreID: THEATRE_ID[2], time: "19:15" }, // IMAX
  { id: "s1_7", movieID: 1168190, theatreID: THEATRE_ID[3], time: "21:00" }, // Grand Cinema (New Road)

  // Movie 2: Greenland 2: Migration (840464)
  { id: "s2_1", movieID: 840464, theatreID: THEATRE_ID[0], time: "09:00" },
  { id: "s2_2", movieID: 840464, theatreID: THEATRE_ID[0], time: "12:15" },
  { id: "s2_3", movieID: 840464, theatreID: THEATRE_ID[2], time: "14:45" },
  { id: "s2_4", movieID: 840464, theatreID: THEATRE_ID[2], time: "18:30" },
  { id: "s2_5", movieID: 840464, theatreID: THEATRE_ID[4], time: "16:00" },
  { id: "s2_6", movieID: 840464, theatreID: THEATRE_ID[5], time: "20:00" },

  // Movie 3: Zootopia 2 (1084242)
  { id: "s3_1", movieID: 1084242, theatreID: THEATRE_ID[1], time: "10:00" },
  { id: "s3_2", movieID: 1084242, theatreID: THEATRE_ID[1], time: "13:00" },
  { id: "s3_3", movieID: 1084242, theatreID: THEATRE_ID[3], time: "11:30" },
  { id: "s3_4", movieID: 1084242, theatreID: THEATRE_ID[3], time: "15:45" },
  { id: "s3_5", movieID: 1084242, theatreID: THEATRE_ID[6], time: "17:30" },

  // Movie 4: The Shadow's Edge (1419406)
  { id: "s4_1", movieID: 1419406, theatreID: THEATRE_ID[2], time: "10:15" },
  { id: "s4_2", movieID: 1419406, theatreID: THEATRE_ID[4], time: "19:45" },

  // Movie 5: Anaconda (1234731)
  // Movie 6: 96 Minutes (1271895)
  { id: "s6_1", movieID: 1271895, theatreID: THEATRE_ID[3], time: "14:00" },
  { id: "s6_2", movieID: 1271895, theatreID: THEATRE_ID[7], time: "18:00" },

  // Movie 7: The Internship (1584215)
  { id: "s7_1", movieID: 1584215, theatreID: THEATRE_ID[0], time: "16:45" },
  { id: "s7_2", movieID: 1584215, theatreID: THEATRE_ID[4], time: "21:30" },

  // Movie 8: Oscar Shaw (1601243)
  { id: "s8_1", movieID: 1601243, theatreID: THEATRE_ID[2], time: "12:00" },
  { id: "s8_2", movieID: 1601243, theatreID: THEATRE_ID[6], time: "19:00" },

  // Movie 9: Murder at the Embassy (1310568)
  { id: "s9_1", movieID: 1310568, theatreID: THEATRE_ID[1], time: "10:00" },
  { id: "s9_2", movieID: 1310568, theatreID: THEATRE_ID[5], time: "14:30" },
  { id: "s9_3", movieID: 1310568, theatreID: THEATRE_ID[9], time: "22:00" },

  // Movie 10: The Housemaid (1368166)
  { id: "s10_1", movieID: 1368166, theatreID: THEATRE_ID[0], time: "09:30" },
  { id: "s10_2", movieID: 1368166, theatreID: THEATRE_ID[3], time: "13:30" },
  { id: "s10_3", movieID: 1368166, theatreID: THEATRE_ID[8], time: "17:45" },

  // Movie 11: Predator: Badlands (1242898)
  { id: "s11_1", movieID: 1242898, theatreID: THEATRE_ID[2], time: "11:00" },
  { id: "s11_2", movieID: 1242898, theatreID: THEATRE_ID[4], time: "15:15" },
  { id: "s11_3", movieID: 1242898, theatreID: THEATRE_ID[6], time: "20:00" },
  { id: "s11_4", movieID: 1242898, theatreID: THEATRE_ID[7], time: "23:15" },

  // Movie 12: Avatar: Fire and Ash (83533)
  { id: "s12_1", movieID: 83533, theatreID: THEATRE_ID[1], time: "08:00" },
  { id: "s12_2", movieID: 83533, theatreID: THEATRE_ID[1], time: "12:00" },
  { id: "s12_3", movieID: 83533, theatreID: THEATRE_ID[2], time: "16:00" },
  { id: "s12_4", movieID: 83533, theatreID: THEATRE_ID[5], time: "20:00" },
  { id: "s12_5", movieID: 83533, theatreID: THEATRE_ID[0], time: "23:59" },

  // Movie 13: The Rip (1306368)
  { id: "s13_1", movieID: 1306368, theatreID: THEATRE_ID[3], time: "14:15" },
  { id: "s13_2", movieID: 1306368, theatreID: THEATRE_ID[9], time: "19:45" },

  // Movie 14: David (1167307)
  { id: "s14_1", movieID: 1167307, theatreID: THEATRE_ID[8], time: "10:45" },
  { id: "s14_2", movieID: 1167307, theatreID: THEATRE_ID[8], time: "15:30" },

  // Movie 15: Send Help (1198994)
  { id: "s15_1", movieID: 1198994, theatreID: THEATRE_ID[7], time: "13:00" },
  { id: "s15_2", movieID: 1198994, theatreID: THEATRE_ID[7], time: "17:15" },

  // Movie 16: Dust Bunny (1043197)
  { id: "s16_1", movieID: 1043197, theatreID: THEATRE_ID[4], time: "18:00" },
  { id: "s16_2", movieID: 1043197, theatreID: THEATRE_ID[5], time: "21:15" },

  // Movie 17: War of the Worlds (755898)
  { id: "s17_1", movieID: 755898, theatreID: THEATRE_ID[6], time: "11:30" },
  { id: "s17_2", movieID: 755898, theatreID: THEATRE_ID[6], time: "16:45" },

  // Movie 18: SpongeBob (991494)
  { id: "s18_1", movieID: 991494, theatreID: THEATRE_ID[0], time: "09:15" },
  { id: "s18_2", movieID: 991494, theatreID: THEATRE_ID[1], time: "12:45" },
  { id: "s18_3", movieID: 991494, theatreID: THEATRE_ID[2], time: "15:15" },

  // Movie 19: Strangers (1326878)
  { id: "s19_1", movieID: 1326878, theatreID: THEATRE_ID[3], time: "22:30" },

  // Movie 20: Silent Night (801937)
  { id: "s20_1", movieID: 801937, theatreID: THEATRE_ID[9], time: "20:00" },
  { id: "s20_2", movieID: 801937, theatreID: THEATRE_ID[9], time: "23:45" },
];

// generate seats
function generateSeats(showTimeId) {
  const seats = [];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  rows.forEach((row) => {
    for (let col = 1; col <= 10; col++) {
      seats.push({
        id: `${showTimeId}_${row}_${col}`,
        showTimeId: showTimeId,
        seatId: `${row}${col}`,
        status: "available",
        lockedBy: null,
        lockedAt: null,
        bookingId: null,
        type: row === "A" || row === "B" ? "VIP" : "Regular",
      });
    }
  });
  return seats;
}

// seat data store
// seat data store
export async function seedFirestore() {
  // 1. Seed Movies
  const movieRef = collection(db, "movies");
  const existingMovies = await getDocs(movieRef);

  if (existingMovies.size === 0) {
    console.log("Seeding Movies...");
    for (const movie of MOVIES) {
      await setDoc(doc(db, "movies", movie.id.toString()), movie);
    }
  } else {
    console.log("Movies already exist. Skipping movie seed.");
  }

  // 2. Seed Theatres
  const theatreRef = collection(db, "theatres");
  const existingTheatres = await getDocs(theatreRef);

  if (existingTheatres.size === 0) {
    console.log("Seeding Theatres...");
    for (const theatre of THEATRES) {
      await setDoc(doc(db, "theatres", theatre.id), theatre);
    }
  } else {
    console.log("Theatres already exist. Skipping theatre seed.");
  }

  // 3. Seed Showtimes (We want to ensure we have the new expanded list)
  // To verify if we need to update, we can check if the count matches or just check if empty.
  // For this dev update, we might want to force update or check if "s1_1" exists.
  const showtimeRef = collection(db, "showtimes");
  const existingShowtimes = await getDocs(showtimeRef);

  if (existingShowtimes.size < SHOWTIMES.length) {
    console.log("Seeding/Updating Showtimes...");
    for (const show of SHOWTIMES) {
      await setDoc(doc(db, "showtimes", show.id), show);
    }
  } else {
    console.log("Showtimes already exist. Skipping showtime seed.");
  }

  // writing show
  for (const show of SHOWTIMES) {
    const seats = generateSeats(show.id);
    for (const seat of seats) {
      await setDoc(doc(db, "seats", seat.id), seat);
    }
  }

  console.log("Seats created");

  console.log("Seeding complete in firebase");
}
