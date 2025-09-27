'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useCreateExercise } from '@/api/exercises/queries';

const equipment = ['Barbell', 'Dumbbell', 'Kettlebell', 'Machine', 'Bodyweight', 'Cardio', 'Smith Machine', 'Cable', 'Safety Bar', 'Other'];
const muscleGroups = [
  'Chest',
  'Front Delts',
  'Middle Delts',
  'Rear Delts',
  'Biceps',
  'Triceps',
  'Forearms',
  'Lats',
  'Upper Back',
  'Lower Back',
  'Neck',
  'Abs',
  'Glutes',
  'Hamstrings',
  'Quadriceps',
  'Abductors',
  'Adductors',
  'Calves',
  'Olympic',
  'Full-Body',
  'Other',
];

const exerciseSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['reps', 'time']),
  equipment: z.enum(equipment),
  muscleGroups: z.array(z.enum(muscleGroups)).min(1),
});

export default function ExerciseForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<z.infer<typeof exerciseSchema>>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: '',
      type: 'reps',
      equipment: 'barbell',
      muscleGroups: [],
    },
  });
  const createExerciseMutation = useCreateExercise();

  async function handleSubmit(data: z.infer<typeof exerciseSchema>) {
    createExerciseMutation.mutate(data, {
      onSuccess,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Name</FormLabel>
              <FormControl>
                <Input placeholder="Please enter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex">
                  <FormItem>
                    <FormLabel className="has-checked:bg-blue-500 p-4 bg-gray-200 rounded-sm">
                      <FormControl>
                        <RadioGroupItem value="reps" className="sr-only" />
                      </FormControl>
                      Reps
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="has-checked:bg-blue-500 p-4 bg-gray-200 rounded-sm">
                      <FormControl>
                        <RadioGroupItem value="time" className="sr-only" />
                      </FormControl>
                      Time
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2">
                  {equipment.map(item => (
                    <FormItem key={item}>
                      <FormLabel className="has-checked:bg-blue-500 p-4 bg-gray-200 rounded-sm">
                        <FormControl>
                          <RadioGroupItem value={item} className="sr-only" />
                        </FormControl>
                        <span>{item}</span>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="muscleGroups"
          render={() => (
            <FormItem>
              <FormLabel>Muscle Group</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {muscleGroups.map(muscleGroup => (
                  <FormField
                    key={muscleGroup}
                    control={form.control}
                    name="muscleGroups"
                    render={({ field }) => (
                      <FormItem key={muscleGroup}>
                        <FormLabel className="has-checked:bg-blue-500 p-4 bg-gray-200 rounded-sm">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(muscleGroup)}
                              onCheckedChange={checked =>
                                checked ? field.onChange([...field.value, muscleGroup]) : field.onChange(field.value?.filter(value => value !== muscleGroup))
                              }
                              className="sr-only"
                            />
                          </FormControl>
                          <span>{muscleGroup}</span>
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Exercise
        </Button>
      </form>
    </Form>
  );
}
