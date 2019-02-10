// @flow

type MomentUnit =
  | 'ms'
  | 'millisecond'
  | 'milliseconds'
  | 's'
  | 'second'
  | 'seconds'
  | 'm'
  | 'minute'
  | 'minutes'
  | 'hour'
  | 'hours'
  | 'day'
  | 'days'
  | 'w'
  | 'week'
  | 'weeks'
  | 'M'
  | 'month'
  | 'months'
  | 'y'
  | 'year'
  | 'years';

type MomentInterval = {
  unit: string,
  magnitude: number,
};

type MomentOptions = {
  y?: number | string,
  year?: number | string,
  years?: number | string,
  M?: number | string,
  month?: number | string,
  months?: number | string,
  d?: number | string,
  day?: number | string,
  days?: number | string,
  date?: number | string,
  h?: number | string,
  hour?: number | string,
  hours?: number | string,
  m?: number | string,
  minute?: number | string,
  minutes?: number | string,
  s?: number | string,
  second?: number | string,
  seconds?: number | string,
  ms?: number | string,
  millisecond?: number | string,
  milliseconds?: number | string,
};

type MomentObject = {
  years: number,
  months: number,
  date: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
};

type MomentCreationData = {
  input: string,
  format: string,
  locale: Object,
  isUTC: boolean,
  strict: boolean,
};

type MomentCalendarFormats = {
  sameDay?: string,
  nextDay?: string,
  nextWeek?: string,
  lastDay?: string,
  lastWeek?: string,
  sameElse?: string,
};

declare class MomentTz {
  (timestamp: number, timezone: string): Moment;
  zone(name: ?string): ?MomentZone;
  setDefault(zone: ?string): void;
  guess(): string;
}

declare class MomentZone {
  offset(time: number): number;
  name: string;
  abbr(time: number): string;
}

