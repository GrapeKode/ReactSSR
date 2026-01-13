/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, createAttributesStringified } from '../utils/utils';

/**
 * KPI component variants using Class Variance Authority (CVA)
 */
const kpiVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        gradient: 'bg-gradient-to-br from-white to-gray-50 border-gray-200',
        outlined: 'border-2 border-gray-300',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * KPI component props interface
 */
export interface KPIProps extends VariantProps<typeof kpiVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * KPI title/label
   */
  title?: string;
  /**
   * Main KPI value
   */
  value?: string | number;
  /**
   * Description or subtitle text
   */
  description?: string;
  /**
   * SVG path for the icon
   */
  iconPath?: string;
  /**
   * Icon color variant
   */
  iconColor?: 'blue' | 'purple' | 'cyan' | 'green' | 'yellow' | 'red' | 'gray';
  /**
   * Trend change value (e.g., "+12%", "+148")
   */
  change?: string;
  /**
   * Trend direction
   */
  trend?: 'up' | 'down' | 'neutral';
  /**
   * Change description (e.g., "from last month")
   */
  changeDescription?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

/**
 * Generate KPI HTML attributes
 * @param props KPI props
 * @returns Object with HTML attributes
 */
function getKPIAttributes(props: KPIProps): Record<string, string | boolean> {
  const {
    variant,
    size,
    className,
    title,
    value,
    description,
    iconPath,
    iconColor,
    change,
    trend,
    changeDescription,
    ...attributes
  } = props;
  return attributes;
}

/**
 * Get icon background color classes
 */
function getIconColorClasses(color?: string): string {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
  };
  return colorMap[color || 'blue'] || colorMap.blue;
}

/**
 * Get trend color classes
 */
function getTrendColorClasses(trend?: string): string {
  const trendMap: Record<string, string> = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };
  return trendMap[trend || 'neutral'] || trendMap.neutral;
}

/**
 * Get trend icon
 */
function getTrendIcon(trend?: string): string {
  if (trend === 'up') {
    return `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>`;
  }
  if (trend === 'down') {
    return `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>`;
  }
  return '';
}

/**
 * KPI component factory for Handlebars templates
 */
function createKPI(props: KPIProps): string {
  const { variant, size, className, ...rest } = props;
  const classes = cn(kpiVariants({ variant, size }), className);
  const attributes = getKPIAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const iconClasses = getIconColorClasses(props.iconColor);
  const trendClasses = getTrendColorClasses(props.trend);
  const trendIcon = getTrendIcon(props.trend);

  const iconSvg = props.iconPath
    ? `<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClasses}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${props.iconPath}" />
        </svg>
      </div>`
    : '';

  const titleHtml = props.title
    ? `<p class="text-sm font-medium text-muted-foreground mb-1">${props.title}</p>`
    : '';

  const valueHtml =
    props.value !== undefined
      ? `<h3 class="text-2xl font-bold text-foreground">${props.value}</h3>`
      : '';

  const descriptionHtml = props.description
    ? `<p class="text-xs text-muted-foreground mt-1">${props.description}</p>`
    : '';

  const changeHtml =
    props.change && props.trend
      ? `<div class="mt-2 flex items-center gap-1 ${trendClasses}">
          ${trendIcon}
          <span class="text-sm font-medium">${props.change}</span>
          ${props.changeDescription ? `<span class="text-xs text-muted-foreground ml-1">${props.changeDescription}</span>` : ''}
        </div>`
      : props.change
        ? `<div class="mt-2">
            <span class="text-sm font-medium text-foreground">${props.change}</span>
            ${props.changeDescription ? `<span class="text-xs text-muted-foreground ml-1">${props.changeDescription}</span>` : ''}
          </div>`
        : '';

  return `
    <div class="${classes}" ${attributesStringified}>
      <div class="flex items-start justify-between">
        <div class="flex-1">
          ${titleHtml}
          <div class="flex items-baseline gap-2">
            ${valueHtml}
          </div>
          ${descriptionHtml}
          ${changeHtml}
        </div>
        ${iconSvg}
      </div>
    </div>
  `.trim();
}

export { createKPI, kpiVariants };

