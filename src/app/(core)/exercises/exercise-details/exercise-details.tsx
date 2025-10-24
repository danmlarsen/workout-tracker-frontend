"use client";

import { useExercise } from "@/api/exercises/queries";
import ExerciseWorkoutsList from "./exercise-workouts-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  return (
    <div className="space-y-4">
      {data && (
        <>
          <h2 className="text-center text-xl">{data.name}</h2>

          <Carousel>
            <CarouselContent>
              {data.videoUrls.map((video) => (
                <CarouselItem key={video}>
                  <div className="px-10">
                    <div className="mx-auto aspect-[9/16] max-w-xs">
                      <iframe
                        src={getYouTubeEmbedUrl(video)}
                        title={`${data.name} - Exercise Demo`}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {/* <div className="pointer-events-auto absolute inset-0 touch-pan-x bg-transparent" /> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Tabs defaultValue="workouts">
            <TabsList className="w-full rounded-none">
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="records">Records</TabsTrigger>
            </TabsList>
            <div className="px-4">
              <TabsContent value="workouts">
                {data && <ExerciseWorkoutsList exerciseId={data.id} />}
              </TabsContent>
              <TabsContent value="charts">
                <p className="text-muted-foreground">Charts coming soon..</p>
              </TabsContent>
              <TabsContent value="records">
                <p className="text-muted-foreground">Records coming soon..</p>
              </TabsContent>
            </div>
          </Tabs>
        </>
      )}
    </div>
  );
}
