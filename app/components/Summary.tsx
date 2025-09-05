import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
  const textColor = score > 70
    ? 'text-[#FF6767]'
    : score > 49
      ? 'text-[#FF8282]'
      : 'text-[#FFB3B3]';

  return (
    <div className="resume-summary px-4 py-3 border-t border-[#FF6767]/20">
      <div className="category flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-2xl font-semibold">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl font-semibold">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">
      <div className="flex flex-row items-center p-4 gap-8 bg-[#FF6767]/10">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#FF6767]">Your Resume Score</h2>
          <p className="text-sm text-[#FF6767]">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  )
}

export default Summary;
