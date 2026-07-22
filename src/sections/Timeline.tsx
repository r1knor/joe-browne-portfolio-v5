import { SectionFrame } from '../components/SectionFrame';
import { experience } from '../data/experience';

export function Timeline() {
  return (
    <SectionFrame id="timeline" number="04" title="Nine years, in sequence." className="timeline">
      <p className="timeline__intro" data-timeline-intro>
        From first client websites to national rollouts, independent campaigns and international packaging systems—the thread is work built carefully enough to survive the real world.
      </p>

      <div className="timeline__body" data-timeline>
        <div className="timeline__track" aria-hidden="true"><span data-timeline-progress /></div>
        <ol>
          {experience.map((item, index) => (
            <li key={`${item.dates}-${item.organisation}`} data-timeline-role>
              <span className="timeline__node" aria-hidden="true" />
              <span className="timeline__date">{item.dates}</span>
              <article className="timeline__entry">
                <div className="timeline__role-heading">
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.organisation}</em>
                  </span>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p>{item.description}</p>
                <span className="timeline__kind">{item.kind}</span>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}