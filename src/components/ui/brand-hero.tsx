import Image from "next/image";
import type { ReactNode } from "react";

type BrandHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  brandSrc: string;
  brandAlt: string;
  actions: ReactNode;
  footer?: ReactNode;
};

export function BrandHero({
  eyebrow,
  title,
  description,
  brandSrc,
  brandAlt,
  actions,
  footer,
}: BrandHeroProps) {
  return (
    <section className="brand-hero dark-surface">
      <div className="brand-hero-stage">
        <div className="shell brand-hero-content">
          <div className="brand-hero-layout">
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />{eyebrow}</p>
            <h1>{title}</h1>
            <div className="brand-hero-mark" role="img" aria-label={brandAlt}>
              <Image
                src={brandSrc}
                alt=""
                width={1254}
                height={1254}
                sizes="(max-width: 800px) 58vw, 36vw"
                priority
              />
            </div>
            <div className="brand-hero-intro">
              <p>{description}</p>
              <div className="button-row">{actions}</div>
            </div>
          </div>
          <div className="brand-hero-bottom">
            <span>Engenharia civil com presença em campo</span>
            <span>Brasília/DF · Bahia</span>
          </div>
        </div>
      </div>
      {footer ? <div className="brand-hero-footer">{footer}</div> : null}
    </section>
  );
}
