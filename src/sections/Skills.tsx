import type { CSSProperties } from 'react';
import { SectionFrame } from '../components/SectionFrame';
import { skillGroups } from '../data/skills';

type InterfaceTool = { name: string; url: string; color: string; type: string };

const interfaceTools: readonly InterfaceTool[] = [
  { name: 'Photoshop', url: '/assets/icons/toolkit/photoshop.svg', color: '#31A8FF', type: 'Image' },
  { name: 'Illustrator', url: '/assets/icons/toolkit/illustrator.svg', color: '#FF9A00', type: 'Vector' },
  { name: 'InDesign', url: '/assets/icons/toolkit/indesign.svg', color: '#FF3366', type: 'Layout' },
  { name: 'Figma', url: '/assets/icons/toolkit/figma.svg', color: '#F24E1E', type: 'Prototype' },
  { name: 'Antigravity', url: '/assets/icons/toolkit/antigravity.svg', color: '#4285F4', type: 'Agent' },
  { name: 'Codex', url: '/assets/icons/toolkit/codex.svg', color: '#10A37F', type: 'Agent' },
  { name: 'Claude', url: '/assets/icons/toolkit/claude.svg', color: '#D97757', type: 'Agent' },
  { name: 'HTML5', url: '/assets/icons/toolkit/html.svg', color: '#E34F26', type: 'Front end' },
  { name: 'CSS', url: '/assets/icons/toolkit/css.svg', color: '#663399', type: 'Front end' },
  { name: 'JavaScript', url: '/assets/icons/toolkit/javascript.svg', color: '#F7DF1E', type: 'Front end' },
  { name: 'TypeScript', url: '/assets/icons/toolkit/typescript.svg', color: '#3178C6', type: 'Front end' },
  { name: 'React', url: '/assets/icons/toolkit/react.svg', color: '#61DAFB', type: 'Interface' },
  { name: 'GitHub', url: '/assets/icons/toolkit/github.svg', color: '#FFFFFF', type: 'Versioning' },
  { name: 'VS Code', url: '/assets/icons/toolkit/vscode.svg', color: '#007ACC', type: 'Editor' },
  { name: 'GSAP', url: '/assets/icons/toolkit/gsap.svg', color: '#88CE02', type: 'Motion' },
  { name: 'Webflow', url: '/assets/icons/toolkit/webflow.svg', color: '#4353FF', type: 'Build' },
] as const;

export function Skills() {
  return (
    <SectionFrame id="skills" number="03" title="Built to hold up." className="skills">
      <p className="skills__lead" data-reveal>
        Creative decisions are only useful when they survive production. The practice runs from identity and interface to the details that reach a printer, installer, shelf or sound system.
      </p>
      <ol className="skills__index">
        {skillGroups.map((group, index) => (
          <li key={group.id} data-reveal>
            <div className="skills__title">
              <span>C.{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.title}</h3>
            </div>
            <p>{group.statement}</p>
            <ul>
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <section className="tool-matrix" aria-labelledby="tool-matrix-title" data-reveal>
        <div className="tool-matrix__intro">
          <h3 id="tool-matrix-title">Design toolkit</h3>
        </div>
        <ul className="tool-matrix__grid">
          {interfaceTools.map((tool, index) => (
            <li
              key={tool.name}
              tabIndex={0}
              data-motion={index % 3}
              style={{ '--tool-color': tool.color } as CSSProperties}
            >
              <span className="tool-matrix__icon" aria-hidden="true">
                <span className="tool-matrix__fallback">{tool.name.slice(0, 2).toUpperCase()}</span>
                <img
                  src={tool.url}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  onError={(event) => { event.currentTarget.hidden = true; }}
                />
              </span>
              <strong>{tool.name}</strong>
              <small>{tool.type}</small>
            </li>
          ))}
        </ul>
      </section>
    </SectionFrame>
  );
}