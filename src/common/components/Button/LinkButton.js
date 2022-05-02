import Link from "next/link";

const LinkButton = ({ passHref, href, as, className, children }) => {
  return (
    <Link href={href} as={as} passHref={passHref}>
      <a className={`rounded-lg text-center text-sm font-medium shadow-md transition duration-300 focus:outline-none ${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
