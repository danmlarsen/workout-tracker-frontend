export default function ExerciseAvatar({ name }: { name: string }) {
  return (
    <div className="rounded-sm bg-slate-200 grid aspect-square place-items-center">
      {name
        .split(' ')
        .map(w => w[0].toUpperCase())
        .join('')
        .slice(0, 2)}
    </div>
  );
}
