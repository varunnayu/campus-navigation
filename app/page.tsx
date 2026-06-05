"use client";

import { useState, useEffect } from "react";
import { LocationSelect } from "@/components/location-select";
import { RouteDisplay } from "@/components/route-display";
import { CampusMap } from "@/components/campus-map";
import { Button } from "@/components/ui/button";
import { findShortestPath, PathResult } from "@/lib/campus-data";
import { Navigation, RotateCcw } from "lucide-react";

export default function CampusNavPage() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [sourceFloor, setSourceFloor] = useState<number>(0);
  const [destFloor, setDestFloor] = useState<number>(0);
  const [result, setResult] = useState<PathResult | null>(null);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return oldProgress + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = () => {

    setError("");
    setResult(null);

    if (!source) {
      setError("Please select a source location");
      return;
    }
    if (!destination) {
      setError("Please select a destination");
      return;
    }
    if (source === destination) {
      setError("Source and destination cannot be the same");
      return;
    }

    const pathResult = findShortestPath(source, destination);
    if (!pathResult) {
      setError("No route found between these locations");
      return;
    }

    setResult(pathResult);
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setSourceFloor(0);
    setDestFloor(0);
    setResult(null);
    setError("");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-4 select-none">
        <div className="w-full max-w-sm border-4 border-foreground bg-card p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 border-4 border-foreground bg-primary text-primary-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-foreground">CampusNav</h2>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-6">
            Calibrating path meshes...
          </p>

          <div className="w-full h-8 border-4 border-foreground bg-secondary/30 relative overflow-hidden rounded-sm">
            <div
              className="h-full bg-primary border-r-4 border-foreground transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-foreground">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Header */}
        <header className="mb-8 rounded-xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden group">
          {/* Subtle dotted background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 border-2 border-foreground bg-primary text-primary-foreground rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform duration-300">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">
                  CampusNav
                </h1>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Indoor College Navigation System
                </p>
              </div>
            </div>
            {/* Live Indicator Badge */}
            <div className="flex items-center gap-2 border-2 border-foreground bg-green-500/10 text-green-700 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md relative">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute left-[10px]" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Live
            </div>
          </div>
        </header>

        {/* Navigation Form */}
        <div className="mb-8 rounded-xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <h2 className="mb-6 text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-2">
            Plan Your Route
          </h2>

          <div className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <LocationSelect
                value={source}
                onValueChange={setSource}
                placeholder="Select starting point"
                excludeId={destination}
                label="Source"
                floor={sourceFloor}
                onFloorChange={setSourceFloor}
              />
              <LocationSelect
                value={destination}
                onValueChange={setDestination}
                placeholder="Select destination"
                excludeId={source}
                label="Destination"
                floor={destFloor}
                onFloorChange={setDestFloor}
              />
            </div>

            {error && (
              <p className="text-sm font-semibold text-destructive">{error}</p>
            )}

            <div className="flex gap-4">
              <Button
                onClick={handleNavigate}
                className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/95 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-lg"
              >
                <Navigation className="mr-2 h-5 w-5 animate-pulse" />
                Navigate
              </Button>
              {(source || destination || result) && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 border-2 border-foreground bg-background hover:bg-secondary text-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Show map preview when no result yet */}
        {!result && (
          <div className="mb-8 rounded-xl border-2 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-muted pb-2">
              Campus Map
            </h2>
            <CampusMap source={source} destination={destination} />
            <p className="mt-4 text-xs font-bold text-muted-foreground text-center uppercase tracking-wide">
              Select source and destination to see the route
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <RouteDisplay
            result={result}
            source={source}
            destination={destination}
          />
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <p>Navigate your campus with ease</p>
        </footer>
      </div>
    </main>
  );
}

