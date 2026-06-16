// Campus locations matching the Ground, 1st, 2nd, and 3rd Floor plans.
// Replicates the base architectural layout across all floors and links them via Lifts and Staircases.
// Positions are percentage-based (0-100) calibrated for the portrait floor plan overlay.

export interface Location {
  id: string;
  name: string;
  type: "entrance" | "lab" | "classroom" | "facility" | "corridor" | "lift" | "stairs";
  // Position on the map (percentage-based for overlay positioning)
  x: number;
  y: number;
  floor: number;
}

export interface Connection {
  from: string;
  to: string;
  distance: number; // in meters
  direction: string;
}

// Floor display names
export const FLOOR_NAMES: Record<number, string> = {
  0: "Ground Floor",
  1: "1st Floor",
  2: "2nd Floor",
  3: "3rd Floor",
};

// Custom Room Names for each floor to match actual floor plan labels exactly
export const ROOM_NAMES_BY_FLOOR: Record<number, Record<string, string>> = {
  0: {
    "toilet-1": "Toilet - 01",
    "private-staff-06": "Private Staff / Acc - 06",
    "cr-05": "Class Room C.R - 05",
    "cr-04": "Hall C.R - 04",
    "cr-03": "Class Room C.R - 03",
    "toilet-2": "Toilet - 02",
    "cr-08": "Class Room C.R - 08",
    "cr-09": "Staff Room C.R - 09",
    "cr-11": "Staff Area C.R - 10",
    "comp-lab-1-2": "Computer Lab - 1, 2",
    "cc-cn-lab": "CC/CN Lab / Admin",
    "dbms-fs-lab": "DBMS/FS-Lab (Class Room)",
    "cr-18": "Lab / C.R - 18",
    "cr-19": "Class Room C.R - 19",
    "cl-20": "Staff Room C.L - 20",
    "gr-21": "Toilet G.R - 21",
    "lab-22": "Lab - 22",
    "p-lab-23": "Class Room P. Lab 23",
    "main-entrance": "Main Entrance",
    "rear-entrance": "Rear Entrance",
    "admission-113": "Office Section",
    "lift": "Lift",
    "stairs": "Staircase",
  },
  1: {
    "toilet-1": "Toilet - 101-A",
    "private-staff-06": "Library",
    "cr-05": "Class Room - 104",
    "cr-04": "Class Room - 103",
    "cr-03": "C.R - 102",
    "toilet-2": "Girls Toilet - 101",
    "cr-08": "Class Room - 106",
    "cr-09": "Class Room - 107",
    "cr-11": "C.R - 108",
    "comp-lab-1-2": "Entrance Lounge",
    "cc-cn-lab": "Board Room",
    "dbms-fs-lab": "Entrance Lobby Room",
    "cr-18": "C.R - 114 LAB",
    "cr-19": "Placement & Training Cell LAB",
    "cl-20": "HOD & Staff Room - 117 / Seminar",
    "gr-21": "Toilet - 112",
    "lab-22": "Seminar / 119",
    "p-lab-23": "Class Room / Seminar - 120",
    "main-entrance": "Office Room",
    "rear-entrance": "Accounts Room - 109",
    "admission-113": "Admission Section - 113",
    "lift": "Lift",
    "stairs": "Staircase",
  },
  2: {
    "toilet-1": "Toilet - 201-A",
    "private-staff-06": "2nd Floor Seminar Hall",
    "cr-05": "Class Room - 204",
    "cr-04": "Class Room - 203",
    "cr-03": "Class Room - 202",
    "toilet-2": "Toilet - 201",
    "cr-08": "Class Room - 206",
    "cr-09": "Class Room - 207",
    "cr-11": "Class Room - 208",
    "comp-lab-1-2": "2nd Floor Lounge",
    "cc-cn-lab": "Research Lab",
    "dbms-fs-lab": "Meeting Room",
    "cr-18": "Physics Lab - 214",
    "cr-19": "Chemistry Lab - 216",
    "cl-20": "Dean Office - 217",
    "gr-21": "Toilet - 212",
    "lab-22": "Project Lab - 219",
    "p-lab-23": "Class Room - 220",
    "main-entrance": "2nd Floor Main Entrance",
    "rear-entrance": "2nd Floor Rear Entrance",
    "admission-113": "Admissions Office - 213",
    "lift": "Lift",
    "stairs": "Staircase",
  },
  3: {
    "toilet-1": "CLASS ROOM C.R - 308",
    "private-staff-06": "MBA department - 307",
    "cr-05": "C.R - 306",
    "cr-04": "HALL C.R - 305",
    "cr-03": "CR 304",
    "toilet-2": "Dept of MBA 303 / TOILET 302 / 301",
    "cr-08": "C.R - 309 CLASS ROOM",
    "cr-09": "C.R - 310",
    "cr-11": "C.R - 311 (CLASS ROOM)",
    "comp-lab-1-2": "Staff Room / PORTICO",
    "cc-cn-lab": "ECE - 315 / 314 Class Room",
    "dbms-fs-lab": "CLASS ROOM 302 / 301",
    "cr-18": "C.R - 319 (Class Room)",
    "cr-19": "C.R - 320 (Class Room)",
    "cl-20": "CLASS ROOM - 321",
    "gr-21": "TOILET - 322",
    "lab-22": "CAED - 324 LAB",
    "p-lab-23": "CLASS ROOM - 325",
    "main-entrance": "ROOM",
    "rear-entrance": "Tutorial",
    "admission-113": "Dept ECE HOD - 318",
    "lift": "Lift",
    "stairs": "Staircase",
  },
};

// Base layout for a single floor (coordinates calibrated from the uploaded floor plan)
const baseLocations = [
  // Selectable Rooms
  { id: "toilet-1", name: "Toilet - 01", type: "facility" as const, x: 88, y: 78 },
  { id: "private-staff-06", name: "Private Staff / Acc - 06", type: "facility" as const, x: 65, y: 78 },
  { id: "cr-05", name: "Class Room C.R - 05", type: "classroom" as const, x: 52, y: 78 },
  { id: "cr-04", name: "Hall C.R - 04", type: "classroom" as const, x: 41, y: 78 },
  { id: "cr-03", name: "Class Room C.R - 03", type: "classroom" as const, x: 33, y: 78 },
  { id: "toilet-2", name: "Toilet - 02", type: "facility" as const, x: 23, y: 78 },

  { id: "cr-08", name: "Class Room C.R - 08", type: "classroom" as const, x: 50, y: 69 },
  { id: "cr-09", name: "Staff Room C.R - 09", type: "classroom" as const, x: 50, y: 60 },
  { id: "cr-11", name: "Class Room C.R - 11", type: "classroom" as const, x: 50, y: 52 },

  { id: "comp-lab-1-2", name: "Computer Lab - 1, 2", type: "lab" as const, x: 64, y: 46 },
  { id: "cc-cn-lab", name: "CC/CN Lab / Admin", type: "lab" as const, x: 46, y: 49 },
  { id: "dbms-fs-lab", name: "DBMS/FS-Lab (Class Room)", type: "lab" as const, x: 46, y: 43 },

  { id: "cr-18", name: "Lab / C.R - 18", type: "classroom" as const, x: 50, y: 31 },
  { id: "cr-19", name: "Class Room C.R - 19", type: "classroom" as const, x: 50, y: 22 },

  { id: "cl-20", name: "Staff Room C.L - 20", type: "facility" as const, x: 68, y: 13 },
  { id: "gr-21", name: "Toilet G.R - 21", type: "facility" as const, x: 55, y: 13 },
  { id: "lab-22", name: "Lab - 22", type: "lab" as const, x: 40, y: 13 },
  { id: "p-lab-23", name: "Class Room P. Lab 23", type: "classroom" as const, x: 27, y: 13 },

  // Core Entrances & Navigation Waypoints
  { id: "main-entrance", name: "Main Entrance", type: "entrance" as const, x: 64, y: 38 },
  { id: "rear-entrance", name: "Rear Entrance", type: "entrance" as const, x: 64, y: 54 },
  { id: "admission-113", name: "Office Section", type: "classroom" as const, x: 64, y: 31 },
  { id: "lift", name: "Lift", type: "lift" as const, x: 55, y: 54 },
  { id: "stairs", name: "Staircase", type: "stairs" as const, x: 55, y: 46 },

  // Corridor Waypoints
  { id: "c_top_1", name: "Top Corridor - Left End", type: "corridor" as const, x: 88, y: 73 },
  { id: "c_top_2", name: "Top Corridor - Left Main", type: "corridor" as const, x: 65, y: 73 },
  { id: "c_top_3", name: "Top Corridor - Center Left", type: "corridor" as const, x: 52, y: 73 },
  { id: "c_top_4", name: "Top Corridor - Center Right", type: "corridor" as const, x: 41, y: 73 },
  { id: "c_top_5", name: "Top Corridor - Right Main", type: "corridor" as const, x: 33, y: 73 },
  { id: "c_top_6", name: "Top Corridor - Right End", type: "corridor" as const, x: 23, y: 73 },

  { id: "c_v_1", name: "Vertical Corridor Junction - Top", type: "corridor" as const, x: 58, y: 73 },
  { id: "c_v_2", name: "Vertical Corridor - Near C.R-08", type: "corridor" as const, x: 58, y: 69 },
  { id: "c_v_3", name: "Vertical Corridor - Near C.R-09", type: "corridor" as const, x: 58, y: 60 },
  { id: "c_v_4", name: "Vertical Corridor - Near Lift & Rear", type: "corridor" as const, x: 58, y: 54 },
  { id: "c_v_5", name: "Vertical Corridor - Near Labs & Stairs", type: "corridor" as const, x: 58, y: 46 },
  { id: "c_v_6", name: "Vertical Corridor - Near Main Entrance", type: "corridor" as const, x: 58, y: 38 },
  { id: "c_v_7", name: "Vertical Corridor - Near C.R-18", type: "corridor" as const, x: 58, y: 31 },
  { id: "c_v_8", name: "Vertical Corridor - Near C.R-19", type: "corridor" as const, x: 58, y: 22 },
  { id: "c_v_9", name: "Vertical Corridor Junction - Bottom", type: "corridor" as const, x: 58, y: 18 },

  { id: "c_mid_left_1", name: "Left Corridor - Near Rear Entrance", type: "corridor" as const, x: 64, y: 54 },
  { id: "c_mid_left_2", name: "Left Corridor - Near Comp Lab", type: "corridor" as const, x: 64, y: 46 },
  { id: "c_mid_left_3", name: "Left Corridor - Near Main Entrance", type: "corridor" as const, x: 64, y: 38 },
  { id: "c_mid_left_4", name: "Left Corridor - Near Office Section", type: "corridor" as const, x: 64, y: 31 },

  { id: "c_bottom_1", name: "Bottom Corridor - Left", type: "corridor" as const, x: 68, y: 18 },
  { id: "c_bottom_2", name: "Bottom Corridor - Center", type: "corridor" as const, x: 55, y: 18 },
  { id: "c_bottom_3", name: "Bottom Corridor - Right Mid", type: "corridor" as const, x: 40, y: 18 },
  { id: "c_bottom_4", name: "Bottom Corridor - Right", type: "corridor" as const, x: 27, y: 18 },
];

