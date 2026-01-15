import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";

const Achievements = forwardRef(function Achievements(props, ref) {
  const [codeforces, setCodeforces] = useState({
    handle: "mdraihanhossen",
    rating: 1078,
    maxRating: 1168,
    problemsSolved: 365,
    rank: "newbie",
  });

  useEffect(() => {
    async function fetchCodeforces() {
      try {
        const res = await fetch(
          "https://codeforces.com/api/user.info?handles=mdraihanhossen&checkHistoricHandles=false"
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.status !== "OK" || !data.result || !data.result[0]) return;

        const user = data.result[0];
        setCodeforces((prev) => ({
          ...prev,
          handle: user.handle || prev.handle,
          rating: user.rating ?? prev.rating,
          maxRating: user.maxRating ?? prev.maxRating,
          rank: user.rank || prev.rank,
        }));
      } catch (e) {
        // On any error, keep the default fallback data
      }
    }

    fetchCodeforces();
  }, []);

  return (
    <div ref={ref} className="">
      <p className="text-stone-100 font-medium mb-3">Achievements</p>

      <div className="bg-[#11111100] rounded-4xl  w-full text-stone-300">
        <div className="space-y-6">
          <AchievementCard
            title="First Runner-Up in JUST ACM Laboratory Junior level Programming Contest"
            description="Jashore University of Science and Technology"
            logoSrc="/assets/icons/achievements/just_logo.png"
            logoAlt="Institution logo"
          />

          <AchievementCard
            title="Champion in Cubicle 1.0 Quiz Competetion on Robotics"
            description="JUST Robo Society"
            logoSrc="/assets/icons/achievements/just_robo_society.png"
            logoAlt="Institution logo"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <PlatformProfile
              name="Codeforces"
              handle={codeforces.handle}
              rating={`${codeforces.rating} (max ${codeforces.maxRating})`}
              problemsSolved={codeforces.problemsSolved}
              //   extra={`Rank: ${codeforces.rank}`}
              logoSrc="/assets/icons/achievements/codeforces.png"
              logoAlt="Codeforces logo"
              profileUrl={`https://codeforces.com/profile/${codeforces.handle}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

function AchievementCard({ title, description, logoSrc, logoAlt }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#ffffff10] rounded-2xl p-3 sm:p-4">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00000040] rounded-2xl flex items-center justify-center">
        <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
      </div>
      <div>
        <p className="text-stone-100 font-semibold text-xs sm:text-sm">{title}</p>
        <p className="text-stone-300 text-[11px] sm:text-xs mt-1">{description}</p>
      </div>
    </div>
  );
}

function PlatformProfile({
  name,
  handle,
  rating,
  problemsSolved,
  logoSrc,
  logoAlt,
  profileUrl,
  extra,
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      className="w-full md:w-1/2 bg-[#ffffff10] rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-[#ffffff18] transition-colors"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00000040] rounded-2xl flex items-center justify-center">
        <Image src={logoSrc} alt={logoAlt} width={40} height={40} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-stone-100 font-medium text-xs sm:text-sm">{name}</p>
        <p className="text-stone-300 text-[11px] sm:text-xs font-bold ">{handle}</p>
        <p className="text-stone-300 text-[11px] sm:text-xs">Rating: {rating}</p>
        <p className="text-stone-300 text-[11px] sm:text-xs">
          Problems solved: {problemsSolved}
        </p>
        {extra && <p className="text-stone-300 text-[11px] sm:text-xs">{extra}</p>}
      </div>
    </a>
  );
}

export default Achievements;
