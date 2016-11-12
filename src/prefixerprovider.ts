/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";

export interface PrefixerProviderContext {
  prefixer: (styles: any) => any;
}

export class PrefixerProvider extends React.PureComponent<PrefixerProviderContext, {}> {
  public static childContextTypes: any = {
    prefixer: React.PropTypes.func.isRequired,
  };

  public getChildContext(): PrefixerProviderContext {
    return { prefixer: this.props.prefixer };
  }

  public render(): React.ReactElement<any> {
    return React.Children.only(this.props.children);
  }
}
