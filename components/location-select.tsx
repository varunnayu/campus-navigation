"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSelectableLocations } from "@/lib/campus-data";

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
  const selectableLocations = getSelectableLocations().filter((loc) => loc.floor === floor);
  
  const filteredLocations = excludeId
    ? selectableLocations.filter((loc) => loc.id !== excludeId)
    : selectableLocations;

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
            className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              floor === f
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === 0 ? "G" : `${f}F`}
          </button>
        ))}
      </div>

      {/* Room Dropdown Select */}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-12 border-2 border-foreground bg-card text-foreground font-medium">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-2 border-foreground bg-card">
          {filteredLocations.length === 0 ? (
            <div className="p-3 text-center text-xs text-muted-foreground">
              No rooms available
            </div>
          ) : (
            filteredLocations.map((location) => {
              // Strip floor prefix for a cleaner list
              const cleanName = location.name.replace(
                /^(Ground Floor|1st Floor|2nd Floor|3rd Floor) - /,
                ""
              );
              return (
                <SelectItem
                  key={location.id}
                  value={location.id}
                  className="cursor-pointer hover:bg-secondary"
                >
                  {cleanName}
                </SelectItem>
              );
            })
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
