import Image from "next/image";
import Link from "next/link";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link className="brand" href="/" aria-label="Gama Galvão Engenharia — início" onClick={onClick}>
      <span className="brand-symbol"><Image src="/images/logo-reference.png" alt="" width={64} height={64} /></span>
      <span className="brand-copy"><strong>Gama Galvão</strong><span>Engenharia</span></span>
    </Link>
  );
}