const baseConnections = [
  // Top horizontal corridor
  { from: "c_top_1", to: "c_top_2", distance: 10, direction: "Walk straight along the corridor" },
  { from: "c_top_2", to: "c_v_1", distance: 4, direction: "Continue straight towards the central junction" },
  { from: "c_v_1", to: "c_top_3", distance: 3, direction: "Continue past the central junction" },
  { from: "c_top_3", to: "c_top_4", distance: 5, direction: "Walk along the corridor past C.R-05" },
  { from: "c_top_4", to: "c_top_5", distance: 4, direction: "Continue past Hall C.R-04" },
  { from: "c_top_5", to: "c_top_6", distance: 5, direction: "Walk along the corridor towards Toilet-02" },

  // Vertical corridor
  { from: "c_v_1", to: "c_v_2", distance: 2, direction: "Walk down the vertical corridor" },
  { from: "c_v_2", to: "c_v_3", distance: 4, direction: "Walk down past C.R-08" },
  { from: "c_v_3", to: "c_v_4", distance: 3, direction: "Walk down past C.R-09" },
  { from: "c_v_4", to: "c_v_5", distance: 4, direction: "Walk past the lift and staircase area" },
  { from: "c_v_5", to: "c_v_6", distance: 4, direction: "Continue down past CC/CN Lab" },
  { from: "c_v_6", to: "c_v_7", distance: 3, direction: "Continue down past the Main Entrance junction" },
  { from: "c_v_7", to: "c_v_8", distance: 4, direction: "Walk down past C.R-18" },
  { from: "c_v_8", to: "c_v_9", distance: 2, direction: "Walk down to the bottom corridor junction" },

  // Bottom horizontal corridor
  { from: "c_bottom_1", to: "c_v_9", distance: 5, direction: "Walk along the bottom corridor towards center" },
  { from: "c_v_9", to: "c_bottom_2", distance: 2, direction: "Walk past the vertical junction" },
  { from: "c_bottom_2", to: "c_bottom_3", distance: 7, direction: "Walk past Toilet G.R-21" },
  { from: "c_bottom_3", to: "c_bottom_4", distance: 6, direction: "Walk past Lab-22 towards P. Lab 23" },

  // Left corridor
  { from: "c_mid_left_1", to: "c_mid_left_2", distance: 4, direction: "Walk along the left corridor" },
  { from: "c_mid_left_2", to: "c_mid_left_3", distance: 4, direction: "Continue along the left corridor" },
  { from: "c_mid_left_3", to: "c_mid_left_4", distance: 3, direction: "Walk down the left corridor past main entrance" },

  // Connect left corridor to central vertical corridor
  { from: "c_mid_left_1", to: "c_v_4", distance: 3, direction: "Walk right towards the lift/stairs area" },
  { from: "c_mid_left_2", to: "c_v_5", distance: 3, direction: "Walk right towards the staircase and labs" },
  { from: "c_mid_left_3", to: "c_v_6", distance: 3, direction: "Walk right towards the central vertical corridor" },
  { from: "c_mid_left_4", to: "c_v_7", distance: 3, direction: "Walk right towards the vertical corridor near C.R-18" },

  // Rooms connections
  { from: "c_top_1", to: "toilet-1", distance: 2, direction: "Enter Toilet" },
  { from: "c_top_2", to: "private-staff-06", distance: 2, direction: "Enter the Room" },
  { from: "c_top_3", to: "cr-05", distance: 2, direction: "Enter the Room" },
  { from: "c_top_4", to: "cr-04", distance: 2, direction: "Enter the Room" },
  { from: "c_top_5", to: "cr-03", distance: 2, direction: "Enter the Room" },
  { from: "c_top_6", to: "toilet-2", distance: 2, direction: "Enter Toilet" },

  { from: "c_v_2", to: "cr-08", distance: 2, direction: "Enter the Room on your right" },
  { from: "c_v_3", to: "cr-09", distance: 2, direction: "Enter the Room on your right" },
  { from: "c_v_4", to: "cr-11", distance: 2, direction: "Enter the Room on your right" },

  { from: "c_v_4", to: "lift", distance: 1, direction: "Step into the Lift" },
  { from: "c_v_5", to: "stairs", distance: 1, direction: "Go to the Staircase" },
  { from: "c_mid_left_1", to: "rear-entrance", distance: 1, direction: "Step through the Entrance" },
  { from: "c_mid_left_3", to: "main-entrance", distance: 1, direction: "Step through the Entrance" },
  { from: "c_mid_left_4", to: "admission-113", distance: 1, direction: "Enter the Section" },

  { from: "c_mid_left_2", to: "comp-lab-1-2", distance: 1, direction: "Enter the Lounge / Computer Lab" },

  { from: "c_v_5", to: "cc-cn-lab", distance: 2, direction: "Enter the Lab / Board Room on your right" },
  { from: "c_v_5", to: "dbms-fs-lab", distance: 2, direction: "Enter the Lab on your right" },

  { from: "c_v_7", to: "cr-18", distance: 2, direction: "Enter the Lab on your right" },
  { from: "c_v_8", to: "cr-19", distance: 2, direction: "Enter the Room/Lab on your right" },

  { from: "c_bottom_1", to: "cl-20", distance: 2, direction: "Enter the Staff Room" },
  { from: "c_bottom_2", to: "gr-21", distance: 2, direction: "Enter Toilet" },
  { from: "c_bottom_3", to: "lab-22", distance: 2, direction: "Enter the Seminar/Lab" },
  { from: "c_bottom_4", to: "p-lab-23", distance: 2, direction: "Enter the Room" },
];

