import Link from "next/link";
import React, { useState } from "react";
import CrossIcon from "../SVGs/CrossIcon";

const Alert = ({ content = "", linkText = "", linkUrl = "" }) => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <div className="bg-secondary sticky lg:absolute top-[94px] w-full py-[6px] px-[13px] text-white lg:py-[15px] lg:px-0">
      <div className="container flex flex-col mx-auto lg:flex-row">
        <button
          className="ml-auto group lg:order-2"
          onClick={() => setIsOpen(false)}
        >
          <CrossIcon className="w-4 h-4 text-white group-hover:text-blue" />
        </button>
        <div className="flex items-center justify-center text-center text-body-mobile lg:text-body basis-full lg:mt-0 lg:flex-row">
          <p className="text-md">
            {content + " "}
            {linkUrl && (
              <span className="ml-0 lg:ml-2">
                <Link href={linkUrl}>
                  <a>{linkText}</a>
                </Link>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
