'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Chat from '@/components/Chat';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extralight tracking-tight">NIGHT SCHOOL</h1>
            <div className="flex items-center gap-10">
              <div className="hidden md:flex gap-10 text-sm font-light tracking-wide">
                <a href="#about" className="hover:text-white/60 transition-colors">ABOUT</a>
                <a href="#principles" className="hover:text-white/60 transition-colors">PRINCIPLES</a>
                <a href="#pioneers" className="hover:text-white/60 transition-colors">PIONEERS</a>
                <a href="#today" className="hover:text-white/60 transition-colors">TODAY</a>
              </div>
              {user ? (
                <button
                  onClick={signOut}
                  className="text-sm font-light tracking-wide hover:text-white/60 transition-colors cursor-pointer relative z-50"
                >
                  SIGN OUT
                </button>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="text-sm font-light tracking-wide hover:text-white/60 transition-colors cursor-pointer relative z-50"
                >
                  SIGN IN
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2000&auto=format&fit=crop"
            alt="Minimalist architecture"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-6xl mx-auto space-y-8 relative z-20">
          <h2 className="text-[15vw] md:text-[12vw] lg:text-[10rem] font-extralight tracking-[-0.04em] leading-[0.9] mb-6">
            LESS<br/>IS<br/>MORE
          </h2>
          <div className="h-px w-24 bg-white/40 mx-auto"></div>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/70 max-w-2xl mx-auto">
            The resurgence of minimalist design in contemporary culture
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <a href="#about" className="block animate-bounce">
            <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="flex items-center justify-center px-6 md:px-12 py-28 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20">
            <span className="text-sm tracking-[0.3em] text-white/40 font-light">01 / ABOUT</span>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] mb-14">
            The Return of Minimalism
          </h3>
          <div className="max-w-4xl space-y-6 text-lg md:text-xl font-light leading-relaxed text-white/70">
            <p>
              After years of maximalist excess, minimalist design is experiencing a profound renaissance.
              This isn&apos;t nostalgia—it&apos;s evolution.
            </p>
            <p>
              Contemporary minimalism embraces its foundational principles while addressing the
              complexities of our modern world.
            </p>
            <p>
              From MoMA&apos;s recently reimagined Soho store to cutting-edge digital experiences,
              the aesthetic of restraint speaks louder than ever in our cluttered cultural landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 border-t border-white/10 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-24">
            <span className="text-sm tracking-[0.3em] text-white/40 font-light">02 / PRINCIPLES</span>
          </div>
          <div className="space-y-24">
            <div>
              <div className="text-8xl md:text-9xl font-thin text-white/10 mb-4">01</div>
              <h4 className="text-4xl md:text-5xl font-light mb-6">Simplicity</h4>
              <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
                Stripping away the unnecessary to reveal essential form. Every element serves a purpose,
                every space breathes with intention.
              </p>
            </div>
            <div>
              <div className="text-8xl md:text-9xl font-thin text-white/10 mb-4">02</div>
              <h4 className="text-4xl md:text-5xl font-light mb-6">Functionality</h4>
              <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
                Form follows function, but function itself becomes beautiful. The marriage of utility
                and aesthetics creates objects that transcend mere use.
              </p>
            </div>
            <div>
              <div className="text-8xl md:text-9xl font-thin text-white/10 mb-4">03</div>
              <h4 className="text-4xl md:text-5xl font-light mb-6">Clarity</h4>
              <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
                Precision in execution, honesty in materials. What you see is what you see—
                no illusions, no pretense, only truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pioneers */}
      <section id="pioneers" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-24">
            <span className="text-sm tracking-[0.3em] text-white/40 font-light">03 / PIONEERS</span>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-32">
            The Movement
          </h3>

          <div className="space-y-32">
            {/* Donald Judd */}
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              <div>
                <h4 className="text-3xl md:text-4xl font-light mb-2">Donald Judd</h4>
                <p className="text-xs tracking-[0.2em] text-white/40">THEORIST / SCULPTOR</p>
              </div>
              <div className="space-y-4 text-lg font-light text-white/70 leading-relaxed">
                <p>
                  The leading exponent of minimalism, Judd&apos;s &ldquo;Specific Objects&rdquo; (1964) revolutionized
                  how we understand art. His work sought autonomy and clarity for the constructed object,
                  achieving a rigorously democratic presentation without compositional hierarchy.
                </p>
                <p>
                  His geometric forms in industrial materials challenged the very notion of what art
                  could be—not representations, but presences.
                </p>
              </div>
            </div>

            {/* Dan Flavin */}
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              <div>
                <h4 className="text-3xl md:text-4xl font-light mb-2">Dan Flavin</h4>
                <p className="text-xs tracking-[0.2em] text-white/40">LIGHT ARTIST</p>
              </div>
              <div className="space-y-4 text-lg font-light text-white/70 leading-relaxed">
                <p>
                  Pioneering the use of fluorescent light as an artistic medium, Flavin transformed
                  commercial materials into transcendent experiences. His light installations sculpted
                  space itself into zones of color and luminosity.
                </p>
                <p>
                  Art became not something to view, but something to inhabit—a physical presence
                  rather than mere representation.
                </p>
              </div>
            </div>

            {/* Agnes Martin */}
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              <div>
                <h4 className="text-3xl md:text-4xl font-light mb-2">Agnes Martin</h4>
                <p className="text-xs tracking-[0.2em] text-white/40">PAINTER</p>
              </div>
              <div className="space-y-4 text-lg font-light text-white/70 leading-relaxed">
                <p>
                  Martin&apos;s ethereal grids and barebones geometric compositions created meditative
                  spaces of profound quietude. Her minimal canvases weren&apos;t about reduction—they
                  were about revelation.
                </p>
                <p>
                  Through subtle variations and hand-drawn lines, she proved that simplicity could
                  contain infinite depth and emotional resonance.
                </p>
              </div>
            </div>

            {/* Sol LeWitt */}
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              <div>
                <h4 className="text-3xl md:text-4xl font-light mb-2">Sol LeWitt</h4>
                <p className="text-xs tracking-[0.2em] text-white/40">CONCEPTUAL ARTIST</p>
              </div>
              <div className="space-y-4 text-lg font-light text-white/70 leading-relaxed">
                <p>
                  Bridging minimalism and conceptual art, LeWitt&apos;s radical premise transformed
                  artistic authorship itself. &ldquo;The idea becomes a machine that makes the art,&rdquo;
                  he declared, creating over 1,000 wall drawings as written instructions executed by others.
                </p>
                <p>
                  His systematic approach proved that conception could be separated from execution—that
                  art could exist as pure thought, democratically reproducible across time and space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today */}
      <section id="today" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 border-t border-white/10 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-24">
            <span className="text-sm tracking-[0.3em] text-white/40 font-light">04 / TODAY</span>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-20">
            Why Now?
          </h3>
          <div className="space-y-8 text-lg md:text-xl font-light text-white/70 leading-relaxed">
            <p>
              In 2025, minimalism&apos;s resurgence speaks to urgent contemporary needs. As our digital
              and physical worlds grow increasingly complex, the call for clarity becomes more pronounced.
            </p>
            <p>
              MoMA&apos;s Soho store renovation exemplifies this evolution—minimalist principles applied
              not to erase history, but to honor it. The design reveals original architectural features
              while embedding them in contemporary contexts.
            </p>
            <p>
              This isn&apos;t the cold, sterile minimalism of decades past. Today&apos;s approach incorporates
              warmth through earth tones, sustainability through material consciousness, and humanity
              through considered imperfection.
            </p>
            <p>
              From Apple&apos;s product design to minimalist fashion and sustainable architecture, the
              legacy of Judd, Flavin, and Martin continues to shape how we interact with objects
              and spaces.
            </p>
          </div>
          <div className="mt-20 pt-20 border-t border-white/10">
            <blockquote className="text-3xl md:text-4xl font-light italic text-white/50 text-center">
              &ldquo;What you see is what you see.&rdquo;
            </blockquote>
            <p className="text-sm text-white/30 text-center mt-6">— Frank Stella</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 md:px-12 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h5 className="text-2xl font-light mb-4">NIGHT SCHOOL</h5>
              <p className="text-sm font-light text-white/40 max-w-sm">
                Exploring minimalist design and its enduring influence on contemporary culture.
              </p>
            </div>
            <div>
              <h6 className="text-xs tracking-[0.2em] text-white/40 mb-4">SECTIONS</h6>
              <ul className="space-y-2 text-sm font-light">
                <li><a href="#about" className="hover:text-white/60 transition-colors">About</a></li>
                <li><a href="#principles" className="hover:text-white/60 transition-colors">Principles</a></li>
                <li><a href="#pioneers" className="hover:text-white/60 transition-colors">Pioneers</a></li>
                <li><a href="#today" className="hover:text-white/60 transition-colors">Today</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xs tracking-[0.2em] text-white/40 mb-4">COMING SOON</h6>
              <ul className="space-y-2 text-sm font-light text-white/30">
                <li>Articles</li>
                <li>Archive</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© 2025 Night School. All rights reserved.</p>
            <p className="tracking-wider">LESS IS MORE</p>
          </div>
        </div>
      </footer>

      {/* Chat Component */}
      <Chat />
    </div>
  );
}
