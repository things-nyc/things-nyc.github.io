type TeamMember = {
  name: string;
  profileUrl?: string;
  imageUrl?: string;
};

export default function People() {
  const teamMembers: TeamMember[] = [
    { name: "Forrest Filler", profileUrl: "https://github.com/forrestfiller", imageUrl: "https://avatars.githubusercontent.com/u/18606441?v=4" },
    { name: "Eliott Highfill", profileUrl: "https://github.com/highfile", imageUrl: "https://avatars.githubusercontent.com/u/18274388?v=4" },
    { name: "Terry Moore", profileUrl: "https://github.com/terrillmoore", imageUrl: "https://avatars.githubusercontent.com/u/19333103?v=4" },
    {
      name: "Shubham Arya",
      profileUrl: "https://www.shubhamarya.com/?source=ttnyc", imageUrl: "https://avatars.githubusercontent.com/u/17561119?v=4"
      
    },
    { name: "Jeff Honig", profileUrl: "https://github.com/jchonig", imageUrl: "https://avatars.githubusercontent.com/u/4303886?v=4" },
    { name: "Chris Merck", profileUrl: "https://github.com/chrismerck", imageUrl: "https://avatars.githubusercontent.com/u/628921?v=4" },
    { name: "Mimi Flynn", profileUrl: "https://github.com/mimiflynn", imageUrl: "https://avatars.githubusercontent.com/u/414934?v=4" },
    { name: "Frank Leon Rose", profileUrl: "https://github.com/frankleonrose", imageUrl: "https://avatars.githubusercontent.com/u/1261725?v=4" },
    { name: "Chris Stratton", profileUrl: "https://github.com/cstratton", imageUrl: "https://avatars.githubusercontent.com/u/1143408?v=4" },
    {
      name: "Jon Bosak",
      profileUrl: "https://en.wikipedia.org/wiki/Jon_Bosak", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Jon_Bosak.jpg/500px-Jon_Bosak.jpg"},
    { name: "Brian Vant-Hull" },
  ];

  // Array of subtle gradient combinations for avatars
  const avatarGradients = [
    "from-slate-200 to-slate-300",
    "from-blue-100 to-slate-200",
    "from-slate-300 to-slate-400",
    "from-indigo-100 to-slate-200",
    "from-slate-200 to-blue-200",
    "from-gray-200 to-slate-300",
    "from-slate-300 to-indigo-200",
    "from-blue-200 to-slate-300",
    "from-slate-200 to-gray-300",
    "from-indigo-100 to-blue-200",
    "from-slate-300 to-blue-300",
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 relative">
        {/* Subtle gradient background for header */}
        <div className="absolute inset-0 -mx-4 -my-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl -z-10" />
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Meet the Team
          </h1>
          <p className="text-lg text-slate-600 max-w-prose">
            Meet the current and past contributors who make The Things Network
            NYC possible. These dedicated individuals have helped build and grow
            our community-driven sensor network across New York.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((teamMember, index) => (
          <div
            key={teamMember.name}
            className="group relative rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-blue-200 hover:ring-1 hover:ring-blue-200 hover:scale-[1.02] transition-all motion-safe:duration-300 overflow-hidden"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 via-blue-50/0 to-indigo-50/0 group-hover:from-slate-50/50 group-hover:via-blue-50/30 group-hover:to-indigo-50/20 transition-all duration-300 -z-0 rounded-xl" />

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar with gradient or image */}
                {teamMember.imageUrl ? (
                  <img
                    src={teamMember.imageUrl}
                    alt={teamMember.name}
                    className="flex-shrink-0 w-12 h-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300"
                  />
                ) : (
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${
                      avatarGradients[index % avatarGradients.length]
                    } flex items-center justify-center text-slate-700 font-semibold text-lg shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                  >
                    {teamMember.name
                      .split(" ")
                      .map((n) => n.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {teamMember.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Team Member</p>
                </div>
              </div>

              {/* Profile link */}
              {teamMember.profileUrl && (
                <a
                  href={teamMember.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors group/link"
                >
                  <span>View Profile</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
