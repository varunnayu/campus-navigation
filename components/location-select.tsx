"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getSelectableLocations } from "@/lib/campus-data";
import { Search, ChevronDown } from "lucide-react";

interface LocationSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  excludeId?: string;
  label: string;
  floor: number;
  onFloorChange: (floor: number) => void;
}

export function LocationSelect({
  value,
  onValueChange,
  placeholder,
  excludeId,
  label,
  floor,
  onFloorChange,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectableLocations = getSelectableLocations().filter((loc) => loc.floor === floor);

  const filteredLocations = excludeId
    ? selectableLocations.filter((loc) => loc.id !== excludeId)
    : selectableLocations;

  const searchedLocations = filteredLocations.filter((loc) => {
    const cleanName = loc.name.replace(
      /^(Ground Floor|1st Floor|2nd Floor|3rd Floor) - /,
      ""
    );
    return cleanName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedLocation = selectableLocations.find((loc) => loc.id === value);
  const selectedName = selectedLocation
    ? selectedLocation.name.replace(/^(Ground Floor|1st Floor|2nd Floor|3rd Floor) - /, "")
    : "";

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold uppercase tracking-wide text-foreground">
        {label}
      </label>

      {/* Modern Floor Segmented Control */}
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-secondary/80 p-1 border-2 border-foreground">
        {[0, 1, 2, 3].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              onFloorChange(f);
              // Clear current selection if switching floors
              onValueChange("");
            }}
            className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${floor === f
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {f === 0 ? "G" : `${f}F`}
          </button>
        ))}
      </div>

      {/* Room Searchable Dropdown Select */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-between border-2 border-foreground bg-card px-4 py-2 text-foreground font-medium rounded-md text-sm cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary/20 transition-all text-left"
          >
            <span className={selectedName ? "text-foreground font-semibold" : "text-muted-foreground"}>
              {selectedName || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[var(--radix-popover-trigger-width)] min-w-[240px]"
        >
          <div className="flex items-center border-b-2 border-foreground px-3 h-10">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-foreground" />
            <input
              type="text"
              placeholder="Search room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-full w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5">
            {searchedLocations.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No rooms found
              </div>
            ) : (
              searchedLocations.map((location) => {
                const cleanName = location.name.replace(
                  /^(Ground Floor|1st Floor|2nd Floor|3rd Floor) - /,
                  ""
                );
                const isSelected = location.id === value;
                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => {
                      onValueChange(location.id);
                      setOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span>{cleanName}</span>
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
