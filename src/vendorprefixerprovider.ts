/*
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";

export interface VendorPrefixerProviderContext {
  vendorPrefixer: (styles: any) => any;
}

export class VendorPrefixerProvider extends React.PureComponent<VendorPrefixerProviderContext, {}> {
  public static childContextTypes: any = {
    vendorPrefixer: React.PropTypes.func.isRequired,
  };

  public getChildContext(): VendorPrefixerProviderContext {
    return { vendorPrefixer: this.props.vendorPrefixer };
  }

  public render(): React.ReactElement<any> {
    return React.Children.only(this.props.children);
  }
}
