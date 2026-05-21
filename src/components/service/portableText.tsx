import type { PortableTextComponents } from "next-sanity";

export const servicePortableText: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-primary mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-text-muted text-base leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent bg-surface pl-5 pr-4 py-5 my-8 rounded-r-lg">
        <span className="text-primary font-medium italic text-base leading-relaxed block">
          {children}
        </span>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2.5 mb-6">{children}</ul>,
    number: ({ children }) => (
      <ol className="space-y-2.5 mb-6 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-text-muted text-base leading-relaxed list-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[0.65em] shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-text-muted text-base leading-relaxed">{children}</li>
    ),
  },
};

export const overviewPortableText: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-primary mt-8 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-primary mt-6 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-text-muted text-base md:text-[17px] leading-relaxed mb-5">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2 mb-6">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-text-muted leading-relaxed list-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[0.65em] shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
};
