"use client";

import { useExercise } from "@/api/exercises/queries";
import ExerciseWorkoutsList from "./exercise-workouts-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Generates YouTube embed URL with Short-optimized parameters
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options?: {
    autoplay?: boolean;
    start?: number;
    mute?: boolean;
    loop?: boolean;
  },
): string {
  const params = new URLSearchParams();

  if (options?.autoplay) params.set("autoplay", "1");
  if (options?.start) params.set("start", options.start.toString());
  if (options?.mute) params.set("mute", "1");
  if (options?.loop) {
    params.set("loop", "1");
    params.set("playlist", videoId); // Required for looping
  }

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ""}`;
}

/**
 * Generates YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "medium" | "high" | "maxres" = "medium",
): string {
  const qualityMap = {
    default: "default", // 120x90
    medium: "mqdefault", // 320x180
    high: "hqdefault", // 480x360
    maxres: "maxresdefault", // 1280x720 (if available)
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export default function ExerciseDetails({
  exerciseId,
}: {
  exerciseId: number;
}) {
  const { data } = useExercise(exerciseId);

  const video =
    data?.videoUrls && data?.videoUrls.length > 0 ? data?.videoUrls[0] : null;

  return (
    <div className="space-y-4">
      {data && (
        <>
          <h2 className="text-center text-xl">{data.name}</h2>
          <Tabs defaultValue="instructions">
            <TabsList className="w-full rounded-none">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            <div className="px-4">
              <TabsContent value="instructions">
                {!!video && (
                  <div className="mx-auto aspect-[9/16] max-w-lg overflow-hidden rounded-lg">
                    <iframe
                      src={getYouTubeEmbedUrl(video)}
                      title={`${data.name} - Exercise Demo`}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {!video && (
                  <p className="text-muted-foreground">
                    No instructions for this exercise found..
                  </p>
                )}
              </TabsContent>
              <TabsContent value="workouts">
                {data && <ExerciseWorkoutsList exerciseId={data.id} />}
              </TabsContent>
              <TabsContent value="charts">
                <p className="text-muted-foreground">Charts coming soon..</p>
              </TabsContent>
            </div>
          </Tabs>
        </>
      )}
    </div>
  );
}
