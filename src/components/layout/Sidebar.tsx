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
        collapsed ? 'mx-auto h-14 w-14 justify-center' : 'w-full gap-3 px-3 py-2.5 text-sm',
        active
          ? activeClasses
          : 'text-neutral-300 hover:bg-white/[0.07] hover:text-white border border-transparent',
      ].join(' ')}
    >
      {/* Active accent indicator rail — rendered in both expanded and icon-rail modes
          so the selected row is unmistakable, never just a colour wash. */}
      {active && (
        <span
          aria-hidden="true"
          className={`absolute -left-2 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full ${indicatorColor}`}
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
    className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/[0.07] transition-all text-left"
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

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategoryFilter,
    setIsNotificationOpen,
    isAdminLoggedIn
  } = useFitness();

  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(null);
  const collapsed = isCollapsed;

  const handleNav = (view: string, categoryFilter?: string) => {
    if (categoryFilter !== undefined) {
      setSelectedCategoryFilter(categoryFilter);
      setCurrentView('exercises');
    } else {
      setCurrentView(view);
    }
    // Auto-close the drawer on smaller screens (desktop keeps its permanent column)
    if (!window.matchMedia('(min-width: 1024px)').matches) {
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
      {/* Mobile backdrop — tapping outside closes the drawer (never shown on desktop) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar: sticky 260px column on desktop · off-canvas drawer on mobile */}
      <aside
        id="app-sidebar"
        aria-label="YOU CAN navigation"
        className={[
          'select-none flex flex-col shrink-0 bg-[#2a2a2a] border-r border-white/10',
          'transition-[transform,width] duration-300 ease-in-out',
          'fixed top-16 left-0 bottom-0 z-50 w-[82vw] max-w-[280px] shadow-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:sticky lg:top-16 lg:bottom-auto lg:left-auto lg:z-30 lg:h-[calc(100vh-4rem)] lg:max-w-none lg:translate-x-0 lg:shadow-none',
          collapsed ? 'lg:w-20' : 'lg:w-[260px]',
        ].join(' ')}
      >
        {/* Logo + collapse controls */}
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

          <div className={`flex items-center gap-1 ${collapsed ? 'flex-col' : ''}`}>
            {/* Close drawer (mobile/tablet only) */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="lg:hidden p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.07] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722]/70"
            >
              <X className="w-4 h-4" />
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
          className={`nav-scroll flex-1 overflow-y-auto overflow-x-hidden ${collapsed ? 'px-2 py-4 space-y-3' : 'px-3 py-4 space-y-5'}`}
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
          {/* 2. EXERCISE LIBRARY — expanded sidebar only (keeps the icon rail clean) */}
          {!collapsed && (
            <div>
              <SectionLabel collapsed={collapsed}>Exercise Library</SectionLabel>
              <div className="space-y-0.5">
                {EXERCISE_CATEGORIES.map(category => (
                  <SubNavButton
                    key={category}
                    label={category}
                    trailingChevron
                    onClick={() => handleNav('exercises', category === 'All Exercises' ? '' : category)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. TRAINING MODES */}
          {!collapsed && (
            <div>
              <SectionLabel collapsed={collapsed}>Training Modes</SectionLabel>
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
            </div>
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
        {/* Bottom quick switch to the admin platform */}
        <div className="shrink-0 p-3 border-t border-white/10 bg-black/20">
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
