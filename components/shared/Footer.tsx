import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            width={128}
            height={38}
            alt="logo"
          />
        </Link>
        <p>© 2022 Evently. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
