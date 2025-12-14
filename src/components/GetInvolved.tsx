import Lottie from "lottie-react";
import mailAnim from "../assets/mail-lottie.json";
import chatAnim from "../assets/chat-lottie.json";
import groupAnim from "../assets/group-lottie.json";

const buttonStyle =
  "mt-4 inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50 bg-blue-100";
type Props = {
  mailingListUrl: string;
  meetupUrl: string;
  slackUrl: string;
  contactEmail?: string; // e.g. "terry@example.org"
};

export default function GetInvolved({
  mailingListUrl,
  meetupUrl,
  slackUrl,
  contactEmail,
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold">Get involved</h2>
        <p className="mt-2 text-slate-600">
          Join the community that’s building an open LoRaWAN across NYC.
        </p>
      </div>

      {/* cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Mailing list */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <Lottie
              animationData={mailAnim}
              loop={true}
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold">Join the mailing list</h3>
          <p className="mt-1 text-sm text-slate-700">
            Get updates about meetups and latest projects.
          </p>
          <a
            href={mailingListUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyle}
          >
            Subscribe
          </a>
        </div>

        {/* Meetup */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <Lottie
              animationData={groupAnim}
              loop={true}
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold">Join the Meetup group</h3>
          <p className="mt-1 text-sm text-slate-700">
            Come to hands-on sessions, talks, and build nights.
          </p>
          <a
            href={meetupUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyle}
          >
            See upcoming events
          </a>
        </div>

        {/* Slack */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <Lottie
              animationData={chatAnim}
              loop={true}
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold">Join the Slack</h3>
          <p className="mt-1 text-sm text-slate-700">
            Chat with volunteers, get help, and pair up on projects.
          </p>
          <a
            href={slackUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyle}
          >
            Get an invite
          </a>
        </div>
      </div>

      {/* contact line */}
      <div className="mt-8 text-center text-sm text-slate-600">
        For more details, contact New York Things Network initiator{" "}
        <strong>Terry Moore</strong>
        {contactEmail ? (
          <>
            {" "}
            at{" "}
            <a className="underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </>
        ) : (
          "."
        )}
      </div>
    </section>
  );
}
