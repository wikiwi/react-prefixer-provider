/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import * as objectAssign from "object-assign";

import { PrefixerProviderContext } from "./prefixerprovider";

export interface PrefixerAttributes {
  prefixer?: (styles: any) => any;
}

export function removePrefixerAttributes(props: PrefixerAttributes): void {
  delete props.prefixer;
}

export function withPrefixer<TProps extends PrefixerAttributes>(
  TargetComponent: React.ComponentClass<TProps> | React.StatelessComponent<TProps>): React.ComponentClass<TProps> {
  return class WithPrefixer extends React.PureComponent<TProps, {}> {
    public static contextTypes: any = {
      prefixer: React.PropTypes.func,
    };

    public context: PrefixerProviderContext;

    public render(): React.ReactElement<any> {
      let prefixer = this.props.prefixer;
      if (!prefixer) {
        prefixer = this.context.prefixer;
      }
      if (!prefixer) {
        prefixer = this.noOp;
      }
      const props = objectAssign({}, this.props, {
        prefixer,
      } as PrefixerAttributes);
      return <TargetComponent {...props } />;
    }

    private noOp(styles: any): any {
      return styles;
    }
  };
}
