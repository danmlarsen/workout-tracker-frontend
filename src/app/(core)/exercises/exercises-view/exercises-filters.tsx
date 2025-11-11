"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  EQUIPMENT_OPTIONS,
  MUSCLE_GROUP_OPTIONS,
  TEquipment,
  TMuscleGroup,
} from "@/lib/constants";

interface ExercisesFiltersProps {
  nameFilter: string;
  selectedEquipment: TEquipment[];
  selectedMuscleGroups: TMuscleGroup[];
  onNameFilterChange: (name: string) => void;
  onEquipmentChange: (equipment: TEquipment[]) => void;
  onMuscleGroupsChange: (muscleGroups: TMuscleGroup[]) => void;
}

export default function ExercisesFilters({
  nameFilter,
  selectedEquipment,
  selectedMuscleGroups,
  onNameFilterChange,
  onEquipmentChange,
  onMuscleGroupsChange,
}: ExercisesFiltersProps) {
  const toggleEquipment = (equipment: TEquipment) => {
    onEquipmentChange(
      selectedEquipment.includes(equipment)
        ? selectedEquipment.filter((e) => e !== equipment)
        : [...selectedEquipment, equipment],
    );
  };

  const toggleMuscleGroup = (muscleGroup: TMuscleGroup) => {
    onMuscleGroupsChange(
      selectedMuscleGroups.includes(muscleGroup)
        ? selectedMuscleGroups.filter((mg) => mg !== muscleGroup)
        : [...selectedMuscleGroups, muscleGroup],
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          placeholder="Search exercise name"
          aria-label="Exercise name"
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Muscle Groups</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="grid w-[100dvw] grid-cols-2 sm:max-w-md">
            <DropdownMenuCheckboxItem
              key="All"
              checked={selectedMuscleGroups.length === 0}
              onCheckedChange={() => onMuscleGroupsChange([])}
              onSelect={(e) => e.preventDefault()}
              className="py-4"
            >
              All
            </DropdownMenuCheckboxItem>
            {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
              <DropdownMenuCheckboxItem
                key={muscleGroup}
                className="py-4 capitalize"
                checked={selectedMuscleGroups.includes(muscleGroup)}
                onCheckedChange={() => toggleMuscleGroup(muscleGroup)}
                onSelect={(e) => e.preventDefault()}
              >
                {muscleGroup}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Equipment</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100dvw] sm:max-w-xs">
            <DropdownMenuCheckboxItem
              key="All"
              checked={selectedEquipment.length === 0}
              onCheckedChange={() => onEquipmentChange([])}
              onSelect={(e) => e.preventDefault()}
              className="py-4"
            >
              All
            </DropdownMenuCheckboxItem>
            {EQUIPMENT_OPTIONS.map((equipment) => (
              <DropdownMenuCheckboxItem
                key={equipment}
                className="py-4 capitalize"
                checked={selectedEquipment.includes(equipment)}
                onCheckedChange={() => toggleEquipment(equipment)}
                onSelect={(e) => e.preventDefault()}
              >
                {equipment}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
