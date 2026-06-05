"use client";

import { useEffect, useState, useMemo } from "react";
import { getLocation, FLOOR_NAMES } from "@/lib/campus-data";

interface CampusMapProps {
  highlightedPath?: string[];
  source?: string;
  destination?: string;
}

export function CampusMap({ highlightedPath = [], source, destination }: CampusMapProps) {
  const [activeFloor, setActiveFloor] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Automatically switch active floor to show the source/destination floor
  useEffect(() => {
    if (source) {
      const loc = getLocation(source);
      if (loc) {
        setActiveFloor(loc.floor);
      }
    } else if (destination) {
      const loc = getLocation(destination);
      if (loc) {
        setActiveFloor(loc.floor);
      }
    }
  }, [source, destination]);

  useEffect(() => {
    if (highlightedPath.length > 1) {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsAnimating(true), 100);
      return () => clearTimeout(timer);
    }
  }, [highlightedPath, activeFloor]);

  // Get position for a location if it is on the currently active floor
  const getPos = (id: string) => {
    const loc = getLocation(id);
    return loc && loc.floor === activeFloor ? { x: loc.x, y: loc.y } : null;
  };

  // Generate curved SVG path string for the active floor (Google Maps style)
  const pathString = useMemo(() => {
    const rawPoints = highlightedPath
      .map(id => getPos(id))
      .filter((p): p is { x: number; y: number } => p !== null);

    // Filter out consecutive duplicate points to avoid division by zero (NaN) in path generation
    const points: { x: number; y: number }[] = [];
    for (const p of rawPoints) {
      if (points.length === 0 || points[points.length - 1].x !== p.x || points[points.length - 1].y !== p.y) {
        points.push(p);
      }
    }

    if (points.length < 2) return "";

    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    // Create smooth path with rounded corners
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      const d1 = Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));
      const d2 = Math.sqrt(Math.pow(next.x - curr.x, 2) + Math.pow(next.y - curr.y, 2));
      const radius = Math.min(d1, d2, 2) * 0.4;

      const dir1 = { x: (curr.x - prev.x) / d1, y: (curr.y - prev.y) / d1 };
      const dir2 = { x: (next.x - curr.x) / d2, y: (next.y - curr.y) / d2 };

      const cp1 = { x: curr.x - dir1.x * radius, y: curr.y - dir1.y * radius };
      const cp2 = { x: curr.x + dir2.x * radius, y: curr.y + dir2.y * radius };

      path += ` L ${cp1.x} ${cp1.y}`;
      path += ` Q ${curr.x} ${curr.y} ${cp2.x} ${cp2.y}`;
    }

    const last = points[points.length - 1];
    path += ` L ${last.x} ${last.y}`;

    return path;
  }, [highlightedPath, activeFloor]);

  // Calculate path length for animation on active floor
  const pathLength = useMemo(() => {
    const rawPoints = highlightedPath
      .map(id => getPos(id))
      .filter((p): p is { x: number; y: number } => p !== null);

    // Filter out consecutive duplicate points
    const points: { x: number; y: number }[] = [];
    for (const p of rawPoints) {
      if (points.length === 0 || points[points.length - 1].x !== p.x || points[points.length - 1].y !== p.y) {
        points.push(p);
      }
    }

    if (points.length < 2) return 0;
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      length += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    return length;
  }, [highlightedPath, activeFloor]);

  const sourceLoc = source ? getLocation(source) : null;
  const destLoc = destination ? getLocation(destination) : null;

  const sourcePos = sourceLoc && sourceLoc.floor === activeFloor ? { x: sourceLoc.x, y: sourceLoc.y } : null;
  const destPos = destLoc && destLoc.floor === activeFloor ? { x: destLoc.x, y: destLoc.y } : null;



  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Neobrutalist Floor Selector at the Top */}
      <div className="grid grid-cols-4 gap-2 rounded-xl border-2 border-foreground bg-secondary/30 p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {[0, 1, 2, 3].map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`flex h-11 items-center justify-center rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border-2 ${activeFloor === floor
                ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                : "bg-card text-foreground hover:bg-secondary hover:text-foreground border-transparent"
              }`}
          >
            <span className="hidden sm:inline">
              {floor === 0 ? "Ground Floor" : `${floor === 1 ? "1st" : floor === 2 ? "2nd" : "3rd"} Floor`}
            </span>
            <span className="inline sm:hidden">
              {floor === 0 ? "G" : `${floor}F`}
            </span>
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative w-full overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-xl">

        {/* Floor Map Image */}
        <img
          src={`/images/floor-${activeFloor}.png`}
          alt={`${FLOOR_NAMES[activeFloor]} Floor Plan`}
          className="w-full h-auto block transition-all duration-300"
        />

        {/* SVG Overlay for route and markers */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Blue gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#4285F4" />
            </linearGradient>

            {/* Drop shadow */}
            <filter id="routeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0.2" dy="0.2" stdDeviation="0.4" floodColor="#000" floodOpacity="0.35" />
            </filter>

            {/* Glow for markers */}
            <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Route visualization */}
          {pathLength > 0 && pathString && (
            <>
              {/* Route shadow */}
              <path
                d={pathString}
                fill="none"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0.25, 0.25)"
              />

              {/* White border */}
              <path
                d={pathString}
                fill="none"
                stroke="#fff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#routeShadow)"
              />

              {/* Main blue route line */}
              <path
                d={pathString}
                fill="none"
                stroke="#4285F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isAnimating ? "animate-route-draw" : ""}
                style={{
                  strokeDasharray: isAnimating ? pathLength * 2 : 0,
                  strokeDashoffset: isAnimating ? 0 : pathLength * 2,
                  transition: isAnimating ? `stroke-dashoffset ${pathLength / 20}s ease-out` : "none"
                }}
              />

              {/* Animated dot traveling along path */}
              <circle r="1.2" fill="#4285F4" stroke="#fff" strokeWidth="0.5">
                <animateMotion
                  dur={`${Math.max(3, pathLength / 12)}s`}
                  repeatCount="indefinite"
                  path={pathString}
                />
              </circle>
            </>
          )}

          {/* Source marker - blue circle */}
          {sourcePos && (
            <g transform={`translate(${sourcePos.x}, ${sourcePos.y})`}>
              <circle r="3" fill="none" stroke="#4285F4" strokeWidth="0.3" opacity="0">
                <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="2" fill="rgba(0,0,0,0.2)" transform="translate(0.2, 0.2)" />
              <circle r="2" fill="#fff" filter="url(#markerGlow)" />
              <circle r="1.4" fill="#4285F4" />
              <circle r="0.5" fill="#fff" />
            </g>
          )}

          {/* Destination marker - red pin */}
          {destPos && (
            <g transform={`translate(${destPos.x}, ${destPos.y})`}>
              <circle r="3" fill="none" stroke="#EA4335" strokeWidth="0.3" opacity="0">
                <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <ellipse cx="0" cy="3" rx="1.5" ry="0.5" fill="rgba(0,0,0,0.25)" />
              <path
                d="M0,-3.5 C2.5,-3.5 3.5,-1.5 3.5,0.5 C3.5,2 1.5,4 0,6 C-1.5,4 -3.5,2 -3.5,0.5 C-3.5,-1.5 -2.5,-3.5 0,-3.5 Z"
                fill="#EA4335"
                stroke="#B31412"
                strokeWidth="0.2"
                filter="url(#markerGlow)"
                transform="scale(0.6)"
              />
              <circle r="0.7" cy="-0.3" fill="#fff" />
            </g>
          )}
        </svg>


      </div>
    </div>
  );
}
