"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";
// import { TextGenerateEffectDemo } from "./TextGenerateEffectDemo"; 
import { BackgroundBeamsDemo } from "./container/BackgroundBeams";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function NavbarDemo() {
  const navItems = [
    {
      name: "Explore",
      link: "/explore",
    },
    {
      name: "Problems",
      link: "/problems",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
    
    <div className="w-full bg-black">
      <Navbar>    
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 rounded-4xl">
            <Link to="/signup">
            <NavbarButton variant="secondary">Login</NavbarButton>
            </Link>
            <NavbarButton variant="primary">Menu</NavbarButton>
          </div>
        </NavBody>
 
        
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link to="/signup">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full cursor-pointer"
              >
                Login
              </NavbarButton>
              </Link>
              
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Menu
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    <DummyContent />
    </div>
    </>
  );
}
 
const DummyContent = () => {
  return (
    <> 
      <BackgroundBeamsDemo />
    </>
  );
};