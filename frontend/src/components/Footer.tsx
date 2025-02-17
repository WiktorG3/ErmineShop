import { Github, Linkedin, Mail } from "lucide-react"
import React from "react";

interface LinkItem {
    name: string
    href: string
}

interface FooterSection {
    title: string
    links: LinkItem[]
}

const footerSections: FooterSection[] = [
    {
        title: "Orders",
        links: [
            { name: "Delivery & Payment", href: "#", },
            { name: "Insurance", href: "#", },
            { name: "Returns and complaints", href: "#", },
        ]
    },
    {
        title: "Promotions",
        links: [
            { name: "Promotions", href: "#", },
            { name: "Gift Cards", href: "#", },
            { name: "Guides", href: "#", },
        ]
    },
    {
        title: "About us",
        links: [
            { name: "Terms and conditions", href: "#", },
            { name: "Privacy policy", href: "#", },
            { name: "Cookies policy", href: "#", },
        ]
    },
]

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-900 text-white pt-6 pb-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h2 className="font-medium text-lg mb-4">{section.title}</h2>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}
                                           className="text-neutral-400 hover:text-indigo-400 text-sm transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h2 className="font-medium text-lg mb-4">Kontakt</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <a href="mailto:wiktor.gronostaj03@gmail.com"
                                   className="flex items-center text-sm text-neutral-400 hover:text-indigo-400">
                                    <Mail className="h-5 w-5 mr-2"/>
                                    wiktor.gronostaj03@gmail.com
                                </a>
                                <a href="https://github.com/WiktorG3"
                                   className="flex items-center text-sm text-neutral-400 hover:text-indigo-400">
                                    <Github className="h-5 w-5 mr-2"/>
                                    WiktorG3
                                </a>
                                <a href="https://www.linkedin.com/in/wiktor-gronostaj-4651412b1/"
                                   className="flex items-center text-sm text-neutral-400 hover:text-indigo-400">
                                    <Linkedin className="h-5 w-5 mr-2"/>
                                    Wiktor Gronostaj
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="mt-12 pt-4 border-t border-neutral-800">
            <div className="text-center text-sm text-neutral-500">© 2025 Wiktor Gronostaj. All rights reserved.</div>
        </div>
    </footer>
    );
};

export default Footer