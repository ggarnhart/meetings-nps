import { CircleCheck, CircleX } from "tabler-icons-react";
interface FeatureInterface {
  included?: boolean;
  children: any;
  className?: string;
}
export default function Feature({
  included,
  children,
  className,
}: FeatureInterface) {
  return (
    <div className={`${className} grid grid-cols-12 gap-2  my-4 `}>
      <div className="col-span-2 text-center lg:col-span-1">
        {(undefined === included || included) && <CircleCheck />}
        {undefined !== included && !included && <CircleX />}
      </div>
      <div className="col-span-10 text-left lg:col-span-11">{children}</div>
    </div>
  );
}
