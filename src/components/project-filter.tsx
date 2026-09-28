"use client";

import { useState } from "react";
import { portfolioProjects, type ProjectCategory } from "@/data/site";
import { ProjectCard } from "./project-card";

const filters: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "Infraestrutura",
  "Obras prediais",
  "Reformas",
];

export function ProjectFilter() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todos");
  const visible = active === "Todos" ? portfolioProjects : portfolioProjects.filter((project) => project.category === active);

  return (
    <>
      <h2 className="sr-only">Projetos realizados</h2>
      <div className="filter-bar" aria-label="Filtrar projetos">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} {visible.length === 1 ? "projeto" : "projetos"}
      </p>
      <div className="projects-grid projects-grid--all">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index === 0} />
        ))}
      </div>
    </>
  );
}
