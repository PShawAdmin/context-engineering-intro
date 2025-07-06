'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {Button} from "@heroui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Forms", href: "/forms" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .navbar-link {
          position: relative;
          padding-bottom: 2px;
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #D4A574;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .logo-breathe {
          animation: breathe 4s ease-in-out infinite;
        }

        .cta-refined {
          background: #D4A574;
          transition: all 0.3s ease;
        }

        .cta-refined:hover {
          background: #C4946A;
          box-shadow: 0 4px 15px 0 rgba(212, 165, 116, 0.2);
        }
      `}</style>

      <Navbar 
        shouldHideOnScroll={false}
        isBlurred
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`
          transition-all duration-300 overflow-x-hidden
          ${isScrolled 
            ? 'bg-nude-cream/95 backdrop-blur-lg shadow-soft py-2' 
            : 'bg-nude-cream/80 backdrop-blur-sm py-4'
          }
        `}
        maxWidth="xl"
      >
        <NavbarContent className="gap-2 pr-3">
          <NavbarMenuToggle
            aria-label="Toggle navigation menu"
            className="sm:hidden text-slate-600 hover:text-slate-700 transition-colors flex-shrink-0"
          />
          <NavbarBrand className="flex-grow overflow-hidden">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              {/* Professional photo as logo */}
              <div className="relative flex-shrink-0">
                <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-soft">
                  <Image
                    src="/images/peyton-shaw-professional.jpg"
                    alt="Peyton Shaw"
                    width={48}
                    height={48}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 w-10 sm:w-12 h-10 sm:h-12 bg-nude-sand rounded-full filter blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              
              {/* Brand name */}
              <span className="text-lg sm:text-xl md:text-2xl font-normal text-text-charcoal leading-tight font-serif truncate">
                <span className="hidden sm:inline">Peyton Shaw Counseling</span>
                <span className="sm:hidden">PSC</span>
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6 lg:gap-8" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link 
                href={item.href}
                className="navbar-link text-text-storm hover:text-nude-clay font-medium transition-all duration-300"
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          {/* Enhanced CTA button */}
          <NavbarItem className="flex">
            <Button 
              as={Link} 
              href="/contact" 
              className="cta-refined text-text-charcoal font-medium px-3 sm:px-4 md:px-6 py-2 text-sm md:text-base rounded-lg min-w-0"
              size="sm"
              startContent={
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <span className="hidden sm:inline">Book Your Session</span>
              <span className="sm:hidden">Book Now</span>
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile menu with enhanced design */}
        <NavbarMenu className="bg-nude-cream backdrop-blur-md pt-6">
          {/* Mobile brand info */}
          <div className="text-center mb-6 pb-6 border-b border-slate-200">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-soft">
              <Image
                src="/images/peyton-shaw-professional.jpg"
                alt="Peyton Shaw"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium text-text-storm">Peyton Shaw, LPC</p>
          </div>

          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`w-full text-lg py-2 ${
                  index === menuItems.length - 1 
                    ? "text-nude-clay font-medium" 
                    : "text-text-storm"
                } hover:text-nude-clay transition-colors duration-200`}
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="mt-6">
            <Button 
              as={Link} 
              href="/contact" 
              className="w-full cta-refined text-text-charcoal font-medium py-3 rounded-lg"
              onPress={() => setIsMenuOpen(false)}
              startContent={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              Book Your Session
            </Button>
          </NavbarMenuItem>

          {/* Contact info in mobile menu */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-text-light">
            <p className="mb-2">Questions? Call us:</p>
            <a href="tel:555-123-4567" className="text-nude-clay font-medium">
              (555) 123-4567
            </a>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}