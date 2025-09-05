import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),           // Home page
  route("/auth", "routes/auth.tsx"),  // Authentication page
  route("/upload", "routes/upload.tsx"), // Resume upload page
  route("/resume/:id", "routes/resume.tsx"), // Detailed resume review
  route("/wipe", "routes/wipe.tsx"),  // Admin / wipe app data
] satisfies RouteConfig;
