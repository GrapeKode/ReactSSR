/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, createAttributesStringified } from '../utils/utils';

const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        gradient:
          'bg-gradient-to-br from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 border-gray-200',
        outlined: 'border-2 border-gray-300',
      },
      padding: {
        none: '',
        sm: 'py-4',
        md: 'py-6',
        lg: 'py-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Card content (for block helpers)
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

/**
 * Generate card HTML attributes
 * @param props Card props
 * @returns Object with HTML attributes
 */
function getCardAttributes(props: CardProps): Record<string, string | boolean> {
  const { variant, padding, className, children, ...attributes } = props;
  return attributes;
}

function createCard(props: CardProps): string {
  const { variant, padding, className, children, ...rest } = props;
  const classes = cn(cardVariants({ variant, padding }), className);
  const attributes = getCardAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardHeader component
export interface CardHeaderProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Header content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardHeaderAttributes(
  props: CardHeaderProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardHeader(props: CardHeaderProps): string {
  const { className, children, ...rest } = props;
  const classes = cn(
    '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
    className,
  );
  const attributes = getCardHeaderAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-header" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardTitle component
export interface CardTitleProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Title content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardTitleAttributes(
  props: CardTitleProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardTitle(props: CardTitleProps): string {
  const { className, children, ...rest } = props;
  const classes = cn('leading-none font-semibold', className);
  const attributes = getCardTitleAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-title" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardDescription component
export interface CardDescriptionProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Description content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardDescriptionAttributes(
  props: CardDescriptionProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardDescription(props: CardDescriptionProps): string {
  const { className, children, ...rest } = props;
  const classes = cn('text-muted-foreground text-sm', className);
  const attributes = getCardDescriptionAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-description" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardAction component
export interface CardActionProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Action content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardActionAttributes(
  props: CardActionProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardAction(props: CardActionProps): string {
  const { className, children, ...rest } = props;
  const classes = cn(
    'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
    className,
  );
  const attributes = getCardActionAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-action" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardContent component
export interface CardContentProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardContentAttributes(
  props: CardContentProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardContent(props: CardContentProps): string {
  const { className, children, ...rest } = props;
  const classes = cn('px-6', className);
  const attributes = getCardContentAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-content" class="${classes}" ${attributesStringified}>${content}</div>`;
}

// CardFooter component
export interface CardFooterProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Footer content
   */
  children?: string;
  /**
   * Additional attributes
   */
  [key: string]: any;
}

function getCardFooterAttributes(
  props: CardFooterProps,
): Record<string, string | boolean> {
  const { className, children, ...attributes } = props;
  return attributes;
}

function createCardFooter(props: CardFooterProps): string {
  const { className, children, ...rest } = props;
  const classes = cn('flex items-center px-6 [.border-t]:pt-6', className);
  const attributes = getCardFooterAttributes(rest);
  const attributesStringified = createAttributesStringified(attributes);

  const content = children ?? '';

  return `<div data-slot="card-footer" class="${classes}" ${attributesStringified}>${content}</div>`;
}

export {
  cardVariants,
  createCard,
  createCardAction,
  createCardContent,
  createCardDescription,
  createCardFooter,
  createCardHeader,
  createCardTitle,
};

