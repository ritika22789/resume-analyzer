import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: 'Resumind | Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading, auth.isAuthenticated, id, navigate]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id, fs, kv]);

  return (
    <main className="!pt-0 bg-white">
      {/* Back button */}
      <nav className="flex items-center px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#FF6767] hover:text-[#FF9A9A] font-semibold"
        >
          <img src="/icons/back.svg" alt="back" className="w-4 h-4" />
          Back to Homepage
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse max-lg:px-6">
        {/* Resume preview */}
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 flex items-center justify-center p-4 max-lg:h-auto">
          {imageUrl && resumeUrl ? (
            <div className="animate-in fade-in duration-1000 gradient-border rounded-2xl w-full max-w-md h-[90%] max-lg:h-auto">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-40" />
          )}
        </section>

        {/* Feedback section */}
        <section className="feedback-section flex-1 p-6 max-lg:pt-6">
          <h2 className="text-4xl font-bold text-[#FF6767] mb-6">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS?.score || 0} suggestions={feedback.ATS?.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif" className="w-40" />
              <p className="text-[#FF6767]/80 mt-2">Loading resume feedback...</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
