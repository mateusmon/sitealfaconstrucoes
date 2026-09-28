import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/site";
import { ArrowUpRight } from "./icons";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article id={project.slug} className="project-card scroll-mt-28">
      <div className="project-media">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority={priority}
        />
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-copy">
        <p>{project.location}</p>
        <h3>{project.title}</h3>
        <span>{project.summary}</span>
        <Link href={`/contato?assunto=${encodeURIComponent(project.title)}`}>
          Falar sobre um projeto semelhante <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}