// Dedicated Ground Floor Locations (calibrated to the new landscape image)
const groundLocations: Location[] = [
  // Left Wing (vertical stack)
  { id: "f0-boys-washroom", name: "Ground Floor - Boys Washroom", type: "facility", x: 93, y: 88, floor: 0 },
  { id: "f0-lh-3", name: "Ground Floor - LH-3", type: "classroom", x: 93, y: 75, floor: 0 },
  { id: "f0-lh-4", name: "Ground Floor - LH-4", type: "classroom", x: 93, y: 63, floor: 0 },
  { id: "f0-lh-5", name: "Ground Floor - LH-5", type: "classroom", x: 93, y: 51, floor: 0 },
  { id: "f0-staff-room", name: "Ground Floor - Principal Staff room and accounts", type: "facility", x: 93, y: 20, floor: 0 },

  // Center top rooms (above main corridor)
  { id: "f0-lh-7", name: "Ground Floor - LH-7", type: "classroom", x: 82, y: 51, floor: 0 },
  { id: "f0-lh-8", name: "Ground Floor - LH-8", type: "classroom", x: 76, y: 51, floor: 0 },
  { id: "f0-lh-9", name: "Ground Floor - LH-9", type: "classroom", x: 70, y: 51, floor: 0 },
  { id: "f0-electrical-room", name: "Ground Floor - Electrical Room", type: "facility", x: 65, y: 51, floor: 0 },
  { id: "f0-stairs", name: "Ground Floor - Staircase (Left)", type: "stairs", x: 62, y: 51, floor: 0 },
  { id: "f0-lift", name: "Ground Floor - Lift (Left)", type: "lift", x: 59, y: 51, floor: 0 },
  { id: "f0-clp-cn-lab", name: "Ground Floor - CLP/CN Lab = I-1", type: "lab", x: 55, y: 51, floor: 0 },
  { id: "f0-dbms-fs-lab", name: "Ground Floor - DBMS/FS Lab = I-5", type: "lab", x: 49, y: 51, floor: 0 },
  { id: "f0-ups-room", name: "Ground Floor - UPS Room 16", type: "facility", x: 44, y: 51, floor: 0 },
  { id: "f0-lift-2", name: "Ground Floor - Lift (Right)", type: "lift", x: 40, y: 51, floor: 0 },
  { id: "f0-stairs-2", name: "Ground Floor - Staircase (Right)", type: "stairs", x: 36, y: 51, floor: 0 },
  { id: "f0-lh-17", name: "Ground Floor - LH-17", type: "classroom", x: 30, y: 51, floor: 0 },
  { id: "f0-lh-18", name: "Ground Floor - LH-18", type: "classroom", x: 24, y: 51, floor: 0 },
  { id: "f0-lh-19", name: "Ground Floor - LH-19", type: "classroom", x: 18, y: 51, floor: 0 },

  // Center bottom room
  { id: "f0-computer-lab-2", name: "Ground Floor - Computer Lab-2", type: "lab", x: 52, y: 26, floor: 0 },

  // Right Wing (vertical stack)
  { id: "f0-physics-lab", name: "Ground Floor - Physics Lab", type: "lab", x: 7, y: 85, floor: 0 },
  { id: "f0-lh-20", name: "Ground Floor - LH-20", type: "classroom", x: 7, y: 67, floor: 0 },
  { id: "f0-girls-washroom", name: "Ground Floor - GIRLS Washroom", type: "facility", x: 7, y: 51, floor: 0 },
  { id: "f0-chemistry-lab", name: "Ground Floor - Chemistry Lab", type: "lab", x: 7, y: 20, floor: 0 },

  // Corridor Waypoints - Main Horizontal Corridor at y = 62%
  { id: "f0-c-left", name: "Ground Floor - Corridor Left End", type: "corridor", x: 88, y: 38, floor: 0 },
  { id: "f0-c-lh7", name: "Ground Floor - Corridor near LH-7", type: "corridor", x: 82, y: 38, floor: 0 },
  { id: "f0-c-lh8", name: "Ground Floor - Corridor near LH-8", type: "corridor", x: 76, y: 38, floor: 0 },
  { id: "f0-c-lh9", name: "Ground Floor - Corridor near LH-9", type: "corridor", x: 70, y: 38, floor: 0 },
  { id: "f0-c-electrical", name: "Ground Floor - Corridor near Electrical Room", type: "corridor", x: 65, y: 38, floor: 0 },
  { id: "f0-c-stairs-left", name: "Ground Floor - Corridor near Left Stairs", type: "corridor", x: 62, y: 38, floor: 0 },
  { id: "f0-c-lift-left", name: "Ground Floor - Corridor near Left Lift", type: "corridor", x: 59, y: 38, floor: 0 },
  { id: "f0-c-clp-cn-lab", name: "Ground Floor - Corridor near CLP/CN Lab", type: "corridor", x: 55, y: 38, floor: 0 },
  { id: "f0-c-dbms-fs-lab", name: "Ground Floor - Corridor near DBMS/FS Lab", type: "corridor", x: 49, y: 38, floor: 0 },
  { id: "f0-c-ups-room", name: "Ground Floor - Corridor near UPS Room", type: "corridor", x: 44, y: 38, floor: 0 },
  { id: "f0-c-lift-right", name: "Ground Floor - Corridor near Right Lift", type: "corridor", x: 40, y: 38, floor: 0 },
  { id: "f0-c-stairs-right", name: "Ground Floor - Corridor near Right Stairs", type: "corridor", x: 36, y: 38, floor: 0 },
  { id: "f0-c-lh17", name: "Ground Floor - Corridor near LH-17", type: "corridor", x: 30, y: 38, floor: 0 },
  { id: "f0-c-lh18", name: "Ground Floor - Corridor near LH-18", type: "corridor", x: 24, y: 38, floor: 0 },
  { id: "f0-c-lh19", name: "Ground Floor - Corridor near LH-19", type: "corridor", x: 18, y: 38, floor: 0 },
  { id: "f0-c-right", name: "Ground Floor - Corridor Right End", type: "corridor", x: 12, y: 38, floor: 0 },

  // Corridor Waypoints - Left Wing Vertical Corridor Stack (runs along x = 12%)
  { id: "f0-c-left-vertical-washroom", name: "Ground Floor - Left Corridor near Boys Washroom", type: "corridor", x: 88, y: 88, floor: 0 },
  { id: "f0-c-left-vertical-lh3", name: "Ground Floor - Left Corridor near LH-3", type: "corridor", x: 88, y: 75, floor: 0 },
  { id: "f0-c-left-vertical-lh4", name: "Ground Floor - Left Corridor near LH-4", type: "corridor", x: 88, y: 63, floor: 0 },
  { id: "f0-c-left-vertical-lh5", name: "Ground Floor - Left Corridor near LH-5", type: "corridor", x: 88, y: 51, floor: 0 },
  { id: "f0-c-left-vertical-bottom", name: "Ground Floor - Left Corridor near Staff Room", type: "corridor", x: 88, y: 20, floor: 0 },

  // Corridor Waypoints - Right Wing Vertical Corridor Stack (runs along x = 88%)
  { id: "f0-c-right-vertical-physics", name: "Ground Floor - Right Corridor near Physics Lab", type: "corridor", x: 12, y: 85, floor: 0 },
  { id: "f0-c-right-vertical-lh20", name: "Ground Floor - Right Corridor near LH-20", type: "corridor", x: 12, y: 67, floor: 0 },
  { id: "f0-c-right-vertical-girls", name: "Ground Floor - Right Corridor near Girls Washroom", type: "corridor", x: 12, y: 51, floor: 0 },
  { id: "f0-c-right-vertical-bottom", name: "Ground Floor - Right Corridor near Chemistry Lab", type: "corridor", x: 12, y: 20, floor: 0 },
];

