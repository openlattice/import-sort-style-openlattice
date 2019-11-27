export default function({
  and,
  dotSegmentCount,
  hasDefaultMember,
  hasNamedMembers,
  hasNoMember,
  hasOnlyDefaultMember,
  hasOnlyNamedMembers,
  hasOnlyNamespaceMember,
  isAbsoluteModule,
  isRelativeModule,
  member,
  moduleName,
  name,
  not,
  unicode,
}) {

  const isLocalModule = (imported) => Boolean(imported.moduleName.match(/^\.\//));
  const isReact = (imported) => Boolean(imported.moduleName.match(/^(react|react-dom)$/));
  const isTypeImport = (imported) => Boolean(imported.type === 'import-type');

  return [
    // import 'thing'
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import './thing'
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import React from 'react';
    // import ReactDOM from 'react-dom';
    {
      match: and(not(isTypeImport), isReact),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import type { ... } from 'react';
    {
      match: and(isTypeImport, isReact),
      sort: moduleName(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    /*
     *
     * ABSOLUTE
     *
     */

    // import UpperThing from 'thing';
    // import lowerThing from 'thing';
    {
      match: and(
        hasOnlyDefaultMember,
        isAbsoluteModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import UpperThing, { innerThing } from 'thing';
    // import lowerThing, { innerThing } from 'thing';
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isAbsoluteModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import * as Thing from 'thing';
    {
      match: and(
        hasOnlyNamespaceMember,
        isAbsoluteModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import { innerThing1, innerThing2 } from 'thing';
    {
      match: and(
        hasOnlyNamedMembers,
        isAbsoluteModule,
        not(isTypeImport),
      ),
      sort: moduleName(unicode),
      sortNamedMembers: name(unicode),
    },

    // import type { ... } from 'thing';
    {
      match: and(
        isTypeImport,
        isAbsoluteModule,
      ),
      sort: moduleName(unicode),
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    /*
     *
     * RELATIVE - local
     *
     */

    // import UpperThing from './path';
    // import lowerThing from './path';
    {
      match: and(
        hasOnlyDefaultMember,
        isLocalModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import UpperThing, { innerThing } from './path';
    // import lowerThing, { innerThing } from './path';
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isLocalModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import * as Thing from './path';
    {
      match: and(
        hasOnlyNamespaceMember,
        isLocalModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import { innerThing1, innerThing2 } from './path';
    {
      match: and(
        hasOnlyNamedMembers,
        isLocalModule,
        not(isTypeImport),
      ),
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: name(unicode),
    },

    // import type { ... } from './path';
    {
      match: and(
        isTypeImport,
        isLocalModule,
      ),
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: name(unicode),
    },
    { separator: true },

    /*
     *
     * RELATIVE - non-local
     *
     */

    // import UpperThing from '../../path';
    // import lowerThing from '../../path';
    {
      match: and(
        hasOnlyDefaultMember,
        isRelativeModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import UpperThing, { innerThing } from '../../path';
    // import lowerThing, { innerThing } from '../../path';
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isRelativeModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import * as Thing from '../../path';
    {
      match: and(
        hasOnlyNamespaceMember,
        isRelativeModule,
        not(isTypeImport),
      ),
      sort: member(unicode),
    },

    // import { innerThing1, innerThing2 } from '../../path';
    {
      match: and(
        hasOnlyNamedMembers,
        isRelativeModule,
        not(isTypeImport),
      ),
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: name(unicode),
    },

    // import type { ... } from '../../path';
    {
      match: and(
        isTypeImport,
        isRelativeModule,
      ),
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: name(unicode),
    },
    { separator: true },
  ];
}
