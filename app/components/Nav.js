import { getMenu } from "@/utils/shopify";
import Link from "next/link";

const SITE_NAME = process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME;
export default async function Nav() {
  const menu = await getMenu("main-menu");

  return (
    <>
      <Link href="/">{SITE_NAME}</Link>
      <ul className="gap-6 text-sm md:flex md:items-center">
        {menu.length
          ? menu.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
