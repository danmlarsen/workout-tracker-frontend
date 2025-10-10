export default function ExerciseAvatar({ name }: { name: string }) {
  return (
    <div className="bg-accent grid aspect-square place-items-center rounded-sm">
      {name
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .join("")
        .slice(0, 2)}
    </div>
  );
}
