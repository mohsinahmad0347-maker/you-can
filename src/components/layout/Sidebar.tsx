import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Dumbbell,
  Flame,
  Calendar,
  Target,
  TrendingUp,
  Timer,
  Layers,
  Bookmark,
  Sparkles,
  Bot,
  HeartHandshake,
  User,
  Bell,
  Settings,
  ShieldCheck,
  Activity,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface SidebarProps {
  /** Mobile/tablet: off-canvas drawer visibility */
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  /** Desktop: icon-rail mode (labels hidden, icons stay visible) */
  isCollapsed?: boolean;
  /** Desktop: toggles the icon-rail mode */
  onToggleCollapse?: () => void;
  /** True while the app renders the desktop two-column layout (>= 1024px) */
  isDesktop: boolean;
}

/** Icon sizes: medium 20px icons while collapsed, 18px rows while expanded. */
const EXPANDED_ICON = 'w-[18px] h-[18px]';
const COLLAPSED_ICON = 'w-[20px] h-[20px]';

/** Muscle groups offered by the exercise library — first entry clears the filter. */
const EXERCISE_CATEGORIES = [
  'All Exercises',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Glutes',
  'Core',
  'Cardio',
  'Full Body',
  'Mobility',
  'Stretching'
];

const NAV_ITEM_BASE =
  'group relative flex items-center rounded-2xl font-semibold outline-none transition-all duration-200 ' +
  'focus-visible:ring-2 focus-visible:ring-[#ff5722]/70';

// ─── Primary navigation item (whole 56px square is clickable when collapsed) ──
interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  active?: boolean;
  activeTone?: 'accent' | 'green';
  onClick: () => void;
  onShowTooltip: (label: string, element: HTMLElement) => void;
  onHideTooltip: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon,
  collapsed,
  active = false,
  activeTone = 'accent',
  onClick,
  onShowTooltip,
  onHideTooltip,
}) => {
  /**
   * Active rows use a translucent accent wash — never a solid accent fill —
   * so the icon (painted in the accent colour) can never blend into the
   * background and become invisible. The left indicator rail is rendered in
   * both expanded and icon-rail modes via `indicatorColor` below.
   */
  const activeClasses =
    activeTone === 'green'
      ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/50 font-bold shadow-sm shadow-[#00ff66]/10'
      : 'bg-[#ff5722]/20 text-[#ff8a65] border border-[#ff5722]/50 font-bold shadow-sm shadow-[#ff5722]/10';
  const indicatorColor = activeTone === 'green' ? 'bg-[#00ff66]' : 'bg-[#ff5722]';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={event => onShowTooltip(label, event.currentTarget)}
      onFocus={event => onShowTooltip(label, event.currentTarget)}
      onMouseLeave={onHideTooltip}
      onBlur={onHideTooltip}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={[
        NAV_ITEM_BASE,
        collapsed ? 'mx-auto h-14 w-14 justify-center' : 'w-full gap-3 px-3 py-3 lg:py-2.5 text-[15px] lg:text-sm',
        active
          ? activeClasses
          : 'text-neutral-300 hover:bg-white/[0.07] hover:text-white border border-transparent',
      ].join(' ')}
    >
      {/* Active accent indicator rail — rendered in both expanded and icon-rail modes
          so the selected row is unmistakable, never just a colour wash. In the
          collapsed rail it sits inside the button because `overflow-x-hidden` on
          <nav> clips anything that overflows its padding box. */}
      {active && (
        <span
          aria-hidden="true"
          className={`absolute top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full ${indicatorColor} ${
            collapsed ? 'left-0' : '-left-2'
          }`}
        />
      )}
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
};

// ─── Secondary navigation item (muscle groups, training modes, …) ─────────────
interface SubNavButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  dotColor?: string;
  trailingChevron?: boolean;
}

const SubNavButton: React.FC<SubNavButtonProps> = ({ label, onClick, icon, dotColor, trailingChevron }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 lg:py-1.5 rounded-lg text-[13px] lg:text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/[0.07] active:bg-white/10 transition-all text-left"
  >
    <span className="flex items-center gap-2.5 min-w-0">
      {dotColor && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />}
      {icon}
      <span className="truncate">{label}</span>
    </span>
    {trailingChevron && <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />}
  </button>
);

