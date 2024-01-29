"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setProviders = async() =>{
      const response = await getProviders()
      setProviders(response)
    }
    setProviders()
  }, []);
  return (
    <nav className="flex-between navbar w-full">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <div className="navlogo"> */}
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        {/* </div> */}
      </Link>
      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex-between gap">
            <Link href='/create-prompt' className="black_btn ">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href='/profile'>
            <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
            </Link>
          </div>
        ): (
          <>
          {providers && Object.values(providers).map((provider) => 
          <button type="button" key={provider.name} onClick={()=> signIn(provider.id)} className="black_btn">
            Sign In
          </button>
          ) }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
