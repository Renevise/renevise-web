'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import type { NavService } from '@/types';

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
    handleScroll();
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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setMobileServicesOpen(false);
  }

  const isServicesActive = pathname.startsWith('/services');
  // Dark glass when on home page over the hero (top of page only).
  const onDark = pathname === '/' && !scrolled;

  const linkBase = 'text-[13px] font-medium transition-colors';
  const linkIdle = onDark
    ? 'text-white/65 hover:text-white'
    : 'text-primary/70 hover:text-accent';
  const linkActive = onDark ? 'text-white' : 'text-accent';

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        className={cn(
          'pointer-events-auto relative mx-auto max-w-7xl 2xl:max-w-[1400px]',
          'rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300',
          onDark
            ? 'border-white/[0.07] bg-[rgba(7,14,39,0.72)] ring-1 ring-inset ring-white/[0.06] shadow-[0_18px_50px_-18px_rgba(59,130,246,0.28),0_10px_30px_-12px_rgba(0,0,0,0.6)]'
            : 'border-black/[0.06] bg-white/80 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.18)]'
        )}
      >
        <div className="flex h-[52px] items-center justify-between pl-3 pr-2 sm:pl-5 sm:pr-3">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg text-sm font-extrabold shadow-sm',
                onDark
                  ? 'bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] text-white'
                  : 'bg-accent text-white'
              )}
            >
              R
            </span>
            <span
              className={cn(
                'text-base font-extrabold uppercase tracking-tighter',
                onDark ? 'text-white' : 'text-primary'
              )}
            >
              Renevise<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={cn(linkBase, pathname === '/' ? linkActive : linkIdle)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(linkBase, pathname === '/about' ? linkActive : linkIdle)}
            >
              About
            </Link>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-1',
                  linkBase,
                  isServicesActive ? linkActive : linkIdle
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
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
                    className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white shadow-xl"
                  >
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="block border-b border-border px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface"
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
                            ? 'font-medium text-accent'
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
              className={cn(linkBase, pathname === '/case-studies' ? linkActive : linkIdle)}
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className={cn(linkBase, pathname === '/contact' ? linkActive : linkIdle)}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="ml-1 flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(59,130,246,0.6)] transition-all hover:from-[#4f8ef7] hover:to-[#2f6dea] hover:shadow-[0_12px_28px_-8px_rgba(59,130,246,0.7)]"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle menu"
            className={cn('md:hidden', onDark ? 'text-white' : 'text-primary')}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav (drops out from inside the pill) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border shadow-xl md:hidden',
                onDark
                  ? 'border-white/10 bg-[#0d1234]/95 backdrop-blur-xl'
                  : 'border-black/[0.06] bg-white'
              )}
            >
              <div className="flex flex-col gap-1 p-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm font-medium',
                      pathname === link.href
                        ? onDark
                          ? 'bg-white/10 text-white'
                          : 'bg-surface text-accent'
                        : onDark
                          ? 'text-white/75 hover:bg-white/5'
                          : 'text-primary/70 hover:bg-surface'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium',
                    isServicesActive
                      ? onDark
                        ? 'bg-white/10 text-white'
                        : 'bg-surface text-accent'
                      : onDark
                        ? 'text-white/75 hover:bg-white/5'
                        : 'text-primary/70 hover:bg-surface'
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
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
                      <div className="flex flex-col gap-0.5 pb-1 pl-3">
                        <Link
                          href="/services"
                          className={cn(
                            'rounded-md px-3 py-2 text-xs font-semibold',
                            onDark ? 'text-white/90' : 'text-primary'
                          )}
                        >
                          All Services
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.slug.current}
                            href={`/services/${s.slug.current}`}
                            className={cn(
                              'rounded-md px-3 py-2 text-xs',
                              onDark
                                ? 'text-white/60 hover:text-white'
                                : 'text-text-muted hover:text-accent'
                            )}
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {[
                  { name: 'Case Studies', href: '/case-studies' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm font-medium',
                      pathname === link.href
                        ? onDark
                          ? 'bg-white/10 text-white'
                          : 'bg-surface text-accent'
                        : onDark
                          ? 'text-white/75 hover:bg-white/5'
                          : 'text-primary/70 hover:bg-surface'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="mt-1 rounded-xl bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