// ─── Section label (becomes a small divider while collapsed) ──────────────────
const SectionLabel: React.FC<{ children: React.ReactNode; collapsed: boolean }> = ({ children, collapsed }) =>
  collapsed
    ? <div aria-hidden="true" className="mx-auto my-1 h-px w-8 bg-white/10" />
    : (
      <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
        {children}
      </p>
    );

/**
 * Long link lists (the exercise library alone is twelve rows) turn the phone drawer into
 * an endless scroll, so on the mobile drawer they become tap-to-expand groups. The desktop
 * column keeps rendering the flat, always-visible list it has always had.
 */
const CollapsibleGroup: React.FC<{
  title: string;
  /** Collapsible behaviour is mobile-only — desktop keeps the flat list. */
  collapsible: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, collapsible, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div>
        <SectionLabel collapsed={false}>{title}</SectionLabel>
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-3.5 py-3 text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-white active:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-1.5 pb-2">{children}</div>}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isCollapsed = false,
  onToggleCollapse,
  isDesktop,
}) => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategoryFilter,
    setIsNotificationOpen,
    isAdminLoggedIn
  } = useFitness();

  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(null);
  /**
   * The icon rail is a desktop-only idea: on a phone the drawer always shows full labels,
   * even if the desktop column was left collapsed before the viewport shrank.
   */
  const collapsed = isCollapsed && isDesktop;
  const drawerMode = !isDesktop;

  const handleNav = (view: string, categoryFilter?: string) => {
    if (categoryFilter !== undefined) {
      setSelectedCategoryFilter(categoryFilter);
      setCurrentView('exercises');
    } else {
      setCurrentView(view);
    }
    // Auto-close the drawer on smaller screens (desktop keeps its permanent column)
    if (!isDesktop) {
      setIsOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isViewActive = (view: string) => currentView === view;

  // Tooltips replace the hidden labels while the sidebar is collapsed (viewport coords)
  const showTooltip = (label: string, element: HTMLElement) => {
    if (!collapsed) return;
    const itemRect = element.getBoundingClientRect();
    setTooltip({ label, top: itemRect.top + itemRect.height / 2 });
  };

  const hideTooltip = () => setTooltip(null);

  /**
   * Icon factory. When the row is selected the icon is painted in the *bright*
   * accent colour (light orange / neon green) rather than the deeper accent used
   * for fills, which guarantees it stays readable on the translucent active wash.
   */
  const navIcon = (
    Icon: typeof Dumbbell,
    active: boolean,
    accent = '',
    activeTone: 'accent' | 'green' = 'accent'
  ) => (
    <div className={`relative ${collapsed ? '' : 'p-2 rounded-xl'} transition-all`}>
      <Icon
        className={[
          collapsed ? COLLAPSED_ICON : EXPANDED_ICON,
          'shrink-0 transition-transform duration-200 group-hover:scale-110',
          active
            ? activeTone === 'green'
              ? 'text-[#00ff66] drop-shadow-[0_0_6px_rgba(0,255,102,0.45)]'
              : 'text-[#ff8a65] drop-shadow-[0_0_6px_rgba(255,87,34,0.45)]'
            : accent,
        ].join(' ')}
      />
    </div>
  );

  const navItem = (
    Icon: typeof Dumbbell,
    label: string,
    view: string,
    accent = '',
    activeTone: 'accent' | 'green' = 'accent'
  ) => (
    <NavButton
      label={label}
      icon={navIcon(Icon, isViewActive(view), accent, activeTone)}
      collapsed={collapsed}
      active={isViewActive(view)}
      activeTone={activeTone}
      onClick={() => handleNav(view)}
      onShowTooltip={showTooltip}
      onHideTooltip={hideTooltip}
    />
  );

  return (
    <>
      {/* Mobile backdrop. Deliberately NOT blurred: a full-screen backdrop-filter repaints
          the whole viewport on every frame and is what made the drawer feel janky on
          phones. Tapping it dismisses the drawer. */}
      {drawerMode && isOpen && (
        <div
          data-drawer-backdrop=""
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-x-0 top-16 bottom-0 z-30 touch-none bg-black/70 lg:hidden"
        />
      )}

      {/* Sidebar: sticky 260px column on desktop · off-canvas drawer on mobile.
          On phones the panel is pinned under the 4rem navbar so the navbar toggle (which
          flips to an X) stays visible and can always close the drawer. */}
      <aside
        id="app-sidebar"
        aria-label="YOU CAN navigation"
        /* A closed drawer keeps its links out of the tab order (and off screen readers). */
        inert={!isDesktop && !isOpen}
        className={[
          'select-none flex flex-col shrink-0 bg-[#232326] border-r border-white/10',
          'fixed left-0 top-16 z-40 h-[calc(100dvh-4rem)] w-[84vw] max-w-[300px] rounded-r-3xl shadow-2xl shadow-black/70',
          'will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100vh-4rem)] lg:max-w-none lg:translate-x-0 lg:rounded-none lg:shadow-none lg:transition-[transform,width]',
          collapsed ? 'lg:w-20' : 'lg:w-[260px]',
        ].join(' ')}
      >
        {/* Logo + drawer controls */}
        <div
          className={`shrink-0 border-b border-white/10 flex gap-2 ${
            collapsed ? 'flex-col items-center px-2 py-3' : 'items-center justify-between px-3.5 py-3'
          }`}
        >
          {/* YOU CAN logo — same mark as the navbar, always visible (icon only when collapsed) */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            title="YOU CAN — Home"
            aria-label="YOU CAN — Home"
            className="flex items-center gap-2.5 group cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff5722] to-[#ff8a65] flex items-center justify-center shadow-lg shadow-[#ff5722]/25 group-hover:scale-105 transition-all shrink-0">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col items-start">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  YOU <span className="text-[#ff5722]">CAN</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#00ff66] uppercase leading-tight mt-0.5">
                  TRAIN STRONG
                </span>
              </div>
            )}
          </button>
          {/* Close / collapse controls */}
          <div className="flex items-center gap-1">
            {/* Labelled close button for the phone drawer — the bare icon was easy to miss */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold text-neutral-200 bg-white/[0.07] border border-white/10 hover:bg-white/[0.12] hover:text-white active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            >
              <X className="w-4 h-4" />
              Close
            </button>
            {/* Collapse / expand rail (desktop only) */}
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
              aria-expanded={!collapsed}
              aria-controls="app-sidebar"
              title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
              className="hidden lg:flex p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.07] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {/* Scrollable navigation: labels hide when collapsed, icons always stay */}
        <nav
          aria-label="Main navigation"
          className={`nav-scroll overscroll-contain flex-1 overflow-y-auto overflow-x-hidden ${
            collapsed ? 'px-2 py-4 space-y-3' : 'px-3 py-4 space-y-4'
          }`}
        >
          {/* 1. MAIN */}
          <div className={collapsed ? 'space-y-3' : 'space-y-1'}>
            <SectionLabel collapsed={collapsed}>Main</SectionLabel>
            {navItem(LayoutDashboard, 'Dashboard', 'dashboard')}
            {navItem(Home, 'Home', 'home')}
            <NavButton
              label="Exercises"
              icon={navIcon(Dumbbell, isViewActive('exercises'))}
              collapsed={collapsed}
              active={isViewActive('exercises')}
              onClick={() => handleNav('exercises', '')}
              onShowTooltip={showTooltip}
              onHideTooltip={hideTooltip}
            />
            {navItem(Sparkles, 'Workout Generator', 'generator', 'text-amber-400')}
            {navItem(Flame, 'Workout Plans', 'workouts')}
            {navItem(TrendingUp, 'Progress & PRs', 'progress')}
            {navItem(Target, 'Goals', 'goals')}
            {navItem(Calendar, 'Calendar', 'calendar')}
          </div>
          {/* 2. EXERCISE LIBRARY — expanded sidebar only (keeps the icon rail clean).
              On the phone drawer the twelve muscle categories collapse into one row. */}
          {!collapsed && (
            <CollapsibleGroup title="Exercise Library" collapsible={drawerMode} defaultOpen={false}>
              <div className="space-y-0.5">
                <SubNavButton
                  label="All Exercises"
                  trailingChevron
                  onClick={() => handleNav('exercises', '')}
                />
                {EXERCISE_CATEGORIES.filter(category => category !== 'All Exercises').map(category => (
                  <SubNavButton
                    key={category}
                    label={category}
                    trailingChevron
                    onClick={() => handleNav('exercises', category)}
                  />
                ))}
              </div>
            </CollapsibleGroup>
          )}

          {/* 3. TRAINING MODES */}
          {!collapsed && (
            <CollapsibleGroup title="Training Modes" collapsible={drawerMode} defaultOpen={false}>
              <div className="space-y-0.5">
                <SubNavButton label="Gym Workouts" dotColor="#ff5722" onClick={() => handleNav('workouts', 'gym')} />
                <SubNavButton label="Home Workouts" dotColor="#00ff66" onClick={() => handleNav('workouts', 'home')} />
                <SubNavButton
                  label="Warm-up Library"
                  icon={<Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  onClick={() => handleNav('warmup')}
                />
                <SubNavButton
                  label="Recovery & Mobility"
                  icon={<HeartHandshake className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  onClick={() => handleNav('recovery')}
                />
              </div>
            </CollapsibleGroup>
          )}
          {/* 4. TOOLS & ASSISTANT */}
          <div className={collapsed ? 'space-y-3' : 'space-y-1'}>
            <SectionLabel collapsed={collapsed}>Tools &amp; Assistant</SectionLabel>
            {navItem(Bot, 'YOU CAN Coach (AI)', 'coach', 'text-[#00ff66]', 'green')}
            {navItem(Timer, 'Workout Timer', 'tools')}
            {navItem(Layers, 'Exercise Comparison', 'comparison')}
            {navItem(Bookmark, 'Favorites', 'favorites', 'text-amber-400')}
          </div>

          {/* 5. ACCOUNT */}
          <div className={collapsed ? 'space-y-3' : 'space-y-1'}>
            <SectionLabel collapsed={collapsed}>Account</SectionLabel>
            {navItem(User, 'Profile', 'profile')}
            <NavButton
              label="Notifications"
              icon={navIcon(Bell, false)}
              collapsed={collapsed}
              onClick={() => setIsNotificationOpen(true)}
              onShowTooltip={showTooltip}
              onHideTooltip={hideTooltip}
            />
            {navItem(Settings, 'Settings', 'settings')}
          </div>
        </nav>
        {/* Bottom quick switch to the admin platform (padded for the phone home indicator) */}
        <div className="shrink-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10 bg-black/20">
          <button
            type="button"
            onClick={() => handleNav(isAdminLoggedIn ? 'admin' : 'admin-login')}
            onMouseEnter={event => showTooltip('YOU CAN ADMIN', event.currentTarget)}
            onFocus={event => showTooltip('YOU CAN ADMIN', event.currentTarget)}
            onMouseLeave={hideTooltip}
            onBlur={hideTooltip}
            aria-label="YOU CAN ADMIN — open the admin platform"
            className={[
              'rounded-2xl bg-black/40 hover:bg-black/60 text-xs font-bold text-[#ff5722] border border-[#ff5722]/30 hover:border-[#ff5722]/60 transition-all',
              collapsed ? 'mx-auto h-14 w-14 flex items-center justify-center' : 'w-full flex items-center justify-between px-3 py-2.5',
            ].join(' ')}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className={collapsed ? 'w-[26px] h-[26px]' : 'w-4 h-4 shrink-0'} />
              {!collapsed && <span>YOU CAN ADMIN</span>}
            </div>
            {!collapsed && (
              <span className="px-1.5 py-0.5 rounded bg-[#ff5722]/10 text-[10px] font-black">
                PRO
              </span>
            )}
          </button>
        </div>
      </aside>
      {/* Tooltip for the collapsed icon rail (desktop only) */}
      {collapsed && tooltip && (
        <div className="sidebar-tooltip" role="tooltip" style={{ top: tooltip.top }}>
          {tooltip.label}
        </div>
      )}
    </>
  );
};
