import { ArrowNarrowRight } from "tabler-icons-react";
interface FeatureProps {
  title: string;
  children: any;
  className?: string;
}
export default function Feature({ title, children, className }: FeatureProps) {
  return (
    <div className={`grid grid-cols-8 ${className ? className : ""}`}>
      <div className="flex items-center justify-center col-span-1">
        <ArrowNarrowRight />
      </div>
      <div className="col-span-7 text-2xl font-bold">{title}</div>
      <div className="col-span-7 col-start-2">{children}</div>
    </div>
  );
}
