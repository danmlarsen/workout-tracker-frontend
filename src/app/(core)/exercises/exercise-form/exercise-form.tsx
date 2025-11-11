"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCreateExercise } from "@/api/exercises/mutations";
import { EQUIPMENT_OPTIONS, MUSCLE_GROUP_OPTIONS } from "@/lib/constants";
import { Spinner } from "@/components/ui/spinner";
import { exerciseSchema } from "@/validation/exerciseSchema";

interface ExerciseFormProps {
  onSuccess?: () => void;
}

export default function ExerciseForm({ onSuccess }: ExerciseFormProps) {
  const form = useForm<z.infer<typeof exerciseSchema>>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      category: "strength",
      equipment: "barbell",
      targetMuscleGroups: [],
      secondaryMuscleGroups: [],
    },
  });
  const createExercise = useCreateExercise();

  const handleSubmit = async (data: z.infer<typeof exerciseSchema>) => {
    createExercise.mutate(data, {
      onSuccess: () => {
        toast.success(`Exercise: ${data.name} has been created`);
        onSuccess?.();
      },
      onError: () => {
        toast.error(
          "Failed to create a new exercise. This is probably due to a network issue. Please try again later.",
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="space-y-6"
          disabled={form.formState.isSubmitting || createExercise.isPending}
        >
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <FormItem>
                      <FormLabel className="dark:bg-input/30 bg-input/5 has-checked:bg-input/15 has-checked:dark:bg-input/75 border-input text-muted-foreground has-checked:text-foreground rounded-sm border p-4 has-checked:ring">
                        <FormControl>
                          <RadioGroupItem
                            value="strength"
                            className="sr-only"
                          />
                        </FormControl>
                        Strength
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="dark:bg-input/30 bg-input/5 has-checked:bg-input/15 has-checked:dark:bg-input/75 border-input text-muted-foreground has-checked:text-foreground rounded-sm border p-4 has-checked:ring">
                        <FormControl>
                          <RadioGroupItem value="cardio" className="sr-only" />
                        </FormControl>
                        Cardio
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
                <FormLabel>Equipment*</FormLabel>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2"
                  >
                    {EQUIPMENT_OPTIONS.map((item) => (
                      <FormItem key={item}>
                        <FormLabel className="dark:bg-input/30 bg-input/5 has-checked:bg-input/15 has-checked:dark:bg-input/75 border-input text-muted-foreground has-checked:text-foreground rounded-sm border p-4 has-checked:ring">
                          <FormControl>
                            <RadioGroupItem value={item} className="sr-only" />
                          </FormControl>
                          <span className="capitalize">{item}</span>
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
            name="targetMuscleGroups"
            render={() => (
              <FormItem>
                <FormLabel>Target Muscle Groups*</FormLabel>
                <FormMessage />
                <div className="grid grid-cols-2 gap-2">
                  {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
                    <FormField
                      key={muscleGroup}
                      control={form.control}
                      name="targetMuscleGroups"
                      render={({ field }) => (
                        <FormItem key={muscleGroup}>
                          <FormLabel className="dark:bg-input/30 bg-input/5 has-checked:bg-input/15 has-checked:dark:bg-input/75 border-input text-muted-foreground has-checked:text-foreground rounded-sm border p-4 has-checked:ring">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(muscleGroup)}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([
                                        ...field.value,
                                        muscleGroup,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== muscleGroup,
                                        ),
                                      )
                                }
                                className="sr-only"
                              />
                            </FormControl>
                            <span className="capitalize">{muscleGroup}</span>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryMuscleGroups"
            render={() => (
              <FormItem>
                <FormLabel>Secondary Muscle Groups</FormLabel>
                <FormMessage />
                <div className="grid grid-cols-2 gap-2">
                  {MUSCLE_GROUP_OPTIONS.map((muscleGroup) => (
                    <FormField
                      key={muscleGroup}
                      control={form.control}
                      name="secondaryMuscleGroups"
                      render={({ field }) => (
                        <FormItem key={muscleGroup}>
                          <FormLabel className="dark:bg-input/30 bg-input/5 has-checked:bg-input/15 has-checked:dark:bg-input/75 border-input text-muted-foreground has-checked:text-foreground rounded-sm border p-4 has-checked:ring">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(muscleGroup)}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([
                                        ...field.value,
                                        muscleGroup,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== muscleGroup,
                                        ),
                                      )
                                }
                                className="sr-only"
                              />
                            </FormControl>
                            <span className="capitalize">{muscleGroup}</span>
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
            {form.formState.isSubmitting ||
              (createExercise.isPending && <Spinner />)}
            Create Exercise
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
