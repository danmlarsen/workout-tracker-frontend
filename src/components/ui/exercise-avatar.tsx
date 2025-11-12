interface ExerciseAvatarProps {
  name: string;
}

export default function ExerciseAvatar({ name }: ExerciseAvatarProps) {
  return (
    <div className="bg-primary text-primary-foreground grid aspect-square place-items-center rounded-sm">
      {name
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .join("")
        .slice(0, 2)}
    </div>
  );
}
