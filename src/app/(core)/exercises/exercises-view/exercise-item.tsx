import { TExercise } from "@/api/exercises/types";
import ExerciseAvatar from "@/components/ui/exercise-avatar";

export default function ExerciseItem({
  exercise,
  onExerciseClick,
}: {
  exercise: TExercise;
  onExerciseClick: (id: number) => void;
}) {
  return (
    <li key={exercise.id}>
      <button
        className="grid w-full grid-cols-[50px_1fr_50px] items-center gap-4 py-4"
        onClick={() => onExerciseClick(exercise.id)}
      >
        <div>
          <ExerciseAvatar name={exercise.name} />
        </div>
        <div className="text-left">
          <h2 className="text-lg font-bold">{exercise.name}</h2>
          <p className="text-muted-foreground text-sm capitalize">
            {exercise.equipment}
          </p>
          <div>
            {exercise.targetMuscleGroups.map((muscleGroup, idx) => (
              <span
                key={muscleGroup}
                className="text-muted-foreground text-xs font-bold capitalize"
              >
                {muscleGroup}
                {idx + 1 !== exercise.targetMuscleGroups.length ? ", " : " "}
              </span>
            ))}
            {exercise.secondaryMuscleGroups.map((muscleGroup, idx) => (
              <span
                key={muscleGroup}
                className="text-muted-foreground text-xs capitalize"
              >
                {", "}
                {muscleGroup}
              </span>
            ))}
          </div>
        </div>
        <div>{exercise.timesUsed} times</div>
      </button>
    </li>
  );
}
