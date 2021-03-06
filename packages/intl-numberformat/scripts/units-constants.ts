import * as minimist from 'minimist';
import {SANCTIONED_UNITS, removeUnitNamespace} from '@formatjs/intl-utils';
import {outputFileSync} from 'fs-extra';

function main(args: minimist.ParsedArgs) {
  const {out} = args;

  outputFileSync(
    out,
    `/* @generated */
  // prettier-ignore
  export type Unit =
    ${SANCTIONED_UNITS.map(unit => `'${removeUnitNamespace(unit)}'`).join(
      ' | '
    )}
  `
  );
}

if (require.main === module) {
  main(minimist(process.argv));
}
