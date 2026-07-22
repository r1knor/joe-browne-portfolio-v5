import { Link, Navigate, useParams } from 'react-router-dom';
import { ResponsiveImage } from './components/ResponsiveImage';
import { getProject, projects } from './data/projects';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/#work" replace />;

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const metadata = [
    project.client && ['Client', project.client],
    project.role && ['Role', project.role],
    project.deliverables?.length && ['Deliverables', project.deliverables.join(' / ')],
  ].filter(Boolean) as string[][];

  return (
    <main id="main" className="project-detail">
      <header className="project-detail__bar">
        <Link to="/#work">← Selected work</Link>
        <span>P.{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
      </header>

      <section className="project-detail__intro">
        <p>{project.categories.join(' / ')}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {metadata.length > 0 && (
          <dl>
            {metadata.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        )}
      </section>

      <figure className={`project-detail__cover project-detail__cover--${project.orientation}`}>
        <ResponsiveImage image={project.coverImage} eager sizes="100vw" />
      </figure>

      {project.galleryImages.map((image) => (
        <figure className="project-detail__gallery" key={image.src}>
          <ResponsiveImage image={image} sizes="100vw" />
        </figure>
      ))}

      <nav className="project-detail__next" aria-label="Other projects">
        <Link to={`/work/${previous.slug}`}><span>Previous</span>{previous.title}</Link>
        <Link to={`/work/${next.slug}`}><span>Next</span>{next.title}</Link>
      </nav>
    </main>
  );
}
