"use client";

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

export default function ExercisesFilters({
  nameFilter,
  selectedEquipment,
  selectedMuscleGroups,
  onNameFilterChange,
  onEquipmentChange,
  onMuscleGroupsChange,
}: {
  nameFilter: string;
  selectedEquipment: TEquipment[];
  selectedMuscleGroups: TMuscleGroup[];
  onNameFilterChange: (name: string) => void;
  onEquipmentChange: (equipment: TEquipment[]) => void;
  onMuscleGroupsChange: (muscleGroups: TMuscleGroup[]) => void;
}) {
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
      <div className="grid grid-cols-2">
        <DropdownMenu>
          <DropdownMenuTrigger>Equipment</DropdownMenuTrigger>
          <DropdownMenuContent>
            {EQUIPMENT_OPTIONS.map((equipment) => (
              <DropdownMenuCheckboxItem
                key={equipment}
                className="capitalize"
                checked={selectedEquipment.includes(equipment)}
                onCheckedChange={() => toggleEquipment(equipment)}
              >
                {equipment}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>Muscle Groups</DropdownMenuTrigger>
          <DropdownMenuContent className="grid grid-cols-2">
            {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
              <DropdownMenuCheckboxItem
                key={muscleGroup}
                className="capitalize"
                checked={selectedMuscleGroups.includes(muscleGroup)}
                onCheckedChange={() => toggleMuscleGroup(muscleGroup)}
              >
                {muscleGroup}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
