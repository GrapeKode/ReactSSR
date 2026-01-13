/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, createAttributesStringified } from '../utils/utils';

/**
 * Avatar component variants using Class Variance Authority (CVA)
 */
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-16 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

/**
 * Avatar component props interface
 */
export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Name of the user (used to generate initials)
   */
  name?: string;
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

/**
 * Generate avatar HTML attributes
 * @param props Avatar props
 * @returns Object with HTML attributes
 */
function getAvatarAttributes(
  props: AvatarProps,
): Record<string, string | boolean> {
  const { variant, size, className, name, src, alt, ...attributes } = props;
  return attributes;
}

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Avatar component factory for Handlebars templates
 */
function createAvatar(props: AvatarProps): string {
  const { variant, size, className, name, src, alt, ...rest } = props;
  const classes = cn(avatarVariants({ variant, size }), className);
  const attributes = getAvatarAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const initials = name ? getInitials(name) : '';
  const displayAlt = alt || name || 'Avatar';

  if (src) {
    return `<img data-slot="avatar" class="${classes}" src="${src}" alt="${displayAlt}" ${attributesStringified} />`;
  }

  return `<div data-slot="avatar" class="${classes} flex items-center justify-center font-semibold" ${attributesStringified}>${initials}</div>`;
}

export { avatarVariants, createAvatar };

