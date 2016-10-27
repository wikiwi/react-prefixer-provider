/*
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { assert } from "chai";
import { withVendorPrefixer, removeVendorPrefixerAttributes, VendorPrefixerAttributes } from "./withvendorprefixer";
import { VendorPrefixerProviderContext } from "./vendorprefixerprovider";

describe("withvendorprefixer.tsx", () => {
  describe("removeVendorPrefixerAttributes", () => {
    it("should remove hoc attributes", () => {
      const attrs: VendorPrefixerAttributes = {
        vendorPrefixer: null,
      };
      removeVendorPrefixerAttributes(attrs);
      assert.isUndefined(attrs.vendorPrefixer,
        "hoc attributes were not removed");
    });
  });

  describe("withVendorPrefixer()", () => {
    const vendorPrefixer = (styles: any) => ({ abc: 123 });
    const vendorPrefixer2 = (styles: any) => ({ abc: 234 });
    let getWrapper: (opts?: { props?: VendorPrefixerAttributes, context?: VendorPrefixerProviderContext }) =>
      ShallowWrapper<VendorPrefixerAttributes, {}>;

    before(() => {
      const Component = withVendorPrefixer((props) => (<div></div>));
      getWrapper = (opts = {}) => shallow(<Component {...opts.props} />, { context: opts.context });
    });

    it("should inject noOp vendorPrefixer per default", () => {
      const props = getWrapper().props();
      const prefixed = props.vendorPrefixer({ abc: 123 });
      assert.deepEqual(prefixed, { abc: 123 },
        "noOp vendorPrefixer was not provided");
    });

    it("should inject vendorPrefixer from context", () => {
      const props = getWrapper({ context: { vendorPrefixer } }).props();
      assert.strictEqual(props.vendorPrefixer, vendorPrefixer,
        "vendorPrefixer was not injected");
    });

    it("should use vendorPrefixer from props", () => {
      const props = getWrapper({ props: { vendorPrefixer: vendorPrefixer2 }, context: { vendorPrefixer } }).props();
      assert.strictEqual(props.vendorPrefixer, vendorPrefixer2,
        "vendorPrefixer from props was not relayed");
    });

    it("should use vendorPrefixer from changing props", () => {
      const wrapper = getWrapper();
      wrapper.setProps({ vendorPrefixer: vendorPrefixer2 });
      const props = wrapper.props();
      assert.strictEqual(props.vendorPrefixer, vendorPrefixer2,
        "vendorPrefixer from changing props was not relayed");
    });
  });
});
