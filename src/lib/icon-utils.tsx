import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIconName } from '@/types';

// Type-safe icon renderer utility
export function renderLucideIcon(iconName: LucideIconName, className?: string) {
  const iconMap: Record<LucideIconName, React.ComponentType<{ className?: string }>> = {
    Shield: LucideIcons.Shield,
    Award: LucideIcons.Award,
    CheckCircle: LucideIcons.CheckCircle,
    Heart: LucideIcons.Heart,
    Users: LucideIcons.Users,
    BookOpen: LucideIcons.BookOpen,
    Globe: LucideIcons.Globe,
    Leaf: LucideIcons.Leaf,
    Lightbulb: LucideIcons.Lightbulb,
    Target: LucideIcons.Target,
    Zap: LucideIcons.Zap,
    Star: LucideIcons.Star,
    TrendingUp: LucideIcons.TrendingUp,
    Building: LucideIcons.Building,
    Handshake: LucideIcons.Handshake,
    GraduationCap: LucideIcons.GraduationCap,
    Trophy: LucideIcons.Trophy,
    Clock: LucideIcons.Clock,
    MapPin: LucideIcons.MapPin,
    Phone: LucideIcons.Phone,
    Mail: LucideIcons.Mail,
    ExternalLink: LucideIcons.ExternalLink,
    TreePine: LucideIcons.TreePine,
    Building2: LucideIcons.Building2,
    HandHeart: LucideIcons.HandHeart,
  };

  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
}

// Legacy support - renders icon by string name with fallback
export function renderIconLegacy(iconName: string, className?: string) {
  const IconComponent = (LucideIcons as Record<string, unknown>)[iconName] as React.ComponentType<{ className?: string }> | undefined;
  return IconComponent ? <IconComponent className={className} /> : null;
}
