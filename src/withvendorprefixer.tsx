/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import * as objectAssign from "object-assign";

import { VendorPrefixerProviderContext } from "./vendorprefixerprovider";

export interface VendorPrefixerAttributes {
  vendorPrefixer?: (styles: any) => any;
}

export function removeVendorPrefixerAttributes(props: VendorPrefixerAttributes): void {
  delete props.vendorPrefixer;
}

export function withVendorPrefixer<TProps extends VendorPrefixerAttributes>(
  TargetComponent: React.ComponentClass<TProps> | React.StatelessComponent<TProps>): React.ComponentClass<TProps> {
  return class WithVendorPrefixer extends React.PureComponent<TProps, {}> {
    public static contextTypes: any = {
      vendorPrefixer: React.PropTypes.func,
    };

    public context: VendorPrefixerProviderContext;

    public render(): React.ReactElement<any> {
      let vendorPrefixer = this.props.vendorPrefixer;
      if (!vendorPrefixer) {
        vendorPrefixer = this.context.vendorPrefixer;
      }
      if (!vendorPrefixer) {
        vendorPrefixer = this.noOp;
      }
      const props = objectAssign({}, this.props, {
        vendorPrefixer,
      } as VendorPrefixerAttributes);
      return <TargetComponent {...props } />;
    }

    private noOp(styles: any): any {
      return styles;
    }
  };
}
