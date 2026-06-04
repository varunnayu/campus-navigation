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
  { id: "toilet-1", name: "Toilet - 01", type: "facility" as const, x: 12, y: 22 },
  { id: "private-staff-06", name: "Private Staff / Acc - 06", type: "facility" as const, x: 35, y: 22 },
  { id: "cr-05", name: "Class Room C.R - 05", type: "classroom" as const, x: 48, y: 22 },
  { id: "cr-04", name: "Hall C.R - 04", type: "classroom" as const, x: 59, y: 22 },
  { id: "cr-03", name: "Class Room C.R - 03", type: "classroom" as const, x: 67, y: 22 },
  { id: "toilet-2", name: "Toilet - 02", type: "facility" as const, x: 77, y: 22 },

  { id: "cr-08", name: "Class Room C.R - 08", type: "classroom" as const, x: 50, y: 31 },
  { id: "cr-09", name: "Staff Room C.R - 09", type: "classroom" as const, x: 50, y: 40 },
  { id: "cr-11", name: "Class Room C.R - 11", type: "classroom" as const, x: 50, y: 48 },

  { id: "comp-lab-1-2", name: "Computer Lab - 1, 2", type: "lab" as const, x: 36, y: 54 },
  { id: "cc-cn-lab", name: "CC/CN Lab / Admin", type: "lab" as const, x: 54, y: 51 },
  { id: "dbms-fs-lab", name: "DBMS/FS-Lab (Class Room)", type: "lab" as const, x: 54, y: 57 },

  { id: "cr-18", name: "Lab / C.R - 18", type: "classroom" as const, x: 50, y: 69 },
  { id: "cr-19", name: "Class Room C.R - 19", type: "classroom" as const, x: 50, y: 78 },

  { id: "cl-20", name: "Staff Room C.L - 20", type: "facility" as const, x: 32, y: 87 },
  { id: "gr-21", name: "Toilet G.R - 21", type: "facility" as const, x: 45, y: 87 },
  { id: "lab-22", name: "Lab - 22", type: "lab" as const, x: 60, y: 87 },
  { id: "p-lab-23", name: "Class Room P. Lab 23", type: "classroom" as const, x: 73, y: 87 },

  // Core Entrances & Navigation Waypoints
  { id: "main-entrance", name: "Main Entrance", type: "entrance" as const, x: 36, y: 62 },
  { id: "rear-entrance", name: "Rear Entrance", type: "entrance" as const, x: 36, y: 46 },
  { id: "admission-113", name: "Office Section", type: "classroom" as const, x: 36, y: 69 },
  { id: "lift", name: "Lift", type: "lift" as const, x: 45, y: 46 },
  { id: "stairs", name: "Staircase", type: "stairs" as const, x: 45, y: 54 },

  // Corridor Waypoints
  { id: "c_top_1", name: "Top Corridor - Left End", type: "corridor" as const, x: 12, y: 27 },
  { id: "c_top_2", name: "Top Corridor - Left Main", type: "corridor" as const, x: 35, y: 27 },
  { id: "c_top_3", name: "Top Corridor - Center Left", type: "corridor" as const, x: 48, y: 27 },
  { id: "c_top_4", name: "Top Corridor - Center Right", type: "corridor" as const, x: 59, y: 27 },
  { id: "c_top_5", name: "Top Corridor - Right Main", type: "corridor" as const, x: 67, y: 27 },
  { id: "c_top_6", name: "Top Corridor - Right End", type: "corridor" as const, x: 77, y: 27 },

  { id: "c_v_1", name: "Vertical Corridor Junction - Top", type: "corridor" as const, x: 42, y: 27 },
  { id: "c_v_2", name: "Vertical Corridor - Near C.R-08", type: "corridor" as const, x: 42, y: 31 },
  { id: "c_v_3", name: "Vertical Corridor - Near C.R-09", type: "corridor" as const, x: 42, y: 40 },
  { id: "c_v_4", name: "Vertical Corridor - Near Lift & Rear", type: "corridor" as const, x: 42, y: 46 },
  { id: "c_v_5", name: "Vertical Corridor - Near Labs & Stairs", type: "corridor" as const, x: 42, y: 54 },
  { id: "c_v_6", name: "Vertical Corridor - Near Main Entrance", type: "corridor" as const, x: 42, y: 62 },
  { id: "c_v_7", name: "Vertical Corridor - Near C.R-18", type: "corridor" as const, x: 42, y: 69 },
  { id: "c_v_8", name: "Vertical Corridor - Near C.R-19", type: "corridor" as const, x: 42, y: 78 },
  { id: "c_v_9", name: "Vertical Corridor Junction - Bottom", type: "corridor" as const, x: 42, y: 82 },

  { id: "c_mid_left_1", name: "Left Corridor - Near Rear Entrance", type: "corridor" as const, x: 36, y: 46 },
  { id: "c_mid_left_2", name: "Left Corridor - Near Comp Lab", type: "corridor" as const, x: 36, y: 54 },
  { id: "c_mid_left_3", name: "Left Corridor - Near Main Entrance", type: "corridor" as const, x: 36, y: 62 },
  { id: "c_mid_left_4", name: "Left Corridor - Near Office Section", type: "corridor" as const, x: 36, y: 69 },

  { id: "c_bottom_1", name: "Bottom Corridor - Left", type: "corridor" as const, x: 32, y: 82 },
  { id: "c_bottom_2", name: "Bottom Corridor - Center", type: "corridor" as const, x: 45, y: 82 },
  { id: "c_bottom_3", name: "Bottom Corridor - Right Mid", type: "corridor" as const, x: 60, y: 82 },
  { id: "c_bottom_4", name: "Bottom Corridor - Right", type: "corridor" as const, x: 73, y: 82 },
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
  // Left Wing (vertical)
  { id: "f0-boys-washroom", name: "Ground Floor - Boys Washroom", type: "facility", x: 6, y: 23, floor: 0 },
  { id: "f0-lh-13", name: "Ground Floor - LH-13", type: "classroom", x: 6, y: 37, floor: 0 },
  { id: "f0-lh-14", name: "Ground Floor - LH-14", type: "classroom", x: 6, y: 51, floor: 0 },
  { id: "f0-staff-room", name: "Ground Floor - Staff Room", type: "facility", x: 6, y: 65, floor: 0 },

  // Center top rooms
  { id: "f0-lh-15", name: "Ground Floor - LH-15", type: "classroom", x: 16, y: 51, floor: 0 },
  { id: "f0-lh-16", name: "Ground Floor - LH-16", type: "classroom", x: 26, y: 51, floor: 0 },
  { id: "f0-computer-lab-1", name: "Ground Floor - Computer Lab 1", type: "lab", x: 36, y: 51, floor: 0 },
  { id: "f0-stairs", name: "Ground Floor - Staircase (Left)", type: "stairs", x: 45, y: 51, floor: 0 },
  { id: "f0-central-stairs", name: "Ground Floor - Central Stairs/Structure", type: "facility", x: 50, y: 51, floor: 0 },
  { id: "f0-lift", name: "Ground Floor - Lift", type: "lift", x: 54, y: 51, floor: 0 },
  { id: "f0-stairs-right", name: "Ground Floor - Staircase (Right)", type: "stairs", x: 58, y: 51, floor: 0 },
  { id: "f0-lh-17", name: "Ground Floor - LH-17", type: "classroom", x: 65, y: 51, floor: 0 },
  { id: "f0-lh-18", name: "Ground Floor - LH-18", type: "classroom", x: 75, y: 51, floor: 0 },
  { id: "f0-lh-19", name: "Ground Floor - LH-19", type: "classroom", x: 84, y: 51, floor: 0 },

  // Center bottom room
  { id: "f0-computer-lab-2", name: "Ground Floor - Computer Lab - 2", type: "lab", x: 26, y: 78, floor: 0 },

  // Right Wing (vertical)
  { id: "f0-physics-lab", name: "Ground Floor - Physics Lab", type: "lab", x: 94, y: 23, floor: 0 },
  { id: "f0-lh-20", name: "Ground Floor - LH-20", type: "classroom", x: 94, y: 37, floor: 0 },
  { id: "f0-girls-restroom", name: "Ground Floor - Girls Rest Room", type: "facility", x: 94, y: 51, floor: 0 },
  { id: "f0-chemistry-lab", name: "Ground Floor - Chemistry Lab", type: "lab", x: 94, y: 65, floor: 0 },

  // Corridor Waypoints - Horizontal
  { id: "f0-c-left", name: "Ground Floor - Corridor Left End", type: "corridor", x: 11, y: 63, floor: 0 },
  { id: "f0-c-lh15", name: "Ground Floor - Corridor near LH-15", type: "corridor", x: 16, y: 63, floor: 0 },
  { id: "f0-c-lh16", name: "Ground Floor - Corridor near LH-16", type: "corridor", x: 26, y: 63, floor: 0 },
  { id: "f0-c-complab1", name: "Ground Floor - Corridor near Computer Lab 1", type: "corridor", x: 36, y: 63, floor: 0 },
  { id: "f0-c-stairs-left", name: "Ground Floor - Corridor near Left Stairs", type: "corridor", x: 45, y: 63, floor: 0 },
  { id: "f0-c-center", name: "Ground Floor - Corridor Center", type: "corridor", x: 50, y: 63, floor: 0 },
  { id: "f0-c-lift", name: "Ground Floor - Corridor near Lift", type: "corridor", x: 54, y: 63, floor: 0 },
  { id: "f0-c-stairs-right", name: "Ground Floor - Corridor near Right Stairs", type: "corridor", x: 58, y: 63, floor: 0 },
  { id: "f0-c-lh17", name: "Ground Floor - Corridor near LH-17", type: "corridor", x: 65, y: 63, floor: 0 },
  { id: "f0-c-lh18", name: "Ground Floor - Corridor near LH-18", type: "corridor", x: 75, y: 63, floor: 0 },
  { id: "f0-c-lh19", name: "Ground Floor - Corridor near LH-19", type: "corridor", x: 84, y: 63, floor: 0 },
  { id: "f0-c-right", name: "Ground Floor - Corridor Right End", type: "corridor", x: 89, y: 63, floor: 0 },

  // Corridor Waypoints - Left Wing Vertical Stack
  { id: "f0-c-left-vertical-bottom", name: "Ground Floor - Left Corridor bottom", type: "corridor", x: 11, y: 65, floor: 0 },
  { id: "f0-c-left-vertical-lh14", name: "Ground Floor - Left Corridor near LH-14", type: "corridor", x: 11, y: 51, floor: 0 },
  { id: "f0-c-left-vertical-lh13", name: "Ground Floor - Left Corridor near LH-13", type: "corridor", x: 11, y: 37, floor: 0 },
  { id: "f0-c-left-vertical-washroom", name: "Ground Floor - Left Corridor near Boys Washroom", type: "corridor", x: 11, y: 23, floor: 0 },

  // Corridor Waypoints - Right Wing Vertical Stack
  { id: "f0-c-right-vertical-bottom", name: "Ground Floor - Right Corridor bottom", type: "corridor", x: 89, y: 65, floor: 0 },
  { id: "f0-c-right-vertical-girls", name: "Ground Floor - Right Corridor near Girls Rest Room", type: "corridor", x: 89, y: 51, floor: 0 },
  { id: "f0-c-right-vertical-lh20", name: "Ground Floor - Right Corridor near LH-20", type: "corridor", x: 89, y: 37, floor: 0 },
  { id: "f0-c-right-vertical-physics", name: "Ground Floor - Right Corridor near Physics Lab", type: "corridor", x: 89, y: 23, floor: 0 },
];

