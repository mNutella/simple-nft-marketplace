import React from "react";

export default function MainIcons({
  className = "w-6 h-6 text-white",
  icon,
}) {
  if (icon === "discord") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.6239 5.39005C18.2217 4.74665 16.7181 4.27263 15.1459 4.00114C15.1173 3.9959 15.0887 4.00899 15.0739 4.03518C14.8805 4.37913 14.6663 4.82784 14.5163 5.18052C12.8254 4.92736 11.1431 4.92736 9.48679 5.18052C9.33676 4.82 9.11478 4.37913 8.92053 4.03518C8.90578 4.00987 8.87718 3.99677 8.84855 4.00114C7.27725 4.27176 5.7736 4.74579 4.37052 5.39005C4.35838 5.39528 4.34797 5.40402 4.34106 5.41536C1.48894 9.67636 0.707629 13.8326 1.09092 17.9374C1.09265 17.9574 1.10392 17.9766 1.11953 17.9889C3.00127 19.3708 4.82406 20.2097 6.61301 20.7658C6.64164 20.7745 6.67197 20.764 6.69019 20.7405C7.11337 20.1626 7.49059 19.5532 7.81402 18.9125C7.83311 18.8749 7.81489 18.8304 7.77588 18.8156C7.17754 18.5886 6.6078 18.3119 6.05975 17.9976C6.0164 17.9723 6.01293 17.9103 6.05281 17.8806C6.16814 17.7942 6.2835 17.7043 6.39363 17.6135C6.41355 17.5969 6.44131 17.5934 6.46474 17.6039C10.0652 19.2477 13.9631 19.2477 17.521 17.6039C17.5445 17.5925 17.5722 17.596 17.593 17.6126C17.7032 17.7034 17.8185 17.7942 17.9347 17.8806C17.9746 17.9103 17.972 17.9723 17.9286 17.9976C17.3806 18.318 16.8108 18.5886 16.2116 18.8147C16.1726 18.8295 16.1553 18.8749 16.1744 18.9125C16.5047 19.5523 16.882 20.1617 17.2973 20.7396C17.3147 20.764 17.3459 20.7745 17.3745 20.7658C19.1721 20.2097 20.9949 19.3708 22.8766 17.9889C22.8931 17.9766 22.9035 17.9583 22.9053 17.9382C23.364 13.1927 22.1369 9.07052 19.6525 5.41623C19.6465 5.40402 19.6361 5.39528 19.6239 5.39005ZM8.35169 15.438C7.26771 15.438 6.37454 14.4428 6.37454 13.2207C6.37454 11.9985 7.25039 11.0033 8.35169 11.0033C9.46163 11.0033 10.3462 12.0072 10.3288 13.2207C10.3288 14.4428 9.45296 15.438 8.35169 15.438ZM15.6619 15.438C14.5779 15.438 13.6847 14.4428 13.6847 13.2207C13.6847 11.9985 14.5606 11.0033 15.6619 11.0033C16.7718 11.0033 17.6563 12.0072 17.639 13.2207C17.639 14.4428 16.7718 15.438 15.6619 15.438Z" />
      </svg>
    );
  }

  if (icon === "arrow-down") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9201 8.95001L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95001"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "wallet") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12H14"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "ethereum") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4499 3.05006L6.7099 7.71006C5.8599 8.77006 6.1599 10.1301 7.3699 10.7301L11.0999 12.6001C11.5899 12.8401 12.3899 12.8401 12.8799 12.6001L16.6099 10.7301C17.8199 10.1201 18.1199 8.76006 17.2699 7.71006L13.5399 3.05006C12.6999 1.98006 11.2999 1.98006 10.4499 3.05006Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2.30005V7.56005"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.7998 10.7101L11.9998 7.56006L16.1998 10.7101"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.76987 14.43L10.3799 15.15C11.4099 15.61 12.5899 15.61 13.6299 15.15L15.2399 14.43C16.6799 13.79 18.0099 15.53 17.0099 16.75L13.5499 20.98C12.6999 22.02 11.3099 22.02 10.4499 20.98L6.99987 16.75C5.98987 15.53 7.31987 13.79 8.76987 14.43Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "long-right-arrow") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4299 5.93005L20.4999 12.0001L14.4299 18.0701"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 12H20.33"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "search") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
