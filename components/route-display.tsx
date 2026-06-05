"use client";

import { PathResult, getLocationName, getLocation } from "@/lib/campus-data";
import { CampusMap } from "@/components/campus-map";
import { MapPin, Navigation, MoveRight, Footprints, Clock, Route } from "lucide-react";

interface RouteDisplayProps {
  result: PathResult;
  source: string;
  destination: string;
}

export function RouteDisplay({ result, source, destination }: RouteDisplayProps) {
  // Filter meaningful steps (not just corridor-to-corridor)
  const meaningfulSteps = result.steps.filter(step => {
    const fromLoc = getLocation(step.from);
    const toLoc = getLocation(step.to);
    return fromLoc?.type !== "corridor" || toLoc?.type !== "corridor";
  });

  // Filter path nodes for display (exclude corridors and stairs)
  const displayPath = result.path.filter(nodeId => {
    const loc = getLocation(nodeId);
    return loc?.type !== "corridor" && loc?.type !== "stairs";
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Route Summary Card */}
      <div className="border-2 border-foreground bg-card p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-1.5 w-full">
            Route Summary
          </h2>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
            <MapPin className="h-5 w-5 text-green-500" />
            <span className="font-bold">{getLocationName(source)}</span>
          </div>
          <div className="flex items-center">
            <MoveRight className="h-5 w-5 text-muted-foreground animate-pulse" />
          </div>
          <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/30">
            <Navigation className="h-5 w-5 text-red-500" />
            <span className="font-bold">{getLocationName(destination)}</span>
          </div>
        </div>
      </div>

      {/* Campus Map with Animated Route */}
      <div className="border-2 border-foreground bg-card p-4 sm:p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-1.5 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Interactive Map
        </h2>
        <CampusMap
          highlightedPath={result.path}
          source={source}
          destination={destination}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border-2 border-foreground bg-primary/10 p-5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Footprints className="h-4 w-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-wider text-primary">Distance</span>
          </div>
          <p className="text-3xl font-black text-foreground">{result.totalDistance}<span className="text-sm ml-1 text-muted-foreground uppercase font-bold">m</span></p>
        </div>
        <div className="border-2 border-foreground bg-secondary/80 p-5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">Walking Time</span>
          </div>
          <p className="text-3xl font-black text-foreground">~{Math.ceil(result.totalDistance / 80)}<span className="text-sm ml-1 text-muted-foreground uppercase font-bold">min</span></p>
        </div>
      </div>

      {/* Visual Route Path */}
      <div className="border-2 border-foreground bg-card p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-1.5">
          Route Path
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {displayPath.map((nodeId, index) => (
            <div key={nodeId} className="flex items-center gap-2">
              <span
                className={`
                  rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition-all
                  ${index === 0
                    ? 'border-green-500 bg-green-500/10 text-green-700 shadow-[2px_2px_0px_0px_rgba(34,197,94,0.3)]'
                    : index === displayPath.length - 1
                      ? 'border-red-500 bg-red-500/10 text-red-700 shadow-[2px_2px_0px_0px_rgba(239,68,68,0.3)]'
                      : 'border-foreground/30 bg-secondary text-foreground'
                  }
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {getLocationName(nodeId)}
              </span>
              {index < displayPath.length - 1 && (
                <MoveRight className="h-4 w-4 text-primary/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Directions */}
      <div className="border-2 border-foreground bg-card p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-1.5">
          Turn-by-Turn Directions
        </h2>
        <div className="flex flex-col gap-0">
          {meaningfulSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 relative pl-4 pb-6 last:pb-0"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Connector line */}
              {index < meaningfulSteps.length - 1 && (
                <div className="absolute left-[1.9rem] top-8 h-full w-0.5 bg-gradient-to-b from-primary/50 to-primary/20" />
              )}

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-bold text-primary relative z-10">
                {index + 1}
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <p className="font-semibold text-foreground text-sm">{step.direction}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <span className="inline-block px-1.5 py-0.5 bg-secondary border border-foreground/15 rounded text-xs font-bold">
                    {step.distance}m
                  </span>
                  <span>to {getLocationName(step.to)}</span>
                </p>
              </div>
            </div>
          ))}

          {/* Destination reached */}
          <div className="flex items-start gap-4 pl-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-green-500 bg-green-500 text-sm font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] animate-pulse">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <p className="font-bold text-green-600 text-sm">Destination Reached!</p>
              <p className="text-xs font-medium text-muted-foreground">
                You have arrived at {getLocationName(destination)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
