"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { toast } from "sonner";

const exerciseSchema = z.object({
  name: z.string().min(2, "Exercise name too short (min 2 characters)"),
  category: z.enum(["strength", "cardio"], "Invalid type"),
  equipment: z.enum(EQUIPMENT_OPTIONS, "Invalid equipment"),
  targetMuscleGroups: z
    .array(z.enum(MUSCLE_GROUP_OPTIONS))
    .min(1, "Please pick at least one target muscle group"),
  secondaryMuscleGroups: z.array(z.enum(MUSCLE_GROUP_OPTIONS)),
});

export default function ExerciseForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
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
  const createExerciseMutation = useCreateExercise();

  async function handleSubmit(data: z.infer<typeof exerciseSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    createExerciseMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`Exercise: ${data.name} has been created`);
        onSuccess?.();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset className="space-y-6" disabled={form.formState.isSubmitting}>
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
                      <FormLabel className="has-checked:bg-primary has-checked:text-primary-foreground bg-muted text-muted-foreground rounded-sm p-4">
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
                      <FormLabel className="has-checked:bg-primary has-checked:text-primary-foreground bg-muted text-muted-foreground rounded-sm p-4">
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
                        <FormLabel className="has-checked:bg-primary has-checked:text-primary-foreground bg-muted text-muted-foreground rounded-sm p-4">
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
                          <FormLabel className="has-checked:bg-primary has-checked:text-primary-foreground bg-muted text-muted-foreground rounded-sm p-4">
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
                          <FormLabel className="has-checked:bg-primary has-checked:text-primary-foreground bg-muted text-muted-foreground rounded-sm p-4">
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
            {form.formState.isSubmitting && <Spinner />}
            Create Exercise
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
