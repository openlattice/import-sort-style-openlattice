# import-sort-style-openlattice

OpenLattice's `import-sort` styles.

https://github.com/renke/import-sort

## Atom
Install the `atom-import-sort` package.

https://atom.io/packages/atom-import-sort


Add `.importsortrc` to your project:
```
{
  ".js": {
    "parser": "babylon",
    "style": "openlattice"
  }
}
```

## Style

```
// absolute / relative modules with side effects, order may matter
import 'thing';
import './thing';

// react imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import type { ComponentType } from 'react';

/*
 *
 * ABSOLUTE - 3rd party modules (i.e. node_modules)
 *
 */

import UpperThing from 'thing';
import lowerThing from 'thing';
import UpperThing, { innerThing } from 'thing';
import lowerThing, { innerThing } from 'thing';
import * as FancyThing from 'thing-fancy';
import * as SillyThing from 'thing-silly';
import { innerThing1, innerThing2 } from 'thing';
import type { ThingType } from 'thing';

/*
 *
 * RELATIVE - current directory
 *
 */

import UpperThing from './thing';
import lowerThing from './thing';
import UpperThing, { innerThing } from './thing';
import lowerThing, { innerThing } from './thing';
import * as FancyThing from './thing';
import * as SillyThing from './thing';
import { innerThing1, innerThing2 } from './thing';
import type { ThingType } from './thing';

/*
 *
 * RELATIVE - parent / sibling directories
 *
 */

import UpperThing from '../../thing';
import lowerThing from '../thing';
import UpperThing, { innerThing } from '../../thing';
import lowerThing, { innerThing } from '../thing';
import * as FancyThing from '../../thing';
import * as SillyThing from '../thing';
import { innerThing1, innerThing2 } from '../../thing';
import { innerThing3, innerThing4 } from '../thing';
import type { ThingType } from '../../thing';
```
