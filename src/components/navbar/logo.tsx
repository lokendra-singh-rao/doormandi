import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <Link href={"/"} className="text-2xl font-bold text-gray-800 cursor-pointer">
        Door<span className="text-green-500 hover:text-green-600">Mandi</span>
      </Link>
    </div>
  );
};
