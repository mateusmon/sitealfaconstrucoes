type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
};

export function SectionHeading({ eyebrow, title, description, inverse }: SectionHeadingProps) {
  return (
    <div className={`section-heading${inverse ? " section-heading--inverse" : ""}`}>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <div className="section-heading-grid">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
