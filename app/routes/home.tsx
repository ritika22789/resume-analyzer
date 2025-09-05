import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, [kv]);

  return (
    <main className="min-h-screen w-full" style={{ backgroundColor: "#F5F0FF" }}>
      <Navbar />

      <section className="main-section max-w-6xl mx-auto px-6 py-16">
        <div className="page-heading text-center mb-12">
          <h1
            className="text-4xl font-bold mt-4 mb-4"
            style={{ color: "#333333" }}
          >
            Track Your Applications & Resume Ratings
          </h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2
              className="text-lg mb-2"
              style={{ color: "#333333", opacity: 0.8 }}
            >
              No resumes found. Upload your first resume to get feedback.
            </h2>
          ) : (
            <h2
              className="text-lg mb-2 font-bold"
              style={{ color: "#333333", opacity: 0.8 }}
            >
              Review your submissions and check AI-powered feedback.
            </h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
            <p style={{ color: "#FF6767", opacity: 0.8 }} className="mt-2">
              Loading resumes...
            </p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6767] to-[#FF9A9A] text-white text-xl font-semibold hover:opacity-90 transition"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
