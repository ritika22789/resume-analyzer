import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }

    loadResume();
  }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="resume-card-header flex justify-between items-start p-4 bg-[#FF6767]/10 rounded-t-2xl">
        <div className="flex flex-col gap-1">
          {companyName && <h2 className="!text-[#FF6767] font-bold break-words text-xl">{companyName}</h2>}
          {jobTitle && <h3 className="text-gray-500 break-words text-lg">{jobTitle}</h3>}
          {!companyName && !jobTitle && <h2 className="!text-[#FF6767] font-bold text-xl">Resume</h2>}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border p-2 bg-white rounded-b-2xl animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-lg"
            />
          </div>
        </div>
      )}
    </Link>
  )
}

export default ResumeCard;
