type Props = {
  as?: 'h1' | 'h2';
  children: string;
};

export function AnimatedTitle({ as: Heading = 'h2', children }: Props) {
  const words = children.trim().split(/\s+/);

  return (
    <Heading data-section-title>
      {words.map((word, index) => (
        <span className="section-title__word" key={word + '-' + index}>
          <span>{word}</span>
        </span>
      ))}
    </Heading>
  );
}