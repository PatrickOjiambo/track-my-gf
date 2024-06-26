"use client"
import React from "react";
import { useState } from "react";
import Link from "next/link";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { FiUser } from "react-icons/fi"
import { BiSearchAlt2 } from "react-icons/bi"
function NavBar() {

    const [searchItem, setSearchItem] = useState('')
    return (<div className="border-b pb-4">
        <ul className="flex justify-around pt-4 font-extralight">
            <li className="font-bold text-lg">Elegance</li>

            <ul className="flex text-base">
                <Link href='/'>
                {/* style={({ isActive }) => (isActive ? activeLink : null)} */}
                    <li className="hover:underline">Home</li>
                </Link>
                <Link href='/about'>

                    <li className="pl-6 hover:underline">About</li>
                </Link>
                <Link href='/contact'>

                    <li className="pl-6 hover:underline">Contact</li>
                </Link>
                <Link href='/signup'>

                    <li className="pl-6 hover:underline">Signup</li>
                </Link>
            </ul>
            <ul className="flex justify-around items-center">
                <div className="relative">
                    <label>
                        <input className="bg-inputGray text-xs border-solid rounded-md h-7 text-left focus:outline-none pl-2" value={searchItem} onChange={e => setSearchItem(e.target.value)} placeholder="What are you looking for" />
                    </label>
                    <div className="absolute hrefp-2 right-2">
                        <BiSearchAlt2 className="relative " />
                    </div>
                </div>
                <Link href='/cart'>

                    <li className="pl-6"><AiOutlineShoppingCart /></li>
                </Link>
                <Link href='/profile'>

                    <li className="pl-6"><FiUser /></li>
                </Link>
            </ul>

        </ul>
    </div>);
}

export default NavBar;