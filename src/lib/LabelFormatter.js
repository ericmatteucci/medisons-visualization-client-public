// @flow

import TimeUtilities from './TimeUtilities';

class LabelFormatter {
  static chartLabelFormatter(index: number, value: number) {
    return TimeUtilities.epochToLocalDate(value);
  }

  static chartTooltipFormatter(args: Array<Object>) {
    let tooltip = `<div>${TimeUtilities.epochToLocalDate(args[0].axisValue)}</div>`;

    args.forEach(({ marker, seriesName, value }) => {
      const displayValue = value ? value.toFixed(2) : '';

      tooltip += `<div>${marker} ${seriesName} — ${displayValue}</div>`;
    });

    return tooltip;
  }
}

export default LabelFormatter;
