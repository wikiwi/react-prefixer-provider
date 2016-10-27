/*
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { assert } from "chai";
import { createDOM, DOM } from "./dom";
import { VendorPrefixerProvider } from "../src/vendorprefixerprovider";
import { withVendorPrefixer } from "../src/withvendorprefixer";

describe("integration test", () => {
  const Component = withVendorPrefixer((props: any) => <div style={props.vendorPrefixer(props.style)} />);
  const vendorPrefixer = (styles: any) => {
    const result: any = {};
    for (let key in styles) {
      result["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key];
    }
    return result;
  };
  let dom: DOM;
  let wrapper: ReactWrapper<any, {}>;

  const App = (props: any) => (
    <VendorPrefixerProvider vendorPrefixer={vendorPrefixer}>
      <Component {...props} />
    </VendorPrefixerProvider>
  );

  before(() => {
    dom = createDOM();
    wrapper = mount(<App />);
  });

  after(() => {
    dom.destroy();
  });

  it("should return prefixed styles", () => {
    wrapper.setProps({ style: { appearance: "normal" } });
    const { style } = wrapper.find("div").props();
    assert.deepEqual(style, { WebkitAppearance: "normal" },
      "unexpected style");
  });
});
