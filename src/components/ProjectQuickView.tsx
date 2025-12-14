import type { Project } from "../data/projects";
import Modal from "./Modal";

export default function ProjectQuickView({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  const id = "project-quickview-title";
  if (!project) return null;

  return (
    <Modal open={open} onClose={onClose} labelledById={id}>
      <div className="p-5 sm:p-6">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 id={id} className="text-3xl font-semibold leading-tight">
              {project.title}
            </h1>

            <div className="mt-1 text-sm text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
              <span>
                <span className="text-slate-500">Lead:</span> {project.lead}
              </span>
              <span>•</span>
              <span>
                <span className="text-slate-500">Status:</span> {project.status}
              </span>
              <span>•</span>
              <span className="text-slate-600">{project.projectType}</span>
            </div>
          </div>
          <br />

          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* image */}
        {project.imageUrl && (
          <div className="mt-4 overflow-hidden rounded-xl bg-slate-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* summary */}
        <div className="prose prose-slate mt-4">
          <p>{project.summary}</p>
        </div>

        {/* next steps */}
        {project.nextSteps?.length ? (
          <div className="mt-5">
            <h3 className="text-sm font-semibold">Next steps</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
              {project.nextSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* links */}
        {project.links && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold">Links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {project.links.website && (
                <li>
                  <a
                    className="underline"
                    href={project.links.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect with the project lead here
                  </a>
                </li>
              )}

              {project.links.documentation && (
                <>
                  <br />
                  <h2 className="text-sm font-semibold">
                    Check out Project documentation here:{" "}
                  </h2>
                </>
              )}
              {project.links.documentation && (
                <li>
                  <a
                    className="underline"
                    href={project.links.documentation}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Documentation
                  </a>
                </li>
              )}

              {project.links.repositories &&
                project.links.repositories.length > 0 && (
                  <>
                    <br />
                    <h2 className="text-sm font-semibold">
                      Project Repositories:
                    </h2>
                  </>
                )}
              {project.links.repositories?.map((r, i) => (
                <li key={i}>
                  <a
                    className="underline"
                    href={r}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repository{" "}
                    {project.links!.repositories!.length > 1 ? i + 1 : ""}
                  </a>
                </li>
              ))}

              {project.links.extra && project.links.extra.length > 0 && (
                <>
                  <br />
                  <h2 className="text-sm font-semibold">Extra Links:</h2>
                </>
              )}
              {project.links.extra?.map((e, i) => (
                <li key={i}>
                  <a
                    className="underline"
                    href={e}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
