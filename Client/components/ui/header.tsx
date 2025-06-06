"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [activeItem, setActiveItem] = useState("Leaderboards")
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Categories", href: "#categories" },
    { name: "Leaderboards", href: "/leaderboard" },
  ]
  
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className={`
        mx-auto transition-all duration-300 max-w-7xl px-6 py-2 rounded-full bg-black/70 border border-gray-800 backdrop-blur-md backdrop-blur-lg 
      `}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logo.svg" alt="Logo" width={30} height={30} />
            <a href="/"><span className="text-white">Quizzit</span></a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm ${
                  activeItem === item.name 
                    ? "text-white font-medium" 
                    : "text-gray-400 hover:text-white/90 transition-colors"
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            

            {/* rgb(247 154 84 / 67%) : rgb(159 229 249 / 73%) */} 
            <a href="/quiz/select">
            <button
  className="px-5 py-2 rounded-full text-sm text-white transition-colors bg-[linear-gradient(to_right,rgba(247,154,84,0.25),rgba(159,229,249,0.73))]"
>
  Try
</button>

            </a>
          </div>
        </div>
      </div>
    </div>
  )
}