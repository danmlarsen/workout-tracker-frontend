import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextLift - Workout Tracker",
    short_name: "NextLift",
    description: "Workout logging, personal records, statistics, graphs",
    start_url: "/",
    display: "standalone",
    background_color: "#193349",
    theme_color: "#193349",
    icons: [
      {
        src: "/icons/icon-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icons/icon-384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
