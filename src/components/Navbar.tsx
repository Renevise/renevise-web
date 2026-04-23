'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { NavService } from '@/types';

const staticNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
  services?: NavService[];
}

export function Navbar({ services = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation (render-phase state reset on pathname change)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setMobileServicesOpen(false);
  }

  const isServicesActive = pathname.startsWith('/services');

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 h-[72px] flex items-center',
        scrolled ? 'bg-white shadow-sm border-b border-border' : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-extrabold tracking-tighter text-primary uppercase">
            Renevise<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent',
              pathname === '/' ? 'text-accent' : 'text-primary/70'
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent',
              pathname === '/about' ? 'text-accent' : 'text-primary/70'
            )}
          >
            About
          </Link>

          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                'flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent',
                isServicesActive ? 'text-accent' : 'text-primary/70'
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  servicesOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border border-border rounded-card shadow-xl overflow-hidden"
                >
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-primary border-b border-border hover:bg-surface transition-colors"
                  >
                    All Services
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.slug.current}
                      href={`/services/${s.slug.current}`}
                      onClick={() => setServicesOpen(false)}
                      className={cn(
                        'block px-4 py-2.5 text-sm transition-colors hover:bg-surface hover:text-accent',
                        pathname === `/services/${s.slug.current}`
                          ? 'text-accent font-medium'
                          : 'text-text-muted'
                      )}
                    >
                      {s.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/case-studies"
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent',
              pathname === '/case-studies' ? 'text-accent' : 'text-primary/70'
            )}
          >
            Case Studies
          </Link>
          <Link
            href="/contact"
            className={cn(
              'text-sm font-medium transition-colors hover:text-accent',
              pathname === '/contact' ? 'text-accent' : 'text-primary/70'
            )}
          >
            Contact
          </Link>

          <Link
            href="/contact"
            className="bg-accent text-white px-5 py-2 rounded-theme text-sm font-semibold hover:bg-accent/90 transition-all flex items-center gap-2 shadow-sm"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {staticNavLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium py-2 border-b border-slate-50',
                    link.href === pathname ? 'text-accent' : 'text-primary/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Services accordion */}
              <div className="border-b border-slate-50">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={cn(
                    'w-full flex items-center justify-between text-lg font-medium py-2',
                    isServicesActive ? 'text-accent' : 'text-primary/70'
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      mobileServicesOpen && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2 flex flex-col gap-1">
                        <Link
                          href="/services"
                          className="px-3 py-2 text-sm font-semibold text-primary rounded hover:bg-surface transition-colors"
                        >
                          All Services
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.slug.current}
                            href={`/services/${s.slug.current}`}
                            className={cn(
                              'px-3 py-2 text-sm rounded transition-colors hover:bg-surface',
                              pathname === `/services/${s.slug.current}`
                                ? 'text-accent font-medium'
                                : 'text-text-muted'
                            )}
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {staticNavLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium py-2 border-b border-slate-50',
                    link.href === pathname ? 'text-accent' : 'text-primary/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/contact"
                className="bg-primary text-white px-6 py-4 rounded-xl text-center font-bold mt-4"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
