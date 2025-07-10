'use client'

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Individual Therapy', href: '/services/individual-therapy' },
      { name: 'Anxiety Management', href: '/services/anxiety-stress-management' },
      { name: 'Depression Treatment', href: '/services/depression-treatment' },
      { name: 'Relationship Counseling', href: '/services/relationship-counseling' },
    ],
    resources: [
      { name: 'About Me', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-grey-charcoal text-grey-blue-light relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-pattern-watercolor opacity-5 pointer-events-none"></div>
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-nude-clay via-grey-blue to-nude-sand"></div>
      
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <span className="font-script text-2xl text-nude-sand">
                  PSC
                </span>
              </div>
              <span className="text-xl font-serif text-nude-cream">
                {SITE_CONFIG.name}, PLLC
              </span>
            </div>
            <p className="text-grey-blue-light mb-6 max-w-md leading-relaxed">
              {SITE_CONFIG.tagline}. Providing compassionate therapy services to help you navigate life&apos;s 
              challenges and achieve lasting positive change. Your journey to wellness 
              starts here.
            </p>
            <div className="flex items-center gap-2 text-nude-sand mb-4">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
                />
              </svg>
              <span className="text-grey-blue-lighter">{SITE_CONFIG.address}</span>
            </div>
            <div className="flex gap-4">
              {/* Social Media Placeholder Links */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-grey-storm hover:bg-nude-clay flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/peytonwoods" 
                className="w-10 h-10 rounded-full bg-grey-storm hover:bg-nude-clay flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-nude-cream font-serif text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-grey-blue-light hover:text-nude-sand transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-nude-cream font-serif text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-grey-blue-light hover:text-nude-sand transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-grey-storm/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-grey-storm/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-nude-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-grey-blue-light">Call us</p>
                <p className="text-nude-cream font-medium">{SITE_CONFIG.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-grey-storm/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-nude-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-grey-blue-light">Email us</p>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-nude-cream font-medium hover:text-nude-sand transition-colors duration-200"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-grey-storm/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-nude-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-grey-blue-light">Office hours</p>
                <p className="text-nude-cream font-medium">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-text-charcoal py-6 relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-grey-blue-light">
            <p>
              &copy; {currentYear} {SITE_CONFIG.name}, PLLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-nude-sand transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-nude-sand transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-nude-sand transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
      </footer>
  );
}