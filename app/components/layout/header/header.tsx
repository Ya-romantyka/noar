'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransitionRouter } from 'next-view-transitions';

import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Container from '../container/container';
import StaggerLink from '../../ui/stagger-link/stagger-link';

import Logo from '@/app/assets/icons/logo.svg';
import MenuIcon from '@/app/assets/icons/menu-icon.svg';
import CloseIcon from '@/app/assets/icons/close-icon.svg';
import ButtonIcon from '@/app/assets/icons/button-icon.svg';
import Magnetic from '../../ui/magnetic/magnetic';
import { usePathname } from 'next/navigation';
import { useCursorStyle } from '@/app/hooks/useCursorStyle';

const menuItems = [
  { title: 'About', href: '/about' },
  { title: 'Projects', href: '/projects' },
  { title: 'Services & Approach', href: '/services' },
  { title: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [isWhiteHeader, setIsWhiteHeader] = useState(false);
  const [isTransparentHeader, setIsTransparentHeader] = useState(false);

  const pathname = usePathname();
  const lastScroll = useRef(0);
  const router = useTransitionRouter();

  const logoRef = useRef<HTMLAnchorElement>(null);
  const connectRef = useRef<HTMLAnchorElement>(null);
  const socialRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLHeadElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);

  useCursorStyle({ ref: connectRef, style: 'button' });
  useCursorStyle({ ref: menuRef, style: 'button' });
  useCursorStyle({ ref: logoRef, style: 'button' });
  useCursorStyle({ ref: socialRef, style: 'button' });
  useCursorStyle({ ref: headerRef, style: 'big' });
  useCursorStyle({ ref: menuListRef, style: 'big' });

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        if (isMenuOpen) {
          setHideHeader(false);
          lastScroll.current = window.scrollY;
          ticking = false;
          return;
        }

        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll.current && currentScroll > 50) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }

        lastScroll.current = currentScroll;
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const isLineInside = (el: Element, lineY: number) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      return rect.top <= lineY && rect.bottom >= lineY;
    };

    const checkHeaderZone = () => {
      const viewportHeight = window.innerHeight;
      const line = viewportHeight * 0.1;

      const transparentSections = Array.from(
        document.querySelectorAll('[data-header-transparent]'),
      );
      const whiteSections = Array.from(
        document.querySelectorAll('[data-header-white]'),
      );

      const transparentActive = transparentSections.some((sec) =>
        isLineInside(sec, line),
      );
      const whiteActive =
        !transparentActive &&
        whiteSections.some((sec) => isLineInside(sec, line));

      setIsTransparentHeader(transparentActive);
      setIsWhiteHeader(whiteActive);
    };

    window.addEventListener('scroll', checkHeaderZone);
    window.addEventListener('resize', checkHeaderZone);
    requestAnimationFrame(checkHeaderZone);

    return () => {
      window.removeEventListener('scroll', checkHeaderZone);
      window.removeEventListener('resize', checkHeaderZone);
    };
  }, [pathname]);

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0.2, transform: 'translateY(-35%)' },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-old(root)',
      },
    );

    document.documentElement.animate(
      [
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' },
      ],
      {
        duration: 1500,
        easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (next) setHideHeader(false);
      return next;
    });
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (menuRef.current && target && menuRef.current.contains(target)) return;
      if (menuListRef.current && target && menuListRef.current.contains(target))
        return;

      setIsMenuOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          styles.header,
          isWhiteHeader && styles.white,
          isTransparentHeader && styles.transparent,
          hideHeader && styles.hide,
        )}
        ref={headerRef}
      >
        <Container className={styles.container}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              router.push('/', { onTransitionReady: slideInOut });
            }}
            href="/"
            className={styles.logo}
            ref={logoRef}
          >
            <Logo />
          </Link>

          <ul className={styles.socials} ref={socialRef}>
            <li>
              <StaggerLink href="https://www.instagram.com/">
                Instagram
              </StaggerLink>
            </li>
            <li>
              <StaggerLink href="https://www.behance.net/">Behance</StaggerLink>
            </li>
            <li>
              <StaggerLink href="https://www.dribble.com/">Dribble</StaggerLink>
            </li>
            <li>
              <StaggerLink href="https://www.linkedin.com/">
                LinkedIn
              </StaggerLink>
            </li>
          </ul>

          <div className={styles.group}>
            <Magnetic strength={40}>
              <Link
                href="/contact"
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/contact', { onTransitionReady: slideInOut });
                }}
                ref={connectRef}
              >
                <ButtonIcon />
                <span>Contact us</span>
              </Link>
            </Magnetic>

            <Magnetic strength={40}>
              <button
                className={styles.menuButton}
                onClick={toggleMenu}
                ref={menuRef}
              >
                <span>{isMenuOpen ? 'close' : 'menu'}</span>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </Magnetic>
          </div>
        </Container>
      </header>

      <ul
        className={clsx(
          styles.menu,
          isWhiteHeader && styles.white,
          isTransparentHeader && styles.transparent,
          { [styles.open]: isMenuOpen },
        )}
        ref={menuListRef}
      >
        {menuItems.map((item) => (
          <li key={item.href}>
            <StaggerLink
              className={styles.menuItem}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                router.push(item.href, { onTransitionReady: slideInOut });
              }}
            >
              {item.title}
            </StaggerLink>
          </li>
        ))}
      </ul>
    </>
  );
}