const groundConnections: Connection[] = [
  // Main Horizontal Corridor segments (left to right)
  { from: "f0-c-left", to: "f0-c-lh7", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f0-c-lh7", to: "f0-c-lh8", distance: 4, direction: "Continue straight past LH-7" },
  { from: "f0-c-lh8", to: "f0-c-lh9", distance: 4, direction: "Continue past LH-8" },
  { from: "f0-c-lh9", to: "f0-c-electrical", distance: 3, direction: "Continue past LH-9" },
  { from: "f0-c-electrical", to: "f0-c-stairs-left", distance: 2, direction: "Continue past the Electrical Room" },
  { from: "f0-c-stairs-left", to: "f0-c-lift-left", distance: 2, direction: "Walk past the Staircase" },
  { from: "f0-c-lift-left", to: "f0-c-clp-cn-lab", distance: 3, direction: "Continue past the Lift" },
  { from: "f0-c-clp-cn-lab", to: "f0-c-dbms-fs-lab", distance: 4, direction: "Continue past CLP/CN Lab" },
  { from: "f0-c-dbms-fs-lab", to: "f0-c-ups-room", distance: 3, direction: "Continue past DBMS/FS Lab" },
  { from: "f0-c-ups-room", to: "f0-c-lift-right", distance: 3, direction: "Continue past the UPS Room" },
  { from: "f0-c-lift-right", to: "f0-c-stairs-right", distance: 2, direction: "Continue past the Lift" },
  { from: "f0-c-stairs-right", to: "f0-c-lh17", distance: 4, direction: "Walk past the Staircase" },
  { from: "f0-c-lh17", to: "f0-c-lh18", distance: 4, direction: "Continue past LH-17" },
  { from: "f0-c-lh18", to: "f0-c-lh19", distance: 4, direction: "Continue past LH-18" },
  { from: "f0-c-lh19", to: "f0-c-right", distance: 4, direction: "Walk to the end of the corridor" },

  // Left Wing vertical corridor segments
  { from: "f0-c-left", to: "f0-c-left-vertical-lh5", distance: 8, direction: "Go up the left corridor stack" },
  { from: "f0-c-left-vertical-lh5", to: "f0-c-left-vertical-lh4", distance: 8, direction: "Continue up the corridor" },
  { from: "f0-c-left-vertical-lh4", to: "f0-c-left-vertical-lh3", distance: 8, direction: "Continue up past LH-4" },
  { from: "f0-c-left-vertical-lh3", to: "f0-c-left-vertical-washroom", distance: 8, direction: "Continue up past LH-3" },
  { from: "f0-c-left", to: "f0-c-left-vertical-bottom", distance: 11, direction: "Go down the left corridor stack" },

  // Right Wing vertical corridor segments
  { from: "f0-c-right", to: "f0-c-right-vertical-girls", distance: 8, direction: "Go up the right corridor stack" },
  { from: "f0-c-right-vertical-girls", to: "f0-c-right-vertical-lh20", distance: 10, direction: "Continue up past Girls Washroom" },
  { from: "f0-c-right-vertical-lh20", to: "f0-c-right-vertical-physics", distance: 11, direction: "Continue up past LH-20" },
  { from: "f0-c-right", to: "f0-c-right-vertical-bottom", distance: 11, direction: "Go down the right corridor stack" },

  // Connect rooms to corridor waypoints
  // Left Wing stack
  { from: "f0-c-left-vertical-washroom", to: "f0-boys-washroom", distance: 3, direction: "Enter Boys Washroom" },
  { from: "f0-c-left-vertical-lh3", to: "f0-lh-3", distance: 3, direction: "Enter LH-3" },
  { from: "f0-c-left-vertical-lh4", to: "f0-lh-4", distance: 3, direction: "Enter LH-4" },
  { from: "f0-c-left-vertical-lh5", to: "f0-lh-5", distance: 3, direction: "Enter LH-5" },
  { from: "f0-c-left-vertical-bottom", to: "f0-staff-room", distance: 3, direction: "Enter Principal Staff room and accounts" },

  // Top Center rooms
  { from: "f0-c-lh7", to: "f0-lh-7", distance: 8, direction: "Enter LH-7" },
  { from: "f0-c-lh8", to: "f0-lh-8", distance: 8, direction: "Enter LH-8" },
  { from: "f0-c-lh9", to: "f0-lh-9", distance: 8, direction: "Enter LH-9" },
  { from: "f0-c-electrical", to: "f0-electrical-room", distance: 8, direction: "Enter the Electrical Room" },
  { from: "f0-c-stairs-left", to: "f0-stairs", distance: 8, direction: "Walk to the Staircase" },
  { from: "f0-c-lift-left", to: "f0-lift", distance: 8, direction: "Step into the Lift" },
  { from: "f0-c-clp-cn-lab", to: "f0-clp-cn-lab", distance: 8, direction: "Enter CLP/CN Lab" },
  { from: "f0-c-dbms-fs-lab", to: "f0-dbms-fs-lab", distance: 8, direction: "Enter DBMS/FS Lab" },
  { from: "f0-c-ups-room", to: "f0-ups-room", distance: 8, direction: "Enter the UPS Room 16" },
  { from: "f0-c-lift-right", to: "f0-lift-2", distance: 8, direction: "Step into the Lift" },
  { from: "f0-c-stairs-right", to: "f0-stairs-2", distance: 8, direction: "Walk to the Staircase" },
  { from: "f0-c-lh17", to: "f0-lh-17", distance: 8, direction: "Enter LH-17" },
  { from: "f0-c-lh18", to: "f0-lh-18", distance: 8, direction: "Enter LH-18" },
  { from: "f0-c-lh19", to: "f0-lh-19", distance: 8, direction: "Enter LH-19" },

  // Bottom Center room
  { from: "f0-c-clp-cn-lab", to: "f0-computer-lab-2", distance: 10, direction: "Enter Computer Lab-2" },

  // Right Wing stack
  { from: "f0-c-right-vertical-physics", to: "f0-physics-lab", distance: 3, direction: "Enter Physics Lab" },
  { from: "f0-c-right-vertical-lh20", to: "f0-lh-20", distance: 3, direction: "Enter LH-20" },
  { from: "f0-c-right-vertical-girls", to: "f0-girls-washroom", distance: 3, direction: "Enter GIRLS Washroom" },
  { from: "f0-c-right-vertical-bottom", to: "f0-chemistry-lab", distance: 3, direction: "Enter Chemistry Lab" },

  // Extra inter-floor links for the secondary lift/stairs on ground floor to connect to floor 1
  { from: "f0-lift-2", to: "f1-lift", distance: 5, direction: "Take the Lift up from Ground Floor to 1st Floor" },
  { from: "f1-lift", to: "f0-lift-2", distance: 5, direction: "Take the Lift down from 1st Floor to Ground Floor" },
  { from: "f0-stairs-2", to: "f1-stairs", distance: 7, direction: "Take the Stairs up from Ground Floor to 1st Floor" },
  { from: "f1-stairs", to: "f0-stairs-2", distance: 7, direction: "Take the Stairs down from 1st Floor to Ground Floor" },
];

// Dedicated Second Floor Locations (calibrated to the new landscape image)
const secondLocations: Location[] = [
  // Left Wing (vertical stack)
  { id: "f2-toilet-left", name: "2nd Floor - Toilet", type: "facility", x: 93, y: 88, floor: 2 },
  { id: "f2-library", name: "2nd Floor - Library", type: "facility", x: 93, y: 51, floor: 2 },

  // Center top rooms (above main corridor)
  { id: "f2-classroom-202", name: "2nd Floor - Classroom - 202", type: "classroom", x: 82, y: 51, floor: 2 },
  { id: "f2-classroom-203", name: "2nd Floor - Classroom - 203", type: "classroom", x: 76, y: 51, floor: 2 },
  { id: "f2-classroom-204", name: "2nd Floor - Classroom - 204", type: "classroom", x: 70, y: 51, floor: 2 },
  { id: "f2-stairs", name: "2nd Floor - Staircase (Left)", type: "stairs", x: 62, y: 51, floor: 2 },
  { id: "f2-lift", name: "2nd Floor - Lift (Left)", type: "lift", x: 59, y: 51, floor: 2 },
  { id: "f2-classroom-206", name: "2nd Floor - Classroom - 206", type: "classroom", x: 55, y: 51, floor: 2 },
  { id: "f2-classroom-207", name: "2nd Floor - Classroom - 207", type: "classroom", x: 49, y: 51, floor: 2 },
  { id: "f2-lift-2", name: "2nd Floor - Lift (Right)", type: "lift", x: 40, y: 51, floor: 2 },
  { id: "f2-stairs-2", name: "2nd Floor - Staircase (Right)", type: "stairs", x: 36, y: 51, floor: 2 },
  { id: "f2-classroom-209", name: "2nd Floor - Classroom - 209", type: "classroom", x: 30, y: 51, floor: 2 },
  { id: "f2-classroom-210", name: "2nd Floor - Classroom - 210", type: "classroom", x: 24, y: 51, floor: 2 },
  { id: "f2-classroom-211", name: "2nd Floor - Classroom - 211", type: "classroom", x: 18, y: 51, floor: 2 },

  // Center bottom rooms
  { id: "f2-dept-ce-hod-205", name: "2nd Floor - Dept of CE HOD - 205", type: "classroom", x: 69, y: 26, floor: 2 },
  { id: "f2-staffroom-208", name: "2nd Floor - Staffroom - 208", type: "facility", x: 40, y: 26, floor: 2 },

  // Right Wing (vertical stack)
  { id: "f2-classroom-216", name: "2nd Floor - Classroom - 216", type: "classroom", x: 7, y: 85, floor: 2 },
  { id: "f2-lab-215", name: "2nd Floor - LAB - 215", type: "lab", x: 7, y: 67, floor: 2 },
  { id: "f2-toilet-214", name: "2nd Floor - Toilet - 214", type: "facility", x: 7, y: 51, floor: 2 },
  { id: "f2-toilet-213", name: "2nd Floor - Toilet - 213", type: "facility", x: 7, y: 38, floor: 2 },
  { id: "f2-classroom-212", name: "2nd Floor - Classroom - 212", type: "classroom", x: 7, y: 20, floor: 2 },

  // Corridor Waypoints - Main Horizontal Corridor at y = 62%
  { id: "f2-c-left", name: "2nd Floor - Corridor Left End", type: "corridor", x: 88, y: 38, floor: 2 },
  { id: "f2-c-202", name: "2nd Floor - Corridor near Classroom 202", type: "corridor", x: 82, y: 38, floor: 2 },
  { id: "f2-c-203", name: "2nd Floor - Corridor near Classroom 203", type: "corridor", x: 76, y: 38, floor: 2 },
  { id: "f2-c-204", name: "2nd Floor - Corridor near Classroom 204", type: "corridor", x: 70, y: 38, floor: 2 },
  { id: "f2-c-stairs-left", name: "2nd Floor - Corridor near Left Stairs", type: "corridor", x: 62, y: 38, floor: 2 },
  { id: "f2-c-lift-left", name: "2nd Floor - Corridor near Left Lift", type: "corridor", x: 59, y: 38, floor: 2 },
  { id: "f2-c-206", name: "2nd Floor - Corridor near Classroom 206", type: "corridor", x: 55, y: 38, floor: 2 },
  { id: "f2-c-207", name: "2nd Floor - Corridor near Classroom 207", type: "corridor", x: 49, y: 38, floor: 2 },
  { id: "f2-c-lift-right", name: "2nd Floor - Corridor near Right Lift", type: "corridor", x: 40, y: 38, floor: 2 },
  { id: "f2-c-stairs-right", name: "2nd Floor - Corridor near Right Stairs", type: "corridor", x: 36, y: 38, floor: 2 },
  { id: "f2-c-209", name: "2nd Floor - Corridor near Classroom 209", type: "corridor", x: 30, y: 38, floor: 2 },
  { id: "f2-c-210", name: "2nd Floor - Corridor near Classroom 210", type: "corridor", x: 24, y: 38, floor: 2 },
  { id: "f2-c-211", name: "2nd Floor - Corridor near Classroom 211", type: "corridor", x: 18, y: 38, floor: 2 },
  { id: "f2-c-right", name: "2nd Floor - Corridor Right End", type: "corridor", x: 12, y: 38, floor: 2 },

  // Corridor Waypoints - Left Wing Vertical Corridor Stack (runs along x = 12%)
  { id: "f2-c-left-vertical-toilet", name: "2nd Floor - Left Corridor near Toilet", type: "corridor", x: 88, y: 88, floor: 2 },
  { id: "f2-c-left-vertical-library", name: "2nd Floor - Left Corridor near Library", type: "corridor", x: 88, y: 51, floor: 2 },

  // Corridor Waypoints - Right Wing Vertical Corridor Stack (runs along x = 88%)
  { id: "f2-c-right-vertical-216", name: "2nd Floor - Right Corridor near Classroom 216", type: "corridor", x: 12, y: 85, floor: 2 },
  { id: "f2-c-right-vertical-215", name: "2nd Floor - Right Corridor near LAB 215", type: "corridor", x: 12, y: 67, floor: 2 },
  { id: "f2-c-right-vertical-214", name: "2nd Floor - Right Corridor near Toilet 214", type: "corridor", x: 12, y: 51, floor: 2 },
  { id: "f2-c-right-vertical-bottom", name: "2nd Floor - Right Corridor near Classroom 212", type: "corridor", x: 12, y: 20, floor: 2 },
];

const secondConnections: Connection[] = [
  // Main Horizontal Corridor segments (left to right)
  { from: "f2-c-left", to: "f2-c-202", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f2-c-202", to: "f2-c-203", distance: 4, direction: "Continue straight past Classroom 202" },
  { from: "f2-c-203", to: "f2-c-204", distance: 4, direction: "Continue past Classroom 203" },
  { from: "f2-c-204", to: "f2-c-stairs-left", distance: 5, direction: "Continue past Classroom 204" },
  { from: "f2-c-stairs-left", to: "f2-c-lift-left", distance: 2, direction: "Walk past the Staircase" },
  { from: "f2-c-lift-left", to: "f2-c-206", distance: 3, direction: "Continue past the Lift" },
  { from: "f2-c-206", to: "f2-c-207", distance: 4, direction: "Continue past Classroom 206" },
  { from: "f2-c-207", to: "f2-c-lift-right", distance: 5, direction: "Continue past Classroom 207" },
  { from: "f2-c-lift-right", to: "f2-c-stairs-right", distance: 2, direction: "Continue past the Lift" },
  { from: "f2-c-stairs-right", to: "f2-c-209", distance: 4, direction: "Walk past the Staircase" },
  { from: "f2-c-209", to: "f2-c-210", distance: 4, direction: "Continue past Classroom 209" },
  { from: "f2-c-210", to: "f2-c-211", distance: 4, direction: "Continue past Classroom 210" },
  { from: "f2-c-211", to: "f2-c-right", distance: 4, direction: "Walk to the end of the corridor" },

  // Left Wing vertical corridor segments
  { from: "f2-c-left", to: "f2-c-left-vertical-library", distance: 8, direction: "Go up the left corridor stack" },
  { from: "f2-c-left-vertical-library", to: "f2-c-left-vertical-toilet", distance: 20, direction: "Continue up the corridor past the Library" },

  // Right Wing vertical corridor segments
  { from: "f2-c-right", to: "f2-c-right-vertical-214", distance: 8, direction: "Go up the right corridor stack" },
  { from: "f2-c-right-vertical-214", to: "f2-c-right-vertical-215", distance: 10, direction: "Continue up past Toilet 214" },
  { from: "f2-c-right-vertical-215", to: "f2-c-right-vertical-216", distance: 11, direction: "Continue up past LAB 215" },
  { from: "f2-c-right", to: "f2-c-right-vertical-bottom", distance: 11, direction: "Go down the right corridor stack" },

  // Connect rooms to corridor waypoints
  // Left Wing stack
  { from: "f2-c-left-vertical-toilet", to: "f2-toilet-left", distance: 3, direction: "Enter Toilet" },
  { from: "f2-c-left-vertical-library", to: "f2-library", distance: 3, direction: "Enter the Library" },

  // Top Center rooms
  { from: "f2-c-202", to: "f2-classroom-202", distance: 8, direction: "Enter Classroom - 202" },
  { from: "f2-c-203", to: "f2-classroom-203", distance: 8, direction: "Enter Classroom - 203" },
  { from: "f2-c-204", to: "f2-classroom-204", distance: 8, direction: "Enter Classroom - 204" },
  { from: "f2-c-stairs-left", to: "f2-stairs", distance: 8, direction: "Walk to the Staircase" },
  { from: "f2-c-lift-left", to: "f2-lift", distance: 8, direction: "Step into the Lift" },
  { from: "f2-c-206", to: "f2-classroom-206", distance: 8, direction: "Enter Classroom - 206" },
  { from: "f2-c-207", to: "f2-classroom-207", distance: 8, direction: "Enter Classroom - 207" },
  { from: "f2-c-lift-right", to: "f2-lift-2", distance: 8, direction: "Step into the Lift" },
  { from: "f2-c-stairs-right", to: "f2-stairs-2", distance: 8, direction: "Walk to the Staircase" },
  { from: "f2-c-209", to: "f2-classroom-209", distance: 8, direction: "Enter Classroom - 209" },
  { from: "f2-c-210", to: "f2-classroom-210", distance: 8, direction: "Enter Classroom - 210" },
  { from: "f2-c-211", to: "f2-classroom-211", distance: 8, direction: "Enter Classroom - 211" },

  // Bottom Center rooms
  { from: "f2-c-204", to: "f2-dept-ce-hod-205", distance: 10, direction: "Enter Dept of CE HOD - 205" },
  { from: "f2-c-lift-right", to: "f2-staffroom-208", distance: 10, direction: "Enter Staffroom - 208" },

  // Right Wing stack
  { from: "f2-c-right-vertical-216", to: "f2-classroom-216", distance: 3, direction: "Enter Classroom - 216" },
  { from: "f2-c-right-vertical-215", to: "f2-lab-215", distance: 3, direction: "Enter LAB - 215" },
  { from: "f2-c-right-vertical-214", to: "f2-toilet-214", distance: 3, direction: "Enter Toilet - 214" },
  { from: "f2-c-right", to: "f2-toilet-213", distance: 3, direction: "Enter Toilet - 213" },
  { from: "f2-c-right-vertical-bottom", to: "f2-classroom-212", distance: 3, direction: "Enter Classroom - 212" },

  // Secondary Lift/Stairs Inter-floor connections
  { from: "f2-lift-2", to: "f1-lift-2", distance: 5, direction: "Take the Lift down from 2nd Floor to 1st Floor" },
{ from: "f1-lift-2", to: "f2-lift-2", distance: 5, direction: "Take the Lift up from 1st Floor to 2nd Floor" },
  { from: "f2-stairs-2", to: "f1-stairs-2", distance: 7, direction: "Take the Stairs down from 2nd Floor to 1st Floor" },
  { from: "f1-stairs-2", to: "f2-stairs-2", distance: 7, direction: "Take the Stairs up from 2nd Floor to 1st Floor" },
];

const thirdLocations: Location[] = [
  // Right Wing vertical stack (x≈93%, rooms along right side of image)
  { id: "f3-boys-toilet-301", name: "3rd Floor - Boys Toilet 301", type: "facility", x: 93, y: 86, floor: 3 },
  { id: "f3-director-mba-303", name: "3rd Floor - Director MBA 303", type: "classroom", x: 93, y: 67, floor: 3 },
  { id: "f3-cr-304", name: "3rd Floor - CR 304", type: "classroom", x: 93, y: 55, floor: 3 },
  { id: "f3-cr-305-hall", name: "3rd Floor - CR - 305 Hall", type: "classroom", x: 93, y: 46, floor: 3 },
  { id: "f3-cr-306", name: "3rd Floor - CR - 306", type: "classroom", x: 93, y: 38, floor: 3 },
  { id: "f3-mba-dept-307", name: "3rd Floor - MBA department CR - 307 class room", type: "classroom", x: 93, y: 25, floor: 3 },
  { id: "f3-cr-308", name: "3rd Floor - C.R - 308", type: "classroom", x: 93, y: 15, floor: 3 },

  // Center rooms (above corridor - these sit below the corridor centerline visually)
  { id: "f3-cr-309", name: "3rd Floor - CR - 309 class room", type: "classroom", x: 71, y: 52, floor: 3 },
  { id: "f3-cr-310", name: "3rd Floor - CR - 310 class room", type: "classroom", x: 65, y: 52, floor: 3 },
  { id: "f3-cr-311", name: "3rd Floor - C.R - 311 class room", type: "classroom", x: 60, y: 52, floor: 3 },
  { id: "f3-stairs", name: "3rd Floor - Staircase (Left)", type: "stairs", x: 55, y: 51, floor: 3 },
  { id: "f3-lift", name: "3rd Floor - Lift (Left)", type: "lift", x: 53, y: 51, floor: 3 },
  { id: "f3-ece-314", name: "3rd Floor - ECE 314 class room", type: "classroom", x: 49, y: 52, floor: 3 },
  { id: "f3-room-315", name: "3rd Floor - 315 class room", type: "classroom", x: 45, y: 52, floor: 3 },
  { id: "f3-room-302", name: "3rd Floor - 302 class room", type: "classroom", x: 41, y: 52, floor: 3 },
  { id: "f3-room-301", name: "3rd Floor - 301 class room", type: "classroom", x: 38, y: 52, floor: 3 },
  { id: "f3-lift-2", name: "3rd Floor - Lift (Right)", type: "lift", x: 35, y: 51, floor: 3 },
  { id: "f3-stairs-2", name: "3rd Floor - Staircase (Right)", type: "stairs", x: 33, y: 51, floor: 3 },
  { id: "f3-cr-319", name: "3rd Floor - CR - 319 class room", type: "classroom", x: 27, y: 52, floor: 3 },
  { id: "f3-cr-320", name: "3rd Floor - CR - 320 class room", type: "classroom", x: 21, y: 52, floor: 3 },

  // Center top rooms (above corridor - these are above the corridor centerline visually)
  { id: "f3-tutorial", name: "3rd Floor - Tutorial", type: "classroom", x: 66, y: 23, floor: 3 },
  { id: "f3-staff-room", name: "3rd Floor - Staff Room", type: "facility", x: 56, y: 23, floor: 3 },
  { id: "f3-dept-ece-hod-318", name: "3rd Floor - Dept ECE HOD-318", type: "classroom", x: 45, y: 23, floor: 3 },

  // Left Wing vertical stack (x≈7%, rooms along left side of image)
  { id: "f3-cr-325", name: "3rd Floor - CR - 325 class room", type: "classroom", x: 7, y: 79, floor: 3 },
  { id: "f3-cred-326-lab", name: "3rd Floor - CRED-326 LAB", type: "lab", x: 7, y: 65, floor: 3 },
  { id: "f3-girls-toilet-302-3", name: "3rd Floor - Girls Toilet 302-3", type: "facility", x: 7, y: 55, floor: 3 },
  { id: "f3-boys-toilet-302-2", name: "3rd Floor - Boys Toilet 302-2", type: "facility", x: 7, y: 48, floor: 3 },
  { id: "f3-cr-321", name: "3rd Floor - CR - 321 class room", type: "classroom", x: 7, y: 20, floor: 3 },

  // Corridor Waypoints - Main Horizontal Corridor at y≈38% (pixel y≈292)
  { id: "f3-c-left", name: "3rd Floor - Corridor Right End", type: "corridor", x: 88, y: 38, floor: 3 },
  { id: "f3-c-309", name: "3rd Floor - Corridor near CR-309", type: "corridor", x: 71, y: 38, floor: 3 },
  { id: "f3-c-310", name: "3rd Floor - Corridor near CR-310", type: "corridor", x: 65, y: 38, floor: 3 },
  { id: "f3-c-311", name: "3rd Floor - Corridor near CR-311", type: "corridor", x: 60, y: 38, floor: 3 },
  { id: "f3-c-stairs-left", name: "3rd Floor - Corridor near Left Stairs", type: "corridor", x: 55, y: 38, floor: 3 },
  { id: "f3-c-lift-left", name: "3rd Floor - Corridor near Left Lift", type: "corridor", x: 53, y: 38, floor: 3 },
  { id: "f3-c-ece314", name: "3rd Floor - Corridor near ECE 314", type: "corridor", x: 49, y: 38, floor: 3 },
  { id: "f3-c-315", name: "3rd Floor - Corridor near Room 315", type: "corridor", x: 45, y: 38, floor: 3 },
  { id: "f3-c-302", name: "3rd Floor - Corridor near Room 302", type: "corridor", x: 41, y: 38, floor: 3 },
  { id: "f3-c-301", name: "3rd Floor - Corridor near Room 301", type: "corridor", x: 38, y: 38, floor: 3 },
  { id: "f3-c-lift-right", name: "3rd Floor - Corridor near Right Lift", type: "corridor", x: 35, y: 38, floor: 3 },
  { id: "f3-c-stairs-right", name: "3rd Floor - Corridor near Right Stairs", type: "corridor", x: 33, y: 38, floor: 3 },
  { id: "f3-c-319", name: "3rd Floor - Corridor near CR-319", type: "corridor", x: 27, y: 38, floor: 3 },
  { id: "f3-c-320", name: "3rd Floor - Corridor near CR-320", type: "corridor", x: 21, y: 38, floor: 3 },
  { id: "f3-c-right", name: "3rd Floor - Corridor Left End", type: "corridor", x: 12, y: 38, floor: 3 },

  // Corridor Waypoints - Top rooms exits (above corridor)
  { id: "f3-c-tutorial", name: "3rd Floor - Corridor near Tutorial", type: "corridor", x: 66, y: 38, floor: 3 },
  { id: "f3-c-staff-room", name: "3rd Floor - Corridor near Staff Room", type: "corridor", x: 56, y: 38, floor: 3 },
  { id: "f3-c-ece-hod", name: "3rd Floor - Corridor near Dept ECE HOD", type: "corridor", x: 45, y: 38, floor: 3 },

  // Corridor Waypoints - Right Wing Vertical Corridor (x≈88%)
  { id: "f3-c-left-vertical-washroom", name: "3rd Floor - Right Corridor near Toilet 301", type: "corridor", x: 88, y: 83, floor: 3 },
  { id: "f3-c-left-vertical-303", name: "3rd Floor - Right Corridor near Director 303", type: "corridor", x: 88, y: 67, floor: 3 },
  { id: "f3-c-left-vertical-304", name: "3rd Floor - Right Corridor near CR-304", type: "corridor", x: 88, y: 55, floor: 3 },
  { id: "f3-c-left-vertical-305", name: "3rd Floor - Right Corridor near CR-305", type: "corridor", x: 88, y: 46, floor: 3 },
  { id: "f3-c-left-vertical-306", name: "3rd Floor - Right Corridor near CR-306", type: "corridor", x: 88, y: 38, floor: 3 },
  { id: "f3-c-left-vertical-307", name: "3rd Floor - Right Corridor near CR-307", type: "corridor", x: 88, y: 25, floor: 3 },
  { id: "f3-c-left-vertical-308", name: "3rd Floor - Right Corridor near CR-308", type: "corridor", x: 88, y: 15, floor: 3 },

  // Corridor Waypoints - Left Wing Vertical Corridor (x≈12%)
  { id: "f3-c-right-vertical-325", name: "3rd Floor - Left Corridor near CR-325", type: "corridor", x: 12, y: 79, floor: 3 },
  { id: "f3-c-right-vertical-lab", name: "3rd Floor - Left Corridor near Lab", type: "corridor", x: 12, y: 65, floor: 3 },
  { id: "f3-c-right-vertical-girls", name: "3rd Floor - Left Corridor near Girls Toilet", type: "corridor", x: 12, y: 55, floor: 3 },
  { id: "f3-c-right-vertical-boys", name: "3rd Floor - Left Corridor near Boys Toilet", type: "corridor", x: 12, y: 48, floor: 3 },
  { id: "f3-c-right-vertical-bottom", name: "3rd Floor - Left Corridor near CR-321", type: "corridor", x: 12, y: 20, floor: 3 },
];

const thirdConnections: Connection[] = [
  // Main Horizontal Corridor segments (left to right)
  { from: "f3-c-left", to: "f3-c-309", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f3-c-309", to: "f3-c-310", distance: 4, direction: "Continue straight past CR-309" },
  { from: "f3-c-310", to: "f3-c-311", distance: 4, direction: "Continue past CR-310" },
  { from: "f3-c-311", to: "f3-c-tutorial", distance: 2, direction: "Continue past CR-311" },
  { from: "f3-c-tutorial", to: "f3-c-stairs-left", distance: 2, direction: "Continue past Tutorial room" },
  { from: "f3-c-stairs-left", to: "f3-c-lift-left", distance: 2, direction: "Walk past the Staircase" },
  { from: "f3-c-lift-left", to: "f3-c-staff-room", distance: 2, direction: "Continue past the Lift" },
  { from: "f3-c-staff-room", to: "f3-c-ece314", distance: 2, direction: "Continue past the Staff Room" },
  { from: "f3-c-ece314", to: "f3-c-315", distance: 2, direction: "Continue past ECE 314" },
  { from: "f3-c-315", to: "f3-c-302", distance: 2, direction: "Continue past Room 315" },
  { from: "f3-c-302", to: "f3-c-ece-hod", distance: 1, direction: "Continue past Room 302" },
  { from: "f3-c-ece-hod", to: "f3-c-301", distance: 1, direction: "Continue past Dept ECE HOD" },
  { from: "f3-c-301", to: "f3-c-lift-right", distance: 1, direction: "Continue past Room 301" },
  { from: "f3-c-lift-right", to: "f3-c-stairs-right", distance: 2, direction: "Continue past the Lift" },
  { from: "f3-c-stairs-right", to: "f3-c-319", distance: 4, direction: "Walk past the Staircase" },
  { from: "f3-c-319", to: "f3-c-320", distance: 4, direction: "Continue past CR-319" },
  { from: "f3-c-320", to: "f3-c-right", distance: 4, direction: "Walk to the end of the corridor" },

  // Left Wing vertical corridor segments
  { from: "f3-c-left", to: "f3-c-left-vertical-306", distance: 8, direction: "Go up the left corridor stack" },
  { from: "f3-c-left-vertical-306", to: "f3-c-left-vertical-305", distance: 8, direction: "Continue up the corridor" },
  { from: "f3-c-left-vertical-305", to: "f3-c-left-vertical-304", distance: 8, direction: "Continue up past CR-305" },
  { from: "f3-c-left-vertical-304", to: "f3-c-left-vertical-303", distance: 8, direction: "Continue up past CR-304" },
  { from: "f3-c-left-vertical-303", to: "f3-c-left-vertical-washroom", distance: 8, direction: "Continue up to the end" },
  { from: "f3-c-left", to: "f3-c-left-vertical-307", distance: 3, direction: "Go down the left corridor stack" },
  { from: "f3-c-left-vertical-307", to: "f3-c-left-vertical-308", distance: 7, direction: "Continue down the corridor" },

  // Right Wing vertical corridor segments
  { from: "f3-c-right", to: "f3-c-right-vertical-boys", distance: 8, direction: "Go up the right corridor stack" },
  { from: "f3-c-right-vertical-boys", to: "f3-c-right-vertical-girls", distance: 8, direction: "Continue up past Boys Toilet" },
  { from: "f3-c-right-vertical-girls", to: "f3-c-right-vertical-lab", distance: 10, direction: "Continue up past Girls Toilet" },
  { from: "f3-c-right-vertical-lab", to: "f3-c-right-vertical-325", distance: 11, direction: "Continue up past the Lab" },
  { from: "f3-c-right", to: "f3-c-right-vertical-bottom", distance: 11, direction: "Go down the right corridor stack" },

  // Connect rooms to corridor waypoints
  // Left Wing stack
  { from: "f3-c-left-vertical-washroom", to: "f3-boys-toilet-301", distance: 3, direction: "Enter Boys Toilet 301" },
  { from: "f3-c-left-vertical-303", to: "f3-director-mba-303", distance: 3, direction: "Enter Director MBA 303" },
  { from: "f3-c-left-vertical-304", to: "f3-cr-304", distance: 3, direction: "Enter CR 304" },
  { from: "f3-c-left-vertical-305", to: "f3-cr-305-hall", distance: 3, direction: "Enter CR - 305 Hall" },
  { from: "f3-c-left-vertical-306", to: "f3-cr-306", distance: 3, direction: "Enter CR - 306" },
  { from: "f3-c-left-vertical-307", to: "f3-mba-dept-307", distance: 3, direction: "Enter MBA department CR - 307 class room" },
  { from: "f3-c-left-vertical-308", to: "f3-cr-308", distance: 3, direction: "Enter C.R - 308" },

  // Top Center rooms
  { from: "f3-c-309", to: "f3-cr-309", distance: 8, direction: "Enter CR - 309 class room" },
  { from: "f3-c-310", to: "f3-cr-310", distance: 8, direction: "Enter CR - 310 class room" },
  { from: "f3-c-311", to: "f3-cr-311", distance: 8, direction: "Enter C.R - 311 class room" },
  { from: "f3-c-stairs-left", to: "f3-stairs", distance: 8, direction: "Walk to the Staircase" },
  { from: "f3-c-lift-left", to: "f3-lift", distance: 8, direction: "Step into the Lift" },
  { from: "f3-c-ece314", to: "f3-ece-314", distance: 8, direction: "Enter ECE 314 class room" },
  { from: "f3-c-315", to: "f3-room-315", distance: 8, direction: "Enter 315 class room" },
  { from: "f3-c-302", to: "f3-room-302", distance: 8, direction: "Enter 302 class room" },
  { from: "f3-c-301", to: "f3-room-301", distance: 8, direction: "Enter 301 class room" },
  { from: "f3-c-lift-right", to: "f3-lift-2", distance: 8, direction: "Step into the Lift" },
  { from: "f3-c-stairs-right", to: "f3-stairs-2", distance: 8, direction: "Walk to the Staircase" },
  { from: "f3-c-319", to: "f3-cr-319", distance: 8, direction: "Enter CR - 319 class room" },
  { from: "f3-c-320", to: "f3-cr-320", distance: 8, direction: "Enter CR - 320 class room" },

  // Bottom Center rooms
  { from: "f3-c-tutorial", to: "f3-tutorial", distance: 10, direction: "Enter Tutorial" },
  { from: "f3-c-staff-room", to: "f3-staff-room", distance: 10, direction: "Enter Staff Room" },
  { from: "f3-c-ece-hod", to: "f3-dept-ece-hod-318", distance: 10, direction: "Enter Dept ECE HOD-318" },

  // Right Wing stack
  { from: "f3-c-right-vertical-325", to: "f3-cr-325", distance: 3, direction: "Enter CR - 325 class room" },
  { from: "f3-c-right-vertical-lab", to: "f3-cred-326-lab", distance: 3, direction: "Enter CRED-326 LAB" },
  { from: "f3-c-right-vertical-girls", to: "f3-girls-toilet-302-3", distance: 3, direction: "Enter Girls Toilet 302-3" },
  { from: "f3-c-right-vertical-boys", to: "f3-boys-toilet-302-2", distance: 3, direction: "Enter Boys Toilet 302-2" },
  { from: "f3-c-right-vertical-bottom", to: "f3-cr-321", distance: 3, direction: "Enter CR - 321 class room" },

  // Secondary Lift/Stairs Inter-floor connections
  { from: "f3-lift-2", to: "f2-lift-2", distance: 5, direction: "Take the Lift down from 3rd Floor to 2nd Floor" },
  { from: "f2-lift-2", to: "f3-lift-2", distance: 5, direction: "Take the Lift up from 2nd Floor to 3rd Floor" },
  { from: "f3-stairs-2", to: "f2-stairs-2", distance: 7, direction: "Take the Stairs down from 3rd Floor to 2nd Floor" },
  { from: "f2-stairs-2", to: "f3-stairs-2", distance: 7, direction: "Take the Stairs up from 2nd Floor to 3rd Floor" },
];

// Dedicated First Floor Locations (calibrated to the new landscape image)
const firstLocations: Location[] = [
  { id: "f1-boys-toilet-101", name: "1st Floor - Boys toilet - 101", type: "facility", x: 93, y: 88, floor: 1 },
  { id: "f1-lh-102", name: "1st Floor - LH-102", type: "classroom", x: 93, y: 75, floor: 1 },
  { id: "f1-lh-103", name: "1st Floor - LH103", type: "classroom", x: 93, y: 63, floor: 1 },
  { id: "f1-lh-104", name: "1st Floor - LH-104", type: "classroom", x: 93, y: 51, floor: 1 },
  { id: "f1-lh-105", name: "1st Floor - LH-105", type: "classroom", x: 93, y: 20, floor: 1 },

  // Center top rooms (above main corridor)
  { id: "f1-lh-106", name: "1st Floor - LH-106", type: "classroom", x: 82, y: 51, floor: 1 },
  { id: "f1-lh-107", name: "1st Floor - LH-107", type: "classroom", x: 76, y: 51, floor: 1 },
  { id: "f1-lh-108", name: "1st Floor - LH-108", type: "classroom", x: 70, y: 51, floor: 1 },
  { id: "f1-stairs", name: "1st Floor - Staircase (Left)", type: "stairs", x: 62, y: 51, floor: 1 },
  { id: "f1-lift", name: "1st Floor - Lift (Left)", type: "lift", x: 59, y: 51, floor: 1 },
  { id: "f1-board-room", name: "1st Floor - Board room", type: "classroom", x: 55, y: 51, floor: 1 },
  { id: "f1-room-middle", name: "1st Floor - Room", type: "classroom", x: 49, y: 51, floor: 1 },
  { id: "f1-principal-chamber", name: "1st Floor - Principal chamber", type: "classroom", x: 44, y: 51, floor: 1 },
  { id: "f1-lift-2", name: "1st Floor - Lift (Right)", type: "lift", x: 40, y: 51, floor: 1 },
  { id: "f1-stairs-2", name: "1st Floor - Staircase (Right)", type: "stairs", x: 36, y: 51, floor: 1 },
  { id: "f1-lh-114", name: "1st Floor - LH-114", type: "classroom", x: 30, y: 51, floor: 1 },
  { id: "f1-placement-training", name: "1st Floor - Placement and Training Cell", type: "classroom", x: 24, y: 51, floor: 1 },
  { id: "f1-lh-110", name: "1st Floor - LH-110", type: "classroom", x: 18, y: 51, floor: 1 },

  // Center bottom rooms
  { id: "f1-accounts-109", name: "1st Floor - Accounts ROOM - 109", type: "classroom", x: 69, y: 26, floor: 1 },
  { id: "f1-admission-113", name: "1st Floor - Admission section - 113", type: "classroom", x: 40, y: 26, floor: 1 },

  // Right Wing (vertical stack)
  { id: "f1-seminar-120", name: "1st Floor - Seminar hall - 120", type: "classroom", x: 7, y: 85, floor: 1 },
  { id: "f1-girls-toilet-119", name: "1st Floor - Girls toilet - 119", type: "facility", x: 7, y: 67, floor: 1 },
  { id: "f1-boys-toilet-118", name: "1st Floor - Boys toilet - 118", type: "facility", x: 7, y: 51, floor: 1 },
  { id: "f1-hod-staff-room", name: "1st Floor - HOD and STAFF ROOM", type: "facility", x: 7, y: 20, floor: 1 },

  // Corridor Waypoints - Main Horizontal Corridor at y = 62%
  { id: "f1-c-left", name: "1st Floor - Corridor Left End", type: "corridor", x: 88, y: 38, floor: 1 },
  { id: "f1-c-lh106", name: "1st Floor - Corridor near LH-106", type: "corridor", x: 82, y: 38, floor: 1 },
  { id: "f1-c-lh107", name: "1st Floor - Corridor near LH-107", type: "corridor", x: 76, y: 38, floor: 1 },
  { id: "f1-c-lh108", name: "1st Floor - Corridor near LH-108", type: "corridor", x: 70, y: 38, floor: 1 },
  { id: "f1-c-stairs-left", name: "1st Floor - Corridor near Left Stairs", type: "corridor", x: 62, y: 38, floor: 1 },
  { id: "f1-c-lift-left", name: "1st Floor - Corridor near Left Lift", type: "corridor", x: 59, y: 38, floor: 1 },
  { id: "f1-c-board-room", name: "1st Floor - Corridor near Board room", type: "corridor", x: 55, y: 38, floor: 1 },
  { id: "f1-c-room-middle", name: "1st Floor - Corridor near Room", type: "corridor", x: 49, y: 38, floor: 1 },
  { id: "f1-c-principal-chamber", name: "1st Floor - Corridor near Principal chamber", type: "corridor", x: 44, y: 38, floor: 1 },
  { id: "f1-c-lift-right", name: "1st Floor - Corridor near Right Lift", type: "corridor", x: 40, y: 38, floor: 1 },
  { id: "f1-c-stairs-right", name: "1st Floor - Corridor near Right Stairs", type: "corridor", x: 36, y: 38, floor: 1 },
  { id: "f1-c-lh114", name: "1st Floor - Corridor near LH-114", type: "corridor", x: 30, y: 38, floor: 1 },
  { id: "f1-c-placement-training", name: "1st Floor - Corridor near Placement and Training Cell", type: "corridor", x: 24, y: 38, floor: 1 },
  { id: "f1-c-lh110", name: "1st Floor - Corridor near LH-110", type: "corridor", x: 18, y: 38, floor: 1 },
  { id: "f1-c-right", name: "1st Floor - Corridor Right End", type: "corridor", x: 12, y: 38, floor: 1 },

  // Corridor Waypoints - Left Wing Vertical Corridor Stack (runs along x = 12%)
  { id: "f1-c-left-vertical-washroom", name: "1st Floor - Left Corridor near Boys toilet", type: "corridor", x: 88, y: 88, floor: 1 },
  { id: "f1-c-left-vertical-lh102", name: "1st Floor - Left Corridor near LH-102", type: "corridor", x: 88, y: 75, floor: 1 },
  { id: "f1-c-left-vertical-lh103", name: "1st Floor - Left Corridor near LH103", type: "corridor", x: 88, y: 63, floor: 1 },
  { id: "f1-c-left-vertical-lh104", name: "1st Floor - Left Corridor near LH-104", type: "corridor", x: 88, y: 51, floor: 1 },
  { id: "f1-c-left-vertical-bottom", name: "1st Floor - Left Corridor near LH-105", type: "corridor", x: 88, y: 20, floor: 1 },

  // Corridor Waypoints - Right Wing Vertical Corridor Stack (runs along x = 88%)
  { id: "f1-c-right-vertical-seminar", name: "1st Floor - Right Corridor near Seminar hall", type: "corridor", x: 12, y: 85, floor: 1 },
  { id: "f1-c-right-vertical-girls", name: "1st Floor - Right Corridor near Girls toilet", type: "corridor", x: 12, y: 67, floor: 1 },
  { id: "f1-c-right-vertical-boys", name: "1st Floor - Right Corridor near Boys toilet", type: "corridor", x: 12, y: 51, floor: 1 },
  { id: "f1-c-right-vertical-bottom", name: "1st Floor - Right Corridor near HOD and STAFF ROOM", type: "corridor", x: 12, y: 20, floor: 1 },
];

const firstConnections: Connection[] = [
  // Main Horizontal Corridor segments (left to right)
  { from: "f1-c-left", to: "f1-c-lh106", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f1-c-lh106", to: "f1-c-lh107", distance: 4, direction: "Continue straight past LH-106" },
  { from: "f1-c-lh107", to: "f1-c-lh108", distance: 4, direction: "Continue past LH-107" },
  { from: "f1-c-lh108", to: "f1-c-stairs-left", distance: 5, direction: "Continue past LH-108" },
  { from: "f1-c-stairs-left", to: "f1-c-lift-left", distance: 2, direction: "Walk past the Staircase" },
  { from: "f1-c-lift-left", to: "f1-c-board-room", distance: 3, direction: "Continue past the Lift" },
  { from: "f1-c-board-room", to: "f1-c-room-middle", distance: 4, direction: "Continue past Board room" },
  { from: "f1-c-room-middle", to: "f1-c-principal-chamber", distance: 3, direction: "Continue past Room" },
  { from: "f1-c-principal-chamber", to: "f1-c-lift-right", distance: 3, direction: "Continue past Principal chamber" },
  { from: "f1-c-lift-right", to: "f1-c-stairs-right", distance: 2, direction: "Continue past the Lift" },
  { from: "f1-c-stairs-right", to: "f1-c-lh114", distance: 4, direction: "Walk past the Staircase" },
  { from: "f1-c-lh114", to: "f1-c-placement-training", distance: 4, direction: "Continue past LH-114" },
  { from: "f1-c-placement-training", to: "f1-c-lh110", distance: 4, direction: "Continue past Placement and Training Cell" },
  { from: "f1-c-lh110", to: "f1-c-right", distance: 4, direction: "Walk to the end of the corridor" },

  // Left Wing vertical corridor segments
  { from: "f1-c-left", to: "f1-c-left-vertical-lh104", distance: 8, direction: "Go up the left corridor stack" },
  { from: "f1-c-left-vertical-lh104", to: "f1-c-left-vertical-lh103", distance: 8, direction: "Continue up the corridor" },
  { from: "f1-c-left-vertical-lh103", to: "f1-c-left-vertical-lh102", distance: 8, direction: "Continue up past LH-103" },
  { from: "f1-c-left-vertical-lh102", to: "f1-c-left-vertical-washroom", distance: 8, direction: "Continue up past LH-102" },
  { from: "f1-c-left", to: "f1-c-left-vertical-bottom", distance: 11, direction: "Go down the left corridor stack" },

  // Right Wing vertical corridor segments
  { from: "f1-c-right", to: "f1-c-right-vertical-boys", distance: 8, direction: "Go up the right corridor stack" },
  { from: "f1-c-right-vertical-boys", to: "f1-c-right-vertical-girls", distance: 10, direction: "Continue up past Boys toilet" },
  { from: "f1-c-right-vertical-girls", to: "f1-c-right-vertical-seminar", distance: 11, direction: "Continue up past Girls toilet" },
  { from: "f1-c-right", to: "f1-c-right-vertical-bottom", distance: 11, direction: "Go down the right corridor stack" },

  // Connect rooms to corridor waypoints
  // Left Wing stack
  { from: "f1-c-left-vertical-washroom", to: "f1-boys-toilet-101", distance: 3, direction: "Enter Boys toilet - 101" },
  { from: "f1-c-left-vertical-lh102", to: "f1-lh-102", distance: 3, direction: "Enter LH-102" },
  { from: "f1-c-left-vertical-lh103", to: "f1-lh-103", distance: 3, direction: "Enter LH103" },
  { from: "f1-c-left-vertical-lh104", to: "f1-lh-104", distance: 3, direction: "Enter LH-104" },
  { from: "f1-c-left-vertical-bottom", to: "f1-lh-105", distance: 3, direction: "Enter LH-105" },

  // Top Center rooms
  { from: "f1-c-lh106", to: "f1-lh-106", distance: 8, direction: "Enter LH-106" },
  { from: "f1-c-lh107", to: "f1-lh-107", distance: 8, direction: "Enter LH-107" },
  { from: "f1-c-lh108", to: "f1-lh-108", distance: 8, direction: "Enter LH-108" },
  { from: "f1-c-stairs-left", to: "f1-stairs", distance: 8, direction: "Walk to the Staircase" },
  { from: "f1-c-lift-left", to: "f1-lift", distance: 8, direction: "Step into the Lift" },
  { from: "f1-c-board-room", to: "f1-board-room", distance: 8, direction: "Enter Board room" },
  { from: "f1-c-room-middle", to: "f1-room-middle", distance: 8, direction: "Enter Room" },
  { from: "f1-c-principal-chamber", to: "f1-principal-chamber", distance: 8, direction: "Enter Principal chamber" },
  { from: "f1-c-lift-right", to: "f1-lift-2", distance: 8, direction: "Step into the Lift" },
  { from: "f1-c-stairs-right", to: "f1-stairs-2", distance: 8, direction: "Walk to the Staircase" },
  { from: "f1-c-lh114", to: "f1-lh-114", distance: 8, direction: "Enter LH-114" },
  { from: "f1-c-placement-training", to: "f1-placement-training", distance: 8, direction: "Enter Placement and Training Cell" },
  { from: "f1-c-lh110", to: "f1-lh-110", distance: 8, direction: "Enter LH-110" },

  // Bottom Center rooms
  { from: "f1-c-lh108", to: "f1-accounts-109", distance: 10, direction: "Enter Accounts ROOM - 109" },
  { from: "f1-c-lift-right", to: "f1-admission-113", distance: 10, direction: "Enter Admission section - 113" },

  // Right Wing stack
  { from: "f1-c-right-vertical-seminar", to: "f1-seminar-120", distance: 3, direction: "Enter Seminar hall - 120" },
  { from: "f1-c-right-vertical-girls", to: "f1-girls-toilet-119", distance: 3, direction: "Enter Girls toilet - 119" },
  { from: "f1-c-right-vertical-boys", to: "f1-boys-toilet-118", distance: 3, direction: "Enter Boys toilet - 118" },
  { from: "f1-c-right-vertical-bottom", to: "f1-hod-staff-room", distance: 3, direction: "Enter HOD and STAFF ROOM" },

  // Secondary Lift/Stairs Inter-floor connections
  { from: "f1-lift-2", to: "f0-lift-2", distance: 5, direction: "Take the Lift down from 1st Floor to Ground Floor" },
  { from: "f0-lift-2", to: "f1-lift-2", distance: 5, direction: "Take the Lift up from Ground Floor to 1st Floor" },
  { from: "f1-lift-2", to: "f2-lift-2", distance: 5, direction: "Take the Lift up from 1st Floor to 2nd Floor" },
  { from: "f2-lift-2", to: "f1-lift-2", distance: 5, direction: "Take the Lift down from 2nd Floor to 1st Floor" },
  { from: "f1-stairs-2", to: "f0-stairs-2", distance: 7, direction: "Take the Stairs down from 1st Floor to Ground Floor" },
  { from: "f0-stairs-2", to: "f1-stairs-2", distance: 7, direction: "Take the Stairs up from Ground Floor to 1st Floor" },
];

export const locations: Location[] = [...groundLocations, ...firstLocations, ...secondLocations, ...thirdLocations];
export const connections: Connection[] = [...groundConnections, ...firstConnections, ...secondConnections, ...thirdConnections];

// === INTER-FLOOR CONNECTIONS (Lift and Stairs) ===
for (let f = 0; f < 3; f++) {
  const currentFloorName = FLOOR_NAMES[f];
  const nextFloorName = FLOOR_NAMES[f + 1];

  // Lift going up and down
  connections.push({
    from: `f${f}-lift`,
    to: `f${f + 1}-lift`,
    distance: 5,
    direction: `Take the Lift up from ${currentFloorName} to ${nextFloorName}`,
  });
  connections.push({
    from: `f${f + 1}-lift`,
    to: `f${f}-lift`,
    distance: 5,
    direction: `Take the Lift down from ${nextFloorName} to ${currentFloorName}`,
  });

  // Stairs going up and down
  connections.push({
    from: `f${f}-stairs`,
    to: `f${f + 1}-stairs`,
    distance: 7,
    direction: `Take the Stairs up from ${currentFloorName} to ${nextFloorName}`,
  });
  connections.push({
    from: `f${f + 1}-stairs`,
    to: `f${f}-stairs`,
    distance: 7,
    direction: `Take the Stairs down from ${nextFloorName} to ${currentFloorName}`,
  });
}

// Build adjacency graph for pathfinding
function buildGraph(): Map<string, Array<{ node: string; distance: number; direction: string }>> {
  const graph = new Map<string, Array<{ node: string; distance: number; direction: string }>>();

  for (const loc of locations) {
    graph.set(loc.id, []);
  }

  // Pre-build a set of explicit connection pairs to avoid O(N^2) search times
  const explicitPairs = new Set<string>();
  for (const conn of connections) {
    explicitPairs.add(`${conn.from}->${conn.to}`);
  }

  for (const conn of connections) {
    // Add forward edge
    graph.get(conn.from)?.push({
      node: conn.to,
      distance: conn.distance,
      direction: conn.direction,
    });
    
    // Only add reverse edge if there isn't an explicit connection defined in that direction
    const reverseKey = `${conn.to}->${conn.from}`;
    if (!explicitPairs.has(reverseKey)) {
      const fromLoc = locations.find((l) => l.id === conn.from);
      graph.get(conn.to)?.push({
        node: conn.from,
        distance: conn.distance,
        direction: `Go back towards ${fromLoc?.name ?? "previous location"}`,
      });
    }
  }

  return graph;
}

export interface PathResult {
  path: string[];
  totalDistance: number;
  steps: Array<{ from: string; to: string; direction: string; distance: number }>;
}

// Dijkstra's algorithm for shortest path
export function findShortestPath(sourceId: string, destId: string): PathResult | null {
  const graph = buildGraph();
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const directions = new Map<string, string>();
  const stepDistances = new Map<string, number>();
  const unvisited = new Set<string>();

  // Initialize
  for (const loc of locations) {
    distances.set(loc.id, Infinity);
    previous.set(loc.id, null);
    unvisited.add(loc.id);
  }
  distances.set(sourceId, 0);

  while (unvisited.size > 0) {
    // Find minimum distance node
    let minNode: string | null = null;
    let minDist = Infinity;
    for (const node of unvisited) {
      const dist = distances.get(node) ?? Infinity;
      if (dist < minDist) {
        minDist = dist;
        minNode = node;
      }
    }

    if (minNode === null || minDist === Infinity) break;
    if (minNode === destId) break;

    unvisited.delete(minNode);

    const neighbors = graph.get(minNode) ?? [];
    for (const { node: neighbor, distance, direction } of neighbors) {
      if (!unvisited.has(neighbor)) continue;

      const newDist = (distances.get(minNode) ?? Infinity) + distance;
      if (newDist < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, newDist);
        previous.set(neighbor, minNode);
        directions.set(neighbor, direction);
        stepDistances.set(neighbor, distance);
      }
    }
  }

  // Reconstruct path
  if (distances.get(destId) === Infinity) return null;

  const path: string[] = [];
  const steps: Array<{ from: string; to: string; direction: string; distance: number }> = [];
  let current: string | null = destId;

  while (current !== null) {
    path.unshift(current);
    const prev = previous.get(current);
    if (prev !== null && prev !== undefined) {
      steps.unshift({
        from: prev,
        to: current,
        direction: directions.get(current) ?? "",
        distance: stepDistances.get(current) ?? 0,
      });
    }
    current = prev ?? null;
  }

  return {
    path,
    totalDistance: distances.get(destId) ?? 0,
    steps,
  };
}

export function getLocationName(id: string): string {
  return locations.find((l) => l.id === id)?.name ?? id;
}

export function getLocation(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

// Get only selectable locations (not corridor waypoints or staircases directly, except for navigation endpoints)
export function getSelectableLocations(): Location[] {
  return locations.filter((l) => l.type !== "corridor" && l.type !== "stairs");
}
