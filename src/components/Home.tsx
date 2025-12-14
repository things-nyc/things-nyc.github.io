import { activeProjects } from "../data/projects";
import GetInvolved from "./GetInvolved";
import Mission from "./Mission";
import ProjectsRail from "./ProjectRail";
import Testimonial from "./Testimonial";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          A community-built network of sensors across New York.
        </h1>

        <p className="mt-3 text-lg text-slate-600 max-w-prose">
          We are a non-profit community supporting a free network for remote
          sensing for education, civic empowerment, and economic development in
          New York and around the world!
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-block px-4 py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
          >
            How does it work?
          </a>
          <a
            href="#"
            className="inline-block px-4 py-2 rounded-md border border-slate-200 font-semibold hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            Get Involved
          </a>
        </div>
      </section>
      {/* mission */}
      <Mission />
      <ProjectsRail items={activeProjects} />
      <GetInvolved
        mailingListUrl="https://nyc.us14.list-manage.com/subscribe?u=d7349e1cdf03ad115ff18f769&id=966c1f4151"
        meetupUrl="https://www.meetup.com/The-Things-Network-NYC-Community-Meetup/"
        slackUrl="https://join.slack.com/t/things-nyc/shared_invite/zt-3efly21ud-ZMXj~EAQGhn4BqrtO56xDA"
        contactEmail="terry@thethings.nyc"
      />
      <Testimonial
        videoSrc="videos/ny.mp4"
        quote="The Things Network lets independent municipal leaders like myself walk down a path that was previously unavailable to government, a third way between a municipal build out of a Wide Area Network and a massive franchise agreement with a private corporation. Together with The Things Network, government may now organize in concert with a diverse coalition of partners to create and enhance services at the local community level. "
        author="Gale A Brewer"
        role="Former Manhattan Borough President"
        link="https://en.wikipedia.org/wiki/Gale_Brewer"
      />
    </>
  );
}
