import { defineComponent } from 'vue';

interface typePropFormat {
  prefix?: string,
  suffix?: string,
  decimals?: string,
  thousand?: string,
}
interface SliderProps {
  modelValue?: number | number[];
  value?: number | number[];
  id?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  direction?: 'ltr' | 'rtl';
  tooltips?: boolean;
  options?: Record<string, any>;
  merge?: number;
  format?: typePropFormat | ((v:number) => string | number);
  classes?: Record<string, string>;
  showTooltip?: 'always' | 'focus' | 'drag';
  tooltipPosition?: null | 'top' | 'bottom' | 'left' | 'right';
  lazy?: boolean;
  ariaLabelledby?: string | string[];
  aria?: Record<string, string> | Record<string, string>[];
}

declare class Slider implements ReturnType<typeof defineComponent> {
  modelValue: SliderProps['modelValue'];
  value: SliderProps['value'];
  id: SliderProps['id'];
  disabled: SliderProps['disabled'];
  min: SliderProps['min'];
  max: SliderProps['max'];
  step: SliderProps['step'];
  orientation: SliderProps['orientation'];
  direction: SliderProps['direction'];
  tooltips: SliderProps['tooltips'];
  options: SliderProps['options'];
  merge: SliderProps['merge'];
  format: SliderProps['format'];
  classes: SliderProps['classes'];
  showTooltip: SliderProps['showTooltip'];
  tooltipPosition: SliderProps['tooltipPosition'];
  lazy: SliderProps['lazy'];
  ariaLabelledby: SliderProps['ariaLabelledby'];
  aria: SliderProps['aria'];

  $props: SliderProps;

  $emit(eventName: 'start', value: any): this | void;
  $emit(eventName: 'slide', value: any): this | void;
  $emit(eventName: 'drag', value: any): this | void;
  $emit(eventName: 'update', value: any): this | void;
  $emit(eventName: 'change', value: any): this | void;
  $emit(eventName: 'set', value: any): this | void;
  $emit(eventName: 'end', value: any): this | void;
}

export default Slider;