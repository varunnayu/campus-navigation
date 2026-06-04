"use client";

import { useState } from "react";
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

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 border-2 border-foreground bg-card p-6">
          <div className="flex items-center gap-3">
            <Navigation className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground">
                CampusNav
              </h1>
              <p className="text-sm text-muted-foreground">
                Indoor College Navigation System
              </p>
            </div>
          </div>
        </header>

        {/* Navigation Form */}
        <div className="mb-8 border-2 border-foreground bg-card p-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-foreground">
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
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <div className="flex gap-4">
              <Button
                onClick={handleNavigate}
                className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wide"
              >
                <Navigation className="mr-2 h-5 w-5" />
                Navigate
              </Button>
              {(source || destination || result) && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 border-2 border-foreground hover:bg-secondary"
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
          <div className="mb-8 border-2 border-foreground bg-card p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Campus Map
            </h2>
            <CampusMap source={source} destination={destination} />
            <p className="mt-4 text-sm text-muted-foreground text-center">
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
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Navigate your campus with ease</p>
        </footer>
      </div>
    </main>
  );
}
