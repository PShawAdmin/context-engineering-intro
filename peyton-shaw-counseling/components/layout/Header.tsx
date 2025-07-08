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
  NavbarMenuItem,
  Link,
  Button
} from "@heroui/react";
import { SITE_CONFIG } from '@/lib/constants';

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

        @keyframes gradientFlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .cta-gradient {
          background: #D4A574;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .cta-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, 
            #D4A574 0%, 
            #E5C4A1 20%, 
            #F5E6D3 35%,
            #C4946A 50%, 
            #D4A574 65%,
            #E5C4A1 80%, 
            #D4A574 100%);
          transform: translateX(-100%);
          transition: opacity 0.3s ease;
          opacity: 0;
        }
        
        .cta-gradient:hover::before {
          animation: gradientFlow 3s linear infinite;
          opacity: 1;
        }
        
        .cta-gradient span,
        .cta-gradient svg {
          position: relative;
          z-index: 1;
        }
        
        .cta-gradient:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px 0 rgba(212, 165, 116, 0.3);
        }
        
      `}</style>

      <Navbar 
        shouldHideOnScroll={false}
        isBlurred
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`
          transition-all duration-300 overflow-x-hidden relative
          ${isScrolled 
            ? 'bg-nude-cream/95 backdrop-blur-lg shadow-soft py-2' 
            : 'bg-nude-cream/80 backdrop-blur-sm py-4'
          }
        `}
        maxWidth="xl"
      >
        <NavbarContent className="sm:hidden basis-1/3 justify-start">
          <NavbarMenuToggle
            aria-label="Toggle navigation menu"
            className="text-slate-600 hover:text-slate-700 transition-colors"
          />
        </NavbarContent>
        
        <NavbarContent className="sm:hidden absolute left-1/2 transform -translate-x-1/2">
          <NavbarBrand>
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-script text-3xl text-nude-clay hover:text-nude-warm transition-colors duration-300 leading-none">
                PSC
              </span>
              <span className="font-script text-sm text-nude-clay hover:text-nude-warm transition-colors duration-300 mt-0.5 whitespace-nowrap">
                Peyton Shaw Counseling
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        
        <NavbarContent className="hidden sm:flex justify-start">
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="relative w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-soft">
                  <Image
                    src="/images/peyton-shaw-professional.jpg"
                    alt="Peyton Shaw"
                    width={48}
                    height={48}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-nude-sand rounded-full filter blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <span className="font-script text-4xl text-nude-clay hover:text-nude-warm transition-colors duration-300">
                PSC
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

        <NavbarContent justify="end" className="basis-1/3 sm:basis-auto">
          {/* Enhanced CTA button */}
          <NavbarItem className="flex">
            <Button 
              as={Link} 
              href="/contact" 
              className="cta-gradient bg-nude-clay text-white font-medium px-3 sm:px-4 md:px-6 py-2 text-sm md:text-base rounded-lg min-w-0 relative"
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
            <span className="font-script text-5xl text-nude-clay">
              PSC
            </span>
            <p className="text-sm font-medium text-text-storm mt-2">Peyton Shaw Counseling</p>
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
              className="w-full bg-nude-clay text-white font-medium py-3 rounded-lg hover:bg-nude-warm transition-colors"
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
            <a href={`tel:${SITE_CONFIG.phone}`} className="text-nude-clay font-medium">
              {SITE_CONFIG.phone}
            </a>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}