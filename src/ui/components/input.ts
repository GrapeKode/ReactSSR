/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, createAttributesStringified } from '../utils/utils';

/**
 * Input component variants using Class Variance Authority (CVA)
 * Designed for use in NestJS backend with Handlebars templates
 */
const inputVariants = cva(
  'w-full appearance-none bg-white text-foreground placeholder:text-muted-foreground border border-gray-300 rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        subtle: 'bg-gray-100',
        ghost:
          'bg-transparent border-transparent focus-visible:border-gray-300',
      },
      size: {
        lg: 'h-10 px-4 text-sm',
        md: 'h-9 px-3 text-sm',
        sm: 'h-8 px-2.5 text-xs',
      },
      state: {
        normal: '',
        error: 'border-red-500 focus-visible:ring-red-500',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'normal',
    },
  },
);

export interface InputProps extends VariantProps<typeof inputVariants> {
  /** Additional CSS classes */
  className?: string;

  /** Standard input attributes */
  id?: string;
  name?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'url'
    | 'tel'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'file';
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;

  /** Event handler names (for Handlebars context) */
  onInput?: string;
  onChange?: string;
  onBlur?: string;
  onFocus?: string;

  /** Data/ARIA attributes */
  'data-testid'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-describedby'?: string;
  role?: string;
  [key: string]: any;
}

/**
 * Generate input HTML attributes
 */
export function getInputAttributes(
  props: InputProps,
): Record<string, string | number | boolean> {
  const {
    variant,
    size,
    state,
    className,
    onInput,
    onChange,
    onBlur,
    onFocus,
    ...attributes
  } = props;

  return {
    ...attributes,
    ...(onInput && { oninput: onInput }),
    ...(onChange && { onchange: onChange }),
    ...(onBlur && { onblur: onBlur }),
    ...(onFocus && { onfocus: onFocus }),
    ...(props.disabled && { disabled: true }),
    ...(props.readOnly && { readonly: true }),
    ...(props.required && { required: true }),
    ...(props.autoFocus && { autofocus: true }),
  };
}

function createInput(props: InputProps) {
  const { variant, size, state, className, ...rest } = props;
  const classes = cn(inputVariants({ variant, size, state }), className);
  const attributes = getInputAttributes(rest);

  // Convert attributes object to HTML string
  const attributesStringified = createAttributesStringified(attributes);

  return `<input class="${classes}" ${attributesStringified} />`;
}

export { createInput, inputVariants };

