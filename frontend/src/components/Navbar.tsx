"use client"

import React, { useState, useEffect } from "react";
import { Menu, User, Settings, ShoppingCart, ChevronRight } from "lucide-react"

interface LinkItem {
    name: string
    href: string
}

interface Category {
    name: string
    subcategories: LinkItem[]
}

interface DropdownMenuProps {
    category: Category;
    isOpen: boolean;
}

const categories: Category[] = [
    {
        name: "Computers and laptops",
        subcategories: [
            { name: "All", href: "#", },
            { name: "Laptops", href: "#", },
            { name: "Computers", href: "#", },
        ],
    },
    {
        name: "Smartphones and tablets",
        subcategories: [
            { name: "All", href: "#", },
            { name: "Smartphones", href: "#", },
            { name: "Tablets", href: "#", },
            { name: "Smartwatches", href: "#", },
            { name: "Accessories", href: "#", },
        ],
    },
    {
        name: "Computer components",
        subcategories: [
            { name: "All", href: "#", },
            { name: "Processors", href: "#", },
            { name: "Motherboards", href: "#", },
            { name: "RAM", href: "#", },
            { name: "Graphic cards",  href: "#", },
            { name: "Hard drives and SSDs", href: "#", },
            { name: "Power supplies", href: "#", },
            { name: "Cases", href: "#", },
            { name: "CPU cooling", href: "#", },
        ],
    },
    {
        name: "Peripheral devices",
        subcategories: [
            { name: "All", href: "#", },
            { name: "Mouses", href: "#", },
            { name: "Keyboards", href: "#", },
            { name: "Headphones", href: "#", },
            { name: "Webcams", href: "#", },
            { name: "Printers and scanners", href: "#", },
        ],
    },
    {
        name: "Promotions and news",
        subcategories: [
            { name: "All", href: "#", },
            { name: "Promotions", href: "#", },
            { name: "News", href: "#", },
        ],
    },
]

const userMenu: LinkItem[] = [
    { name: "Profile", href: "#" },
    { name: "Orders", href: "#" },
    { name: "Wishlist", href: "#" },
    { name: "Logout", href: "#" },
]

const settingsMenu: LinkItem[] = [
    { name: "Support", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Returns", href: "#" },
    { name: "FAQ", href: "#" },
]

const DropdownMenu: React.FC<DropdownMenuProps> = ({ category, isOpen }) => {
    if (!isOpen) return null

    return (
        <div className="absolute top-full left-0 w-64 bg-neutral-900 shadow-lg rounded-b-md overflow-hidden">
            <div className="py-2">
                {category.subcategories.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="flex items-center justify-between px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-indigo-400"
                    >
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

const Navbar: React.FC = ()=> {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [activeHeaderDropdown, setActiveHeaderDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full bg-neutral-900 text-white z-50 transition-all duration-300 ${
            isScrolled ? "shadow-lg" : ""
        }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu className="h-6 w-6" />
                        </button>
                        <a href="/" className="flex items-center">
                            {/*<img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />*/}
                            <span className="text-lg font-bold hover:text-indigo-400">Ermine Shop</span>
                        </a>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full px-4 py-2 bg-neutral-800 border-1 border-neutral-700 rounded-md focus:outline-none"
                            />
                            <div className="absolute right-0 top-0 h-full">
                                <select className="h-full px-4 bg-neutral-800 border-1 border-neutral-700 rounded-r-md focus:outline-none">
                                    <option value="">All</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div
                            className="items-center gap-2 relative"
                            onMouseEnter={() => setActiveHeaderDropdown("user")}
                            onMouseLeave={() => setActiveHeaderDropdown(null)}
                        >
                            <button className="md:flex items-center gap-2 cursor-pointer hover:text-indigo-400">
                                <User className="h-6 w-6"/>
                                <span className="hidden md:flex text-sm">Login</span>
                            </button>
                            <DropdownMenu
                                category={{name: "Profile", subcategories: userMenu}}
                                isOpen={activeHeaderDropdown === "user"}
                            />
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveHeaderDropdown("support")}
                            onMouseLeave={() => setActiveHeaderDropdown(null)}
                        >
                            <button className="md:flex items-center cursor-pointer hover:text-indigo-400">
                                <Settings className="h-6 w-6"/>
                            </button>
                            <DropdownMenu
                                category={{name: "Support", subcategories: settingsMenu}}
                                isOpen={activeHeaderDropdown === "support"}
                            />
                        </div>
                        <button className="relative cursor-pointer hover:text-indigo-400">
                            <ShoppingCart className="h-6 w-6"/>
                            <span
                                className="absolute -top-1 -right-1 bg-indigo-400 text-xs rounded-full h-4 w-4 flex items-center justify-center text-white">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                <div
                    className={`hidden lg:block transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden" : "h-12"}`}>
                        <ul className="flex items-center h-full gap-6 text-sm">
                            {categories.map((category, index) => (
                            <li
                                key={index}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <a href="#"
                                   className={`hover:text-indigo-400 ${index === categories.length - 1 ? "text-indigo-400" : ""}`}>
                                    {category.name}
                                </a>
                                <DropdownMenu category={category} isOpen={activeDropdown === index} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
                    <div className="px-4 py-2 bg-neutral-900">
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            className="w-full px-4 py-2 bg-neutral-800 border-1 border-neutral-700 rounded-md focus:outline-none"
                        />
                    </div>
                    <ul className="px-4 py-2">
                        {categories.map((category, index) => (
                            <li key={index} className="py-2">
                                <button
                                    className="flex items-center justify-between w-full text-left hover:text-indigo-400"
                                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                >
                                <span>{category.name}</span>
                                <ChevronRight
                                    className={`h-4 w-4 transition-transform ${activeDropdown === index ? "rotate-90" : ""}`}
                                />
                                </button>
                                {activeDropdown === index && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {category.subcategories?.map((item, subIndex) => (
                                            <a key={subIndex} href={item.href} className="block text-sm text-neutral-300 hover:text-indigo-400 py-1">
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>
                            ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;