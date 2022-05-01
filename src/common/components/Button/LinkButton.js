import Link from "next/link";

const LinkButton = ({ href, className, children }) => {
  return (
    <Link href={href}>
      <a className={`rounded-lg text-center text-sm font-medium shadow-md transition duration-300 focus:outline-none ${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
