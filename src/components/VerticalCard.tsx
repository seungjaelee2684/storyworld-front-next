import Image from "next/image";
import Link from "next/link";

interface VerticalCardProps {
  href: string;
}

export function VerticalCard({
  href
}: VerticalCardProps) {
  return (
    <li className="w-full">
      <Link href={href} className="w-full h-full flex flex-col gap-2">
        {/* <Image src={"/images/logo.png"} alt="thumbnail" width={100} height={100} /> */}
        <div className="w-full h-[200px] bg-foreground/20 rounded-lg" />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">
            신비아이
          </h3>
        </div>
      </Link>
    </li>
  )
}