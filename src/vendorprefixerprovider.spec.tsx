/*
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { assert } from "chai";
import { VendorPrefixerProvider } from "./vendorprefixerprovider";

describe("<VendorPrefixerProvider>", () => {
  describe("props", () => {
    const vendorPrefixer = (styles: any) => ({ abc: 123 });
    let wrapper: ShallowWrapper<any, any>;
    let instance: VendorPrefixerProvider;

    before(() => {
      wrapper = shallow(
        <VendorPrefixerProvider
          vendorPrefixer={vendorPrefixer}>
          <span>Dummy</span>
        </VendorPrefixerProvider>
      );
      instance = wrapper.instance() as VendorPrefixerProvider;
    });

    it("should relay props to context", () => {
      const context = instance.getChildContext();
      assert.strictEqual(context.vendorPrefixer, vendorPrefixer,
        "venderPrefixer was not relayed to context");
    });

    it("should handle prop change", () => {
      const nextVendorPrefixer = (styles: any) => ({ abc: 123 });
      wrapper.setProps({ vendorPrefixer: nextVendorPrefixer });
      const context = instance.getChildContext();
      assert.strictEqual(context.vendorPrefixer, nextVendorPrefixer,
        "venderPrefixer was not relayed to context");
    });
  });
});
