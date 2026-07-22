import { Link } from 'react-router-dom';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { projects } from '../data/projects';

export function Portfolio() {
  return (
    <section id="work" className="portfolio" data-section="work" data-portfolio>
      <span className="portfolio__index" aria-hidden="true">02</span>
      <header className="portfolio__pin">
        <AnimatedTitle>Proof, not promises.</AnimatedTitle>
        <p>
          A compact edit of interfaces, identity, key art, production artwork and music campaigns. Open any proof for the complete case.
        </p>
        <span aria-hidden="true">Selected work / {String(projects.length).padStart(2, '0')} cases</span>
      </header>

      <div className="portfolio__sequence">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={`project-stage project-stage--${project.orientation}`}
            data-project-stage
          >
            <div className="project-stage__media" data-project-media>
              <Link to={`/work/${project.slug}`} aria-label={`Open ${project.title} project`}>
                <ResponsiveImage image={project.coverImage} />
                <span className="project-stage__cursor" aria-hidden="true">View project</span>
                <span className="project-stage__view">Open full case <span aria-hidden="true">↗</span></span>
              </Link>
            </div>
            <div className="project-stage__caption">
              <span className="project-stage__index">P.{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <ul>{project.categories.map((category) => <li key={category}>{category}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}