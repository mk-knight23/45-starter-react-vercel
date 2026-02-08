import { useEffect, useState } from 'react';

/**
 * Accessibility Utilities
 *
 * Helper functions and components for improving accessibility across the application.
 */

/**
 * SkipLink - Allows keyboard users to skip navigation
 *
 * Usage: Place at the top of your app, before the main navigation
 */
export function SkipLink({ targetId = 'main-content', children = 'Skip to main content' }: {
  targetId?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:font-medium"
    >
      {children}
    </a>
  );
}

/**
 * useFocusTrap - Trap focus within a component (modals, dialogs)
 *
 * Usage: Call in modals and dialogs to keep focus contained
 */
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isActive]);
}

/**
 * useKeyboardNavigation - Handle keyboard navigation patterns
 *
 * Usage: Add keyboard shortcuts to components
 */
export function useKeyboardNavigation(
  shortcuts: Record<string, () => void>,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const action = shortcuts[key];

      if (action) {
        e.preventDefault();
        action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, isActive]);
}

/**
 * Announcer - Screen reader announcements
 *
 * Usage: Announce dynamic content changes to screen readers
 */
export function useAnnouncer() {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const AnnouncerComponent = () => (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );

  return { announce, AnnouncerComponent };
}

/**
 * VisuallyHidden - Hide content visually but keep it accessible to screen readers
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

/**
 * FocusableWrapper - Make non-interactive elements focusable when needed
 */
export function FocusableWrapper({
  children,
  onFocus,
  className = '',
}: {
  children: React.ReactNode;
  onFocus?: () => void;
  className?: string;
}) {
  return (
    <div
      tabIndex={0}
      onFocus={onFocus}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFocus?.();
        }
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * useReducedMotion - Respect user's motion preferences
 *
 * Usage: Conditionally apply animations based on user preference
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * getFocusableElements - Get all focusable elements within a container
 *
 * Usage: Find elements that can receive focus for custom navigation
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return Array.from(
    container.querySelectorAll(focusableSelectors.join(','))
  );
}

/**
 * ARIA attributes helper
 *
 * Usage: Ensure consistent ARIA attribute usage
 */
export const aria = {
  // Button attributes
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    'aria-label': label,
    'aria-pressed': pressed,
    'aria-expanded': expanded,
  }),

  // Dialog attributes
  dialog: (label: string, labelledBy?: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': label,
    'aria-labelledby': labelledBy,
  }),

  // Listbox attributes
  listbox: (label: string) => ({
    role: 'listbox',
    'aria-label': label,
  }),

  // Option attributes
  option: (selected: boolean, disabled?: boolean) => ({
    role: 'option',
    'aria-selected': selected,
    'aria-disabled': disabled,
  }),

  // Live region
  liveRegion: (polite: boolean = true) => ({
    'aria-live': polite ? 'polite' : 'assertive',
    'aria-atomic': 'true',
  }),
};