const groundConnections: Connection[] = [
  // Horizontal corridor segments
  { from: "f0-c-left", to: "f0-c-lh15", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f0-c-lh15", to: "f0-c-lh16", distance: 8, direction: "Continue straight past LH-15" },
  { from: "f0-c-lh16", to: "f0-c-complab1", distance: 8, direction: "Continue past LH-16" },
  { from: "f0-c-complab1", to: "f0-c-stairs-left", distance: 7, direction: "Continue past Computer Lab 1" },
  { from: "f0-c-stairs-left", to: "f0-c-center", distance: 4, direction: "Walk past the staircase" },
  { from: "f0-c-center", to: "f0-c-lift", distance: 3, direction: "Continue past the central structure" },
  { from: "f0-c-lift", to: "f0-c-stairs-right", distance: 3, direction: "Continue past the Lift" },
  { from: "f0-c-stairs-right", to: "f0-c-lh17", distance: 6, direction: "Continue past the right staircase" },
  { from: "f0-c-lh17", to: "f0-c-lh18", distance: 8, direction: "Continue past LH-17" },
  { from: "f0-c-lh18", to: "f0-c-lh19", distance: 7, direction: "Continue past LH-18" },
  { from: "f0-c-lh19", to: "f0-c-right", distance: 4, direction: "Walk to the end of the corridor" },

  // Left Wing vertical corridor segments
  { from: "f0-c-left", to: "f0-c-left-vertical-bottom", distance: 2, direction: "Turn left into the vertical corridor" },
  { from: "f0-c-left-vertical-bottom", to: "f0-c-left-vertical-lh14", distance: 11, direction: "Walk straight up the corridor" },
  { from: "f0-c-left-vertical-lh14", to: "f0-c-left-vertical-lh13", distance: 11, direction: "Continue up the corridor" },
  { from: "f0-c-left-vertical-lh13", to: "f0-c-left-vertical-washroom", distance: 11, direction: "Continue up to the end" },

  // Right Wing vertical corridor segments
  { from: "f0-c-right", to: "f0-c-right-vertical-bottom", distance: 2, direction: "Turn right into the vertical corridor" },
  { from: "f0-c-right-vertical-bottom", to: "f0-c-right-vertical-girls", distance: 11, direction: "Walk straight up the corridor" },
  { from: "f0-c-right-vertical-girls", to: "f0-c-right-vertical-lh20", distance: 11, direction: "Continue up the corridor" },
  { from: "f0-c-right-vertical-lh20", to: "f0-c-right-vertical-physics", distance: 11, direction: "Continue up to the end" },

  // Connect rooms to corridor waypoints
  // Left stack
  { from: "f0-c-left-vertical-washroom", to: "f0-boys-washroom", distance: 4, direction: "Enter Boys Washroom" },
  { from: "f0-c-left-vertical-lh13", to: "f0-lh-13", distance: 4, direction: "Enter LH-13" },
  { from: "f0-c-left-vertical-lh14", to: "f0-lh-14", distance: 4, direction: "Enter LH-14" },
  { from: "f0-c-left-vertical-bottom", to: "f0-staff-room", distance: 4, direction: "Enter Staff Room" },

  // Top center stack
  { from: "f0-c-lh15", to: "f0-lh-15", distance: 9, direction: "Enter LH-15" },
  { from: "f0-c-lh16", to: "f0-lh-16", distance: 9, direction: "Enter LH-16" },
  { from: "f0-c-complab1", to: "f0-computer-lab-1", distance: 9, direction: "Enter Computer Lab 1" },
  { from: "f0-c-stairs-left", to: "f0-stairs", distance: 9, direction: "Walk to the Staircase" },
  { from: "f0-c-center", to: "f0-central-stairs", distance: 9, direction: "Walk to the Central structure" },
  { from: "f0-c-lift", to: "f0-lift", distance: 9, direction: "Step into the Lift" },
  { from: "f0-c-stairs-right", to: "f0-stairs-right", distance: 9, direction: "Walk to the Staircase" },
  { from: "f0-c-lh17", to: "f0-lh-17", distance: 9, direction: "Enter LH-17" },
  { from: "f0-c-lh18", to: "f0-lh-18", distance: 9, direction: "Enter LH-18" },
  { from: "f0-c-lh19", to: "f0-lh-19", distance: 9, direction: "Enter LH-19" },

  // Bottom center
  { from: "f0-c-lh16", to: "f0-computer-lab-2", distance: 11, direction: "Enter Computer Lab - 2" },

  // Right stack
  { from: "f0-c-right-vertical-physics", to: "f0-physics-lab", distance: 4, direction: "Enter Physics Lab" },
  { from: "f0-c-right-vertical-lh20", to: "f0-lh-20", distance: 4, direction: "Enter LH-20" },
  { from: "f0-c-right-vertical-girls", to: "f0-girls-restroom", distance: 4, direction: "Enter Girls Rest Room" },
  { from: "f0-c-right-vertical-bottom", to: "f0-chemistry-lab", distance: 4, direction: "Enter Chemistry Lab" },
];

// Dedicated Second Floor Locations (calibrated to the new portrait image)
const secondLocations: Location[] = [
  // Top horizontal area
  { id: "f2-library", name: "2nd Floor - Library", type: "facility", x: 46, y: 5, floor: 2 },
  { id: "f2-toilet-top", name: "2nd Floor - Toilet (Top)", type: "facility", x: 70, y: 5, floor: 2 },

  // Left of vertical corridor
  { id: "f2-dept-ce-hod-205", name: "2nd Floor - Dept of C.E HOD - 205", type: "classroom", x: 30, y: 36, floor: 2 },
  { id: "f2-staffroom-208", name: "2nd Floor - Staffroom - 208", type: "facility", x: 30, y: 58, floor: 2 },
  { id: "f2-classroom-212", name: "2nd Floor - Classroom - 212", type: "classroom", x: 30, y: 87, floor: 2 },

  // Right of vertical corridor
  { id: "f2-classroom-202", name: "2nd Floor - Classroom - 202", type: "classroom", x: 54, y: 13, floor: 2 },
  { id: "f2-classroom-203", name: "2nd Floor - Classroom - 203", type: "classroom", x: 54, y: 20, floor: 2 },
  { id: "f2-classroom-204", name: "2nd Floor - Classroom - 204", type: "classroom", x: 54, y: 27, floor: 2 },
  { id: "f2-lift", name: "2nd Floor - Lift 1", type: "lift", x: 50, y: 33, floor: 2 },
  { id: "f2-classroom-206", name: "2nd Floor - Classroom - 206", type: "classroom", x: 54, y: 38, floor: 2 },
  { id: "f2-classroom-207", name: "2nd Floor - Classroom - 207", type: "classroom", x: 54, y: 46, floor: 2 },
  { id: "f2-lift-2", name: "2nd Floor - Lift 2", type: "lift", x: 50, y: 53, floor: 2 },
  { id: "f2-classroom-209", name: "2nd Floor - Classroom - 209", type: "classroom", x: 54, y: 58, floor: 2 },
  { id: "f2-classroom-210", name: "2nd Floor - Classroom - 210", type: "classroom", x: 54, y: 65, floor: 2 },
  { id: "f2-classroom-211", name: "2nd Floor - Classroom - 211", type: "classroom", x: 54, y: 73, floor: 2 },

  // Bottom double doors / stairs
  { id: "f2-stairs", name: "2nd Floor - Staircase", type: "stairs", x: 42, y: 81, floor: 2 },

  // Bottom horizontal stack
  { id: "f2-toilet-213", name: "2nd Floor - Toilet - 213", type: "facility", x: 50, y: 89, floor: 2 },
  { id: "f2-toilet-214", name: "2nd Floor - Toilet - 214", type: "facility", x: 59, y: 89, floor: 2 },
  { id: "f2-lab-215", name: "2nd Floor - LAB - 215", type: "lab", x: 70, y: 89, floor: 2 },
  { id: "f2-classroom-216", name: "2nd Floor - Classroom - 216", type: "classroom", x: 83, y: 89, floor: 2 },

  // Corridor Waypoints - Vertical Stack
  { id: "f2-c-top", name: "2nd Floor - Corridor Top", type: "corridor", x: 42, y: 9, floor: 2 },
  { id: "f2-c-202", name: "2nd Floor - Corridor near Classroom 202", type: "corridor", x: 42, y: 13, floor: 2 },
  { id: "f2-c-203", name: "2nd Floor - Corridor near Classroom 203", type: "corridor", x: 42, y: 20, floor: 2 },
  { id: "f2-c-204", name: "2nd Floor - Corridor near Classroom 204", type: "corridor", x: 42, y: 27, floor: 2 },
  { id: "f2-c-lift1", name: "2nd Floor - Corridor near Lift 1", type: "corridor", x: 42, y: 33, floor: 2 },
  { id: "f2-c-206", name: "2nd Floor - Corridor near Classroom 206", type: "corridor", x: 42, y: 38, floor: 2 },
  { id: "f2-c-207", name: "2nd Floor - Corridor near Classroom 207", type: "corridor", x: 42, y: 46, floor: 2 },
  { id: "f2-c-lift2", name: "2nd Floor - Corridor near Lift 2", type: "corridor", x: 42, y: 53, floor: 2 },
  { id: "f2-c-209", name: "2nd Floor - Corridor near Classroom 209", type: "corridor", x: 42, y: 58, floor: 2 },
  { id: "f2-c-210", name: "2nd Floor - Corridor near Classroom 210", type: "corridor", x: 42, y: 65, floor: 2 },
  { id: "f2-c-211", name: "2nd Floor - Corridor near Classroom 211", type: "corridor", x: 42, y: 73, floor: 2 },
  { id: "f2-c-bottom-junction", name: "2nd Floor - Corridor Bottom Junction", type: "corridor", x: 42, y: 81, floor: 2 },

  // Corridor Waypoints - Bottom Horizontal Stack
  { id: "f2-c-212", name: "2nd Floor - Corridor near Classroom 212", type: "corridor", x: 38, y: 81, floor: 2 },
  { id: "f2-c-213", name: "2nd Floor - Corridor near Toilet 213", type: "corridor", x: 50, y: 81, floor: 2 },
  { id: "f2-c-214", name: "2nd Floor - Corridor near Toilet 214", type: "corridor", x: 59, y: 81, floor: 2 },
  { id: "f2-c-215", name: "2nd Floor - Corridor near LAB 215", type: "corridor", x: 70, y: 81, floor: 2 },
  { id: "f2-c-216", name: "2nd Floor - Corridor near Classroom 216", type: "corridor", x: 83, y: 81, floor: 2 },
];

const secondConnections: Connection[] = [
  // Vertical corridor segments
  { from: "f2-c-top", to: "f2-c-202", distance: 4, direction: "Walk straight down the corridor" },
  { from: "f2-c-202", to: "f2-c-203", distance: 7, direction: "Continue down the corridor" },
  { from: "f2-c-203", to: "f2-c-204", distance: 7, direction: "Continue past Classroom 203" },
  { from: "f2-c-204", to: "f2-c-lift1", distance: 6, direction: "Continue past Classroom 204" },
  { from: "f2-c-lift1", to: "f2-c-206", distance: 5, direction: "Continue past the Lift area" },
  { from: "f2-c-206", to: "f2-c-207", distance: 8, direction: "Continue past Classroom 206" },
  { from: "f2-c-207", to: "f2-c-lift2", distance: 7, direction: "Continue past Classroom 207" },
  { from: "f2-c-lift2", to: "f2-c-209", distance: 5, direction: "Continue past the second Lift area" },
  { from: "f2-c-209", to: "f2-c-210", distance: 7, direction: "Continue past Classroom 209" },
  { from: "f2-c-210", to: "f2-c-211", distance: 8, direction: "Continue past Classroom 210" },
  { from: "f2-c-211", to: "f2-c-bottom-junction", distance: 8, direction: "Walk to the bottom of the corridor" },

  // Bottom horizontal corridor segments
  { from: "f2-c-212", to: "f2-c-bottom-junction", distance: 4, direction: "Walk along the corridor" },
  { from: "f2-c-bottom-junction", to: "f2-c-213", distance: 8, direction: "Walk along the corridor towards the right" },
  { from: "f2-c-213", to: "f2-c-214", distance: 9, direction: "Continue along the corridor" },
  { from: "f2-c-214", to: "f2-c-215", distance: 11, direction: "Continue past Toilet 214" },
  { from: "f2-c-215", to: "f2-c-216", distance: 13, direction: "Walk towards Classroom 216" },

  // Connect rooms
  { from: "f2-c-top", to: "f2-library", distance: 6, direction: "Enter the Library" },
  { from: "f2-c-top", to: "f2-toilet-top", distance: 28, direction: "Enter Toilet" },

  { from: "f2-c-lift1", to: "f2-dept-ce-hod-205", distance: 12, direction: "Enter Dept of C.E HOD - 205" },
  { from: "f2-c-lift2", to: "f2-staffroom-208", distance: 12, direction: "Enter Staffroom - 208" },
  { from: "f2-c-212", to: "f2-classroom-212", distance: 8, direction: "Enter Classroom - 212" },

  { from: "f2-c-202", to: "f2-classroom-202", distance: 12, direction: "Enter Classroom - 202" },
  { from: "f2-c-203", to: "f2-classroom-203", distance: 12, direction: "Enter Classroom - 203" },
  { from: "f2-c-204", to: "f2-classroom-204", distance: 12, direction: "Enter Classroom - 204" },
  { from: "f2-c-lift1", to: "f2-lift", distance: 8, direction: "Step into Lift 1" },
  { from: "f2-c-206", to: "f2-classroom-206", distance: 12, direction: "Enter Classroom - 206" },
  { from: "f2-c-207", to: "f2-classroom-207", distance: 12, direction: "Enter Classroom - 207" },
  { from: "f2-c-lift2", to: "f2-lift-2", distance: 8, direction: "Step into Lift 2" },
  { from: "f2-c-209", to: "f2-classroom-209", distance: 12, direction: "Enter Classroom - 209" },
  { from: "f2-c-210", to: "f2-classroom-210", distance: 12, direction: "Enter Classroom - 210" },
  { from: "f2-c-211", to: "f2-classroom-211", distance: 12, direction: "Enter Classroom - 211" },

  { from: "f2-c-bottom-junction", to: "f2-stairs", distance: 1, direction: "Walk to the Staircase" },

  { from: "f2-c-213", to: "f2-toilet-213", distance: 8, direction: "Enter Toilet - 213" },
  { from: "f2-c-214", to: "f2-toilet-214", distance: 8, direction: "Enter Toilet - 214" },
  { from: "f2-c-215", to: "f2-lab-215", distance: 8, direction: "Enter LAB - 215" },
  { from: "f2-c-216", to: "f2-classroom-216", distance: 8, direction: "Enter Classroom - 216" },
];

// Dedicated Third Floor Locations (calibrated to the new landscape image)
const thirdLocations: Location[] = [
  // Left Wing (vertical stack)
  { id: "f3-boys-toilet-301", name: "3rd Floor - Boys Toilet 301", type: "facility", x: 6, y: 14, floor: 3 },
  { id: "f3-director-mba-303", name: "3rd Floor - Director MBA 303", type: "classroom", x: 10, y: 29, floor: 3 },
  { id: "f3-cr-304", name: "3rd Floor - CR 304", type: "classroom", x: 10, y: 37, floor: 3 },
  { id: "f3-cr-305-hall", name: "3rd Floor - CR - 305 Hall", type: "classroom", x: 10, y: 45, floor: 3 },
  { id: "f3-cr-306", name: "3rd Floor - CR - 306", type: "classroom", x: 10, y: 55, floor: 3 },
  { id: "f3-mba-dept-307", name: "3rd Floor - MBA department CR - 307", type: "classroom", x: 9, y: 67, floor: 3 },
  { id: "f3-cr-308", name: "3rd Floor - C.R - 308", type: "classroom", x: 9, y: 74, floor: 3 },
  { id: "f3-stairs-left", name: "3rd Floor - MBA Staircase (Left)", type: "stairs", x: 4, y: 61, floor: 3 },

  // Center top stack (above corridor)
  { id: "f3-cr-309", name: "3rd Floor - CR - 309", type: "classroom", x: 20, y: 53, floor: 3 },
  { id: "f3-cr-310", name: "3rd Floor - CR - 310", type: "classroom", x: 26, y: 53, floor: 3 },
  { id: "f3-cr-311", name: "3rd Floor - C.R - 311", type: "classroom", x: 35, y: 53, floor: 3 },
  { id: "f3-stairs", name: "3rd Floor - Staircase", type: "stairs", x: 43, y: 53, floor: 3 },
  { id: "f3-lift", name: "3rd Floor - Lift", type: "lift", x: 43, y: 53, floor: 3 },
  { id: "f3-ece-314", name: "3rd Floor - ECE 314", type: "classroom", x: 47, y: 53, floor: 3 },
  { id: "f3-room-315", name: "3rd Floor - Room 315", type: "classroom", x: 52, y: 53, floor: 3 },
  { id: "f3-room-302", name: "3rd Floor - Room 302", type: "classroom", x: 55, y: 53, floor: 3 },
  { id: "f3-room-301", name: "3rd Floor - Room 301", type: "classroom", x: 59, y: 53, floor: 3 },
  { id: "f3-stairs-right", name: "3rd Floor - Staircase (Right)", type: "stairs", x: 64, y: 53, floor: 3 },
  { id: "f3-cr-319", name: "3rd Floor - CR - 319", type: "classroom", x: 72, y: 53, floor: 3 },
  { id: "f3-cr-320", name: "3rd Floor - CR - 320", type: "classroom", x: 82, y: 53, floor: 3 },

  // Center bottom stack (below corridor)
  { id: "f3-tutorial", name: "3rd Floor - Tutorial", type: "classroom", x: 34, y: 67, floor: 3 },
  { id: "f3-staff-room", name: "3rd Floor - Staff Room", type: "facility", x: 43, y: 67, floor: 3 },
  { id: "f3-dept-ece-hod-318", name: "3rd Floor - Dept ECE HOD-318", type: "classroom", x: 54, y: 67, floor: 3 },

  // Right Stack (vertical stack)
  { id: "f3-cr-325", name: "3rd Floor - CR - 325", type: "classroom", x: 91, y: 32, floor: 3 },
  { id: "f3-cred-326-lab", name: "3rd Floor - CRED-326 LAB", type: "lab", x: 91, y: 45, floor: 3 },
  { id: "f3-girls-toilet-302-3", name: "3rd Floor - Girls Toilet 302-3", type: "facility", x: 91, y: 51, floor: 3 },
  { id: "f3-boys-toilet-302-2", name: "3rd Floor - Boys Toilet 302-2", type: "facility", x: 91, y: 56, floor: 3 },
  { id: "f3-cr-321", name: "3rd Floor - CR - 321", type: "classroom", x: 91, y: 70, floor: 3 },

  // Corridor Waypoints - Horizontal
  { id: "f3-c-left", name: "3rd Floor - Corridor Left Junction", type: "corridor", x: 16, y: 61, floor: 3 },
  { id: "f3-c-309", name: "3rd Floor - Corridor near CR-309", type: "corridor", x: 20, y: 61, floor: 3 },
  { id: "f3-c-310", name: "3rd Floor - Corridor near CR-310", type: "corridor", x: 26, y: 61, floor: 3 },
  { id: "f3-c-311", name: "3rd Floor - Corridor near CR-311", type: "corridor", x: 35, y: 61, floor: 3 },
  { id: "f3-c-stairs1", name: "3rd Floor - Corridor near Left Stairs/Lift", type: "corridor", x: 43, y: 61, floor: 3 },
  { id: "f3-c-ece314", name: "3rd Floor - Corridor near ECE 314", type: "corridor", x: 47, y: 61, floor: 3 },
  { id: "f3-c-315-302", name: "3rd Floor - Corridor Center", type: "corridor", x: 54, y: 61, floor: 3 },
  { id: "f3-c-301", name: "3rd Floor - Corridor near Room 301", type: "corridor", x: 59, y: 61, floor: 3 },
  { id: "f3-c-stairs2", name: "3rd Floor - Corridor near Right Stairs", type: "corridor", x: 64, y: 61, floor: 3 },
  { id: "f3-c-319", name: "3rd Floor - Corridor near CR-319", type: "corridor", x: 72, y: 61, floor: 3 },
  { id: "f3-c-320", name: "3rd Floor - Corridor near CR-320", type: "corridor", x: 82, y: 61, floor: 3 },
  { id: "f3-c-right", name: "3rd Floor - Corridor Right Junction", type: "corridor", x: 88, y: 61, floor: 3 },

  // Corridor Waypoints - Left Wing Vertical
  { id: "f3-c-left-vertical-top", name: "3rd Floor - Left Corridor near Toilet 301", type: "corridor", x: 16, y: 14, floor: 3 },
  { id: "f3-c-left-vertical-303", name: "3rd Floor - Left Corridor near Director 303", type: "corridor", x: 16, y: 29, floor: 3 },
  { id: "f3-c-left-vertical-304", name: "3rd Floor - Left Corridor near CR-304", type: "corridor", x: 16, y: 37, floor: 3 },
  { id: "f3-c-left-vertical-305", name: "3rd Floor - Left Corridor near CR-305", type: "corridor", x: 16, y: 45, floor: 3 },
  { id: "f3-c-left-vertical-306", name: "3rd Floor - Left Corridor near CR-306", type: "corridor", x: 16, y: 55, floor: 3 },
  { id: "f3-c-left-vertical-307", name: "3rd Floor - Left Corridor near CR-307", type: "corridor", x: 16, y: 67, floor: 3 },
  { id: "f3-c-left-vertical-308", name: "3rd Floor - Left Corridor near CR-308", type: "corridor", x: 16, y: 74, floor: 3 },

  // Corridor Waypoints - Right Wing Vertical
  { id: "f3-c-right-vertical-325", name: "3rd Floor - Right Corridor near CR-325", type: "corridor", x: 88, y: 32, floor: 3 },
  { id: "f3-c-right-vertical-lab", name: "3rd Floor - Right Corridor near Lab", type: "corridor", x: 88, y: 45, floor: 3 },
  { id: "f3-c-right-vertical-toilet", name: "3rd Floor - Right Corridor near Toilet", type: "corridor", x: 88, y: 54, floor: 3 },
  { id: "f3-c-right-vertical-bottom", name: "3rd Floor - Right Corridor near CR-321", type: "corridor", x: 88, y: 70, floor: 3 },
];

const thirdConnections: Connection[] = [
  // Left Wing vertical corridor segments
  { from: "f3-c-left-vertical-top", to: "f3-c-left-vertical-303", distance: 15, direction: "Walk straight down the corridor" },
  { from: "f3-c-left-vertical-303", to: "f3-c-left-vertical-304", distance: 8, direction: "Continue down the corridor" },
  { from: "f3-c-left-vertical-304", to: "f3-c-left-vertical-305", distance: 8, direction: "Continue past CR-304" },
  { from: "f3-c-left-vertical-305", to: "f3-c-left-vertical-306", distance: 10, direction: "Continue past CR-305" },
  { from: "f3-c-left-vertical-306", to: "f3-c-left", distance: 6, direction: "Walk towards the corridor junction" },
  { from: "f3-c-left", to: "f3-c-left-vertical-307", distance: 6, direction: "Walk past the corridor junction" },
  { from: "f3-c-left-vertical-307", to: "f3-c-left-vertical-308", distance: 7, direction: "Continue past MBA department 307" },

  // Horizontal corridor segments
  { from: "f3-c-left", to: "f3-c-309", distance: 4, direction: "Walk straight along the corridor" },
  { from: "f3-c-309", to: "f3-c-310", distance: 6, direction: "Continue straight past CR-309" },
  { from: "f3-c-310", to: "f3-c-311", distance: 9, direction: "Continue past CR-310" },
  { from: "f3-c-311", to: "f3-c-stairs1", distance: 8, direction: "Continue past CR-311" },
  { from: "f3-c-stairs1", to: "f3-c-ece314", distance: 4, direction: "Continue past the Stairs/Lift block" },
  { from: "f3-c-ece314", to: "f3-c-315-302", distance: 7, direction: "Continue past ECE 314" },
  { from: "f3-c-315-302", to: "f3-c-301", distance: 5, direction: "Continue past class rooms" },
  { from: "f3-c-301", to: "f3-c-stairs2", distance: 5, direction: "Continue past Room 301" },
  { from: "f3-c-stairs2", to: "f3-c-319", distance: 8, direction: "Continue past the right Stairs block" },
  { from: "f3-c-319", to: "f3-c-320", distance: 10, direction: "Continue past CR-319" },
  { from: "f3-c-320", to: "f3-c-right", distance: 6, direction: "Walk to the end of the corridor" },

  // Right Wing vertical corridor segments
  { from: "f3-c-right-vertical-325", to: "f3-c-right-vertical-lab", distance: 13, direction: "Walk straight down the corridor" },
  { from: "f3-c-right-vertical-lab", to: "f3-c-right-vertical-toilet", distance: 9, direction: "Continue down the corridor" },
  { from: "f3-c-right-vertical-toilet", to: "f3-c-right", distance: 7, direction: "Walk towards the corridor junction" },
  { from: "f3-c-right", to: "f3-c-right-vertical-bottom", distance: 9, direction: "Walk past the corridor junction" },

  // Connect rooms
  { from: "f3-c-left-vertical-top", to: "f3-boys-toilet-301", distance: 10, direction: "Enter Boys Toilet 301" },
  { from: "f3-c-left-vertical-303", to: "f3-director-mba-303", distance: 6, direction: "Enter Director MBA 303" },
  { from: "f3-c-left-vertical-304", to: "f3-cr-304", distance: 6, direction: "Enter CR 304" },
  { from: "f3-c-left-vertical-305", to: "f3-cr-305-hall", distance: 6, direction: "Enter CR - 305 Hall" },
  { from: "f3-c-left-vertical-306", to: "f3-cr-306", distance: 6, direction: "Enter CR - 306" },
  { from: "f3-c-left-vertical-307", to: "f3-mba-dept-307", distance: 7, direction: "Enter MBA department CR - 307" },
  { from: "f3-c-left-vertical-308", to: "f3-cr-308", distance: 7, direction: "Enter C.R - 308" },
  { from: "f3-c-left-vertical-307", to: "f3-stairs-left", distance: 12, direction: "Walk to the MBA Staircase" },

  { from: "f3-c-309", to: "f3-cr-309", distance: 8, direction: "Enter CR - 309" },
  { from: "f3-c-310", to: "f3-cr-310", distance: 8, direction: "Enter CR - 310" },
  { from: "f3-c-311", to: "f3-cr-311", distance: 8, direction: "Enter C.R - 311" },
  { from: "f3-c-stairs1", to: "f3-stairs", distance: 8, direction: "Go to the Staircase" },
  { from: "f3-c-stairs1", to: "f3-lift", distance: 8, direction: "Step into the Lift" },
  { from: "f3-c-ece314", to: "f3-ece-314", distance: 8, direction: "Enter ECE 314" },
  { from: "f3-c-315-302", to: "f3-room-315", distance: 8, direction: "Enter Room 315" },
  { from: "f3-c-315-302", to: "f3-room-302", distance: 8, direction: "Enter Room 302" },
  { from: "f3-c-301", to: "f3-room-301", distance: 8, direction: "Enter Room 301" },
  { from: "f3-c-stairs2", to: "f3-stairs-right", distance: 8, direction: "Go to the Staircase" },
  { from: "f3-c-319", to: "f3-cr-319", distance: 8, direction: "Enter CR - 319" },
  { from: "f3-c-320", to: "f3-cr-320", distance: 8, direction: "Enter CR - 320" },

  { from: "f3-c-311", to: "f3-tutorial", distance: 6, direction: "Enter Tutorial" },
  { from: "f3-c-stairs1", to: "f3-staff-room", distance: 6, direction: "Enter Staff Room" },
  { from: "f3-c-315-302", to: "f3-dept-ece-hod-318", distance: 6, direction: "Enter Dept ECE HOD-318" },

  { from: "f3-c-right-vertical-325", to: "f3-cr-325", distance: 3, direction: "Enter CR - 325" },
  { from: "f3-c-right-vertical-lab", to: "f3-cred-326-lab", distance: 3, direction: "Enter CRED-326 LAB" },
  { from: "f3-c-right-vertical-toilet", to: "f3-girls-toilet-302-3", distance: 3, direction: "Enter Girls Toilet" },
  { from: "f3-c-right-vertical-toilet", to: "f3-boys-toilet-302-2", distance: 3, direction: "Enter Boys Toilet" },
  { from: "f3-c-right-vertical-bottom", to: "f3-cr-321", distance: 3, direction: "Enter CR - 321" },
];

export const locations: Location[] = [...groundLocations, ...secondLocations, ...thirdLocations];
export const connections: Connection[] = [...groundConnections, ...secondConnections, ...thirdConnections];

// Dynamically generate multi-floor map structure for upper floors (1)
const upperFloors = [1];
for (const floor of upperFloors) {
  const prefix = `f${floor}-`;

  // Replicate locations for this floor
  for (const base of baseLocations) {
    const customName = ROOM_NAMES_BY_FLOOR[floor]?.[base.id] || base.name;
    locations.push({
      ...base,
      id: `${prefix}${base.id}`,
      name: `${FLOOR_NAMES[floor]} - ${customName}`,
      floor,
    });
  }

  // Replicate connections within this floor
  for (const baseConn of baseConnections) {
    // Generate intelligent custom direction text
    let dynamicDirection = baseConn.direction;
    if (
      dynamicDirection === "Enter the Room" || 
      dynamicDirection === "Enter Toilet" || 
      dynamicDirection === "Enter the Section" || 
      dynamicDirection === "Enter the Lab" || 
      dynamicDirection === "Enter the Lounge / Computer Lab"
    ) {
      const targetRoomName = ROOM_NAMES_BY_FLOOR[floor]?.[baseConn.to];
      if (targetRoomName) {
        dynamicDirection = `Enter ${targetRoomName}`;
      }
    } else if (
      dynamicDirection === "Enter the Room on your right" || 
      dynamicDirection === "Enter the Lab on your right" || 
      dynamicDirection === "Enter the Room/Lab on your right"
    ) {
      const targetRoomName = ROOM_NAMES_BY_FLOOR[floor]?.[baseConn.to];
      if (targetRoomName) {
        dynamicDirection = `Enter ${targetRoomName} on your right`;
      }
    } else if (dynamicDirection === "Step through the Entrance") {
      const targetRoomName = ROOM_NAMES_BY_FLOOR[floor]?.[baseConn.to];
      if (targetRoomName) {
        dynamicDirection = `Step through the ${targetRoomName}`;
      }
    }

    connections.push({
      from: `${prefix}${baseConn.from}`,
      to: `${prefix}${baseConn.to}`,
      distance: baseConn.distance,
      direction: dynamicDirection,
    });
  }
}

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
