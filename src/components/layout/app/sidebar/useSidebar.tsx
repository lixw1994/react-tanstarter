import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const SIDEBAR_STORAGE_KEY = "sidebar-collapsed";
const MOBILE_BREAKPOINT = 768; // md breakpoint

interface SidebarContextValue {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

function getInitialCollapsed(defaultCollapsed: boolean): boolean {
  if (typeof window === "undefined") return defaultCollapsed;
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
  return stored !== null ? stored === "true" : defaultCollapsed;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

interface SidebarProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(() =>
    getInitialCollapsed(defaultCollapsed),
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Use useSyncExternalStore for responsive isMobile detection
  const isMobile = useSyncExternalStore(subscribeToResize, getIsMobile, () => false);

  // Track previous isMobile to detect transitions
  const prevIsMobileRef = useRef(isMobile);

  // Persist collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  // Handle resize: close mobile sidebar when transitioning to desktop
  // This is done via the resize event subscription, not in useEffect
  const closeMobileOnDesktop = useCallback(() => {
    const wasIsMobile = prevIsMobileRef.current;
    const nowIsMobile = getIsMobile();
    prevIsMobileRef.current = nowIsMobile;

    if (wasIsMobile && !nowIsMobile) {
      setIsMobileOpen(false);
    }
  }, []);

  // Subscribe to resize for closing mobile sidebar
  useEffect(() => {
    window.addEventListener("resize", closeMobileOnDesktop);
    return () => window.removeEventListener("resize", closeMobileOnDesktop);
  }, [closeMobileOnDesktop]);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const openMobile = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <SidebarContext
      value={{
        isCollapsed,
        isMobileOpen,
        isMobile,
        toggle,
        collapse,
        expand,
        openMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext>
  );
}