declare class MomentLocaleData {
  months(moment: Moment): string;
  monthsShort(moment: Moment): string;
  monthsParse(month: string): number;
  weekdays(moment: Moment): string;
  weekdaysShort(moment: Moment): string;
  weekdaysMin(moment: Moment): string;
  weekdaysParse(weekDay: string): number;
  longDateFormat(dateFormat: string): string;
  isPM(date: string): boolean;
  meridiem(hours: number, minutes: number, isLower: boolean): string;
  calendar(
    key: 'sameDay' | 'nextDay' | 'lastDay' | 'nextWeek' | 'prevWeek' | 'sameElse',
    moment: Moment,
  ): string;
  relativeTime(
    number: number,
    withoutSuffix: boolean,
    key: 's' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy',
    isFuture: boolean,
  ): string;
  pastFuture(diff: any, relTime: string): string;
  ordinal(number: number): string;
  preparse(str: string): any;
  postformat(str: string): any;
  week(moment: Moment): string;
  invalidDate(): string;
  firstDayOfWeek(): number;
  firstDayOfYear(): number;
}
declare class MomentDuration {
  humanize(suffix?: boolean): string;
  milliseconds(): number;
  asMilliseconds(): number;
  seconds(): number;
  asSeconds(): number;
  minutes(): number;
  asMinutes(): number;
  hours(): number;
  asHours(): number;
  days(): number;
  asDays(): number;
  weeks(): number;
  asWeeks(): number;
  months(): number;
  asMonths(): number;
  years(): number;
  asYears(): number;
  add(value: number | MomentDuration | Object, unit?: MomentUnit): this;
  subtract(value: number | MomentDuration | Object, unit?: MomentUnit): this;
  as(unit: MomentUnit): number;
  get(unit: MomentUnit): number;
  toJSON(): string;
  toISOString(): string;
  valueOf(): number;
  // The next line is the changed version for moment-duration-format
  format(format?: string, options?: Object): string;
}
declare class Moment {
  tz: MomentTz;
  ISO_8601: string;
  (string?: string, format?: string | Array<string>, locale?: string, strict?: boolean): Moment;
  (initDate: ?Object | number | Date | Array<number> | Moment | string): Moment;
  isValid(): boolean;
  invalidAt(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
  creationData(): MomentCreationData;
  millisecond(number: number): this;
  milliseconds(number: number): this;
  millisecond(): number;
  milliseconds(): number;
  second(number: number): this;
  seconds(number: number): this;
  second(): number;
  seconds(): number;
  minute(number: number): this;
  minutes(number: number): this;
  minute(): number;
  minutes(): number;
  hour(number: number): this;
  hours(number: number): this;
  hour(): number;
  hours(): number;
  date(number: number): this;
  dates(number: number): this;
  date(): number;
  dates(): number;
  day(day: number | string): this;
  days(day: number | string): this;
  day(): number;
  days(): number;
  weekday(number: number): this;
  weekday(): number;
  isoWeekday(number: number): this;
  isoWeekday(): number;
  dayOfYear(number: number): this;
  dayOfYear(): number;
  week(number: number): this;
  weeks(number: number): this;
  week(): number;
  weeks(): number;
  isoWeek(number: number): this;
  isoWeeks(number: number): this;
  isoWeek(): number;
  isoWeeks(): number;
  month(number: number): this;
  months(number: number): this;
  month(): number;
  months(): number;
  quarter(number: number): this;
  quarter(): number;
  year(number: number): this;
  years(number: number): this;
  year(): number;
  years(): number;
  weekYear(number: number): this;
  weekYear(): number;
  isoWeekYear(number: number): this;
  isoWeekYear(): number;
  weeksInYear(): number;
  isoWeeksInYear(): number;
  get(string: string): number;
  set(unit: MomentUnit, value: number): this;
  set(options: { [unit: MomentUnit]: number }): this;
  add(value: number | MomentDuration | Moment | Object, unit?: MomentUnit): this;
  subtract(value: number | MomentDuration | Moment | string | Object, unit?: MomentUnit): this;
  startOf(unit: MomentUnit): this;
  endOf(unit: MomentUnit): this;
  local(): this;
  utc(): this;
  utcOffset(offset: number | string): void;
  utcOffset(): number | string;
  format(format?: string): string;
  fromNow(removeSuffix?: boolean): string;
  from(value: Moment | string | number | Date | Array<number>, removePrefix?: boolean): string;
  toNow(removePrefix?: boolean): string;
  to(value: Moment | string | number | Date | Array<number>, removePrefix?: boolean): string;
  calendar(refTime?: any, formats?: MomentCalendarFormats): string;
  diff(
    date: Moment | string | number | Date | Array<number>,
    format?: string,
    floating?: boolean,
  ): number;
  unix(): number;
  daysInMonth(): number;
  toDate(): Date;
  toArray(): Array<number>;
  toJSON(): string;
  toISOString(): string;
  toObject(): MomentObject;
  isBefore(date?: Moment | string | number | Date | Array<number>): boolean;
  isSame(date?: Moment | string | number | Date | Array<number>): boolean;
  isAfter(date?: Moment | string | number | Date | Array<number>): boolean;
  isSameOrBefore(date?: Moment | string | number | Date | Array<number>): boolean;
  isSameOrAfter(date?: Moment | string | number | Date | Array<number>): boolean;
  isBetween(date: Moment | string | number | Date | Array<number>): boolean;
  isDST(): boolean;
  isDSTShifted(): boolean;
  isLeapYear(): boolean;
  clone(): Moment;
  locale(locale: string, customization?: Object | null): Moment;
  locale(): string;
  unix(seconds: number): Moment;
  utc(): Moment;
  utc(number: number | Array<number>): Moment;
  utc(str: string, str2?: string | Array<string>, str3?: string): Moment;
  utc(moment: Moment): Moment;
  utc(date: Date): Moment;
  parseZone(rawDate: string): Moment;
  max(...dates: Array<Moment>): Moment;
  max(dates: Array<Moment>): Moment;
  min(...dates: Array<Moment>): Moment;
  min(dates: Array<Moment>): Moment;
  isMoment(obj: any): boolean;
  isDate(obj: any): boolean;
  locale(locale: string, localeData?: Object): string;
  updateLocale(locale: string, localeData?: ?Object): void;
  locale(locales: Array<string>): string;
  months(): Array<string>;
  monthsShort(): Array<string>;
  weekdays(): Array<string>;
  weekdaysShort(): Array<string>;
  weekdaysMin(): Array<string>;
  months(): string;
  monthsShort(): string;
  weekdays(): string;
  weekdaysShort(): string;
  weekdaysMin(): string;
  localeData(key?: string): MomentLocaleData;
  duration(value: number | MomentInterval | string, unit?: MomentUnit): MomentDuration;
  isDuration(obj: any): boolean;
  normalizeUnits(unit: MomentUnit): string;
  invalid(object: any): Moment;
  valueOf(): number;
}

declare module 'moment-timezone' {
  declare module.exports: Moment;
}
