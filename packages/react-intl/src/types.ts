/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
import * as React from 'react';
import {
  IntlMessageFormat,
  Formats,
  PrimitiveType,
  FormatXMLElementFn,
  FormatError,
} from 'intl-messageformat';
import IntlRelativeTimeFormat, {
  IntlRelativeTimeFormatOptions,
} from '@formatjs/intl-relativetimeformat';
import {MessageFormatElement} from 'intl-messageformat-parser';
import {NumberFormatOptions} from '@formatjs/intl-numberformat';
import IntlListFormat, {IntlListFormatOptions} from '@formatjs/intl-listformat';
import {DisplayNames, DisplayNamesOptions} from '@formatjs/intl-displaynames';
import {DateTimeFormatOptions} from '@formatjs/intl-datetimeformat';
import {
  MissingTranslationError,
  MessageFormatError,
  MissingDataError,
  InvalidConfigError,
  UnsupportedFormatterError,
} from './error';

export interface IntlConfig {
  locale: string;
  timeZone?: string;
  formats: CustomFormats;
  textComponent?: React.ComponentType | keyof React.ReactHTML;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  defaultLocale: string;
  defaultFormats: CustomFormats;
  wrapRichTextChunksInFragment?: boolean;
  defaultRichTextElements?: Record<string, FormatXMLElementFn<React.ReactNode>>;
  onError(
    err:
      | MissingTranslationError
      | MessageFormatError
      | MissingDataError
      | InvalidConfigError
      | UnsupportedFormatterError
      | FormatError
  ): void;
}

export interface CustomFormats extends Partial<Formats> {
  relative?: Record<string, IntlRelativeTimeFormatOptions>;
}

export interface CustomFormatConfig {
  format?: string;
}

export type FormatDateOptions = Exclude<
  DateTimeFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig;
export type FormatNumberOptions = Exclude<
  NumberFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig;
export type FormatRelativeTimeOptions = Exclude<
  IntlRelativeTimeFormatOptions,
  'localeMatcher'
> &
  CustomFormatConfig;
export type FormatPluralOptions = Exclude<
  Intl.PluralRulesOptions,
  'localeMatcher'
> &
  CustomFormatConfig;

export type FormatListOptions = Exclude<IntlListFormatOptions, 'localeMatcher'>;

export type FormatDisplayNameOptions = Exclude<
  DisplayNamesOptions,
  'localeMatcher'
>;

export interface IntlFormatters<T = React.ReactNode, R = T> {
  formatDate(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): string;
  formatTime(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): string;
  formatDateToParts(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): Intl.DateTimeFormatPart[];
  formatTimeToParts(
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string,
    opts?: FormatDateOptions
  ): Intl.DateTimeFormatPart[];
  formatRelativeTime(
    value: Parameters<IntlRelativeTimeFormat['format']>[0],
    unit?: Parameters<IntlRelativeTimeFormat['format']>[1],
    opts?: FormatRelativeTimeOptions
  ): string;
  formatNumber(
    value: Parameters<Intl.NumberFormat['format']>[0],
    opts?: FormatNumberOptions
  ): string;
  formatNumberToParts(
    value: Parameters<Intl.NumberFormat['format']>[0],
    opts?: FormatNumberOptions
  ): Intl.NumberFormatPart[];
  formatPlural(
    value: Parameters<Intl.PluralRules['select']>[0],
    opts?: FormatPluralOptions
  ): ReturnType<Intl.PluralRules['select']>;
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  ): string;
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<
      string,
      PrimitiveType | React.ReactNode | FormatXMLElementFn<T, R>
    >
  ): React.ReactNode;
  formatList(values: Array<string>, opts?: FormatListOptions): string;
  formatList(
    values: Array<string | React.ReactNode>,
    opts?: FormatListOptions
  ): React.ReactNode;
  formatDisplayName(
    value: Parameters<DisplayNames['of']>[0],
    opts?: FormatDisplayNameOptions
  ): string | undefined;
}

export interface Formatters {
  getDateTimeFormat(
    ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
  ): Intl.DateTimeFormat;
  getNumberFormat(
    ...args: ConstructorParameters<typeof Intl.NumberFormat>
  ): Intl.NumberFormat;
  getMessageFormat(
    ...args: ConstructorParameters<typeof IntlMessageFormat>
  ): IntlMessageFormat;
  getRelativeTimeFormat(
    ...args: ConstructorParameters<typeof IntlRelativeTimeFormat>
  ): IntlRelativeTimeFormat;
  getPluralRules(
    ...args: ConstructorParameters<typeof Intl.PluralRules>
  ): Intl.PluralRules;
  getListFormat(
    ...args: ConstructorParameters<typeof IntlListFormat>
  ): IntlListFormat;
  getDisplayNames(
    ...args: ConstructorParameters<typeof DisplayNames>
  ): DisplayNames;
}

export interface IntlShape extends IntlConfig, IntlFormatters {
  formatters: Formatters;
}

export interface IntlCache {
  dateTime: Record<string, Intl.DateTimeFormat>;
  number: Record<string, Intl.NumberFormat>;
  message: Record<string, IntlMessageFormat>;
  relativeTime: Record<string, IntlRelativeTimeFormat>;
  pluralRules: Record<string, Intl.PluralRules>;
  list: Record<string, IntlListFormat>;
  displayNames: Record<string, DisplayNames>;
}

export interface MessageDescriptor {
  id?: string | number;
  description?: string | object;
  defaultMessage?: string | MessageFormatElement[];
}
