/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { assert } from "chai";
import { withPrefixer, removePrefixerAttributes, PrefixerAttributes } from "./withprefixer";
import { PrefixerProviderContext } from "./prefixerprovider";

describe("withprefixer.tsx", () => {
  describe("removePrefixerAttributes", () => {
    it("should remove hoc attributes", () => {
      const attrs: PrefixerAttributes = {
        prefixer: null,
      };
      removePrefixerAttributes(attrs);
      assert.isUndefined(attrs.prefixer,
        "hoc attributes were not removed");
    });
  });

  describe("withPrefixer()", () => {
    const prefixer = (styles: any) => ({ abc: 123 });
    const prefixer2 = (styles: any) => ({ abc: 234 });
    let getWrapper: (opts?: { props?: PrefixerAttributes, context?: PrefixerProviderContext }) =>
      ShallowWrapper<PrefixerAttributes, {}>;

    before(() => {
      const Component = withPrefixer((props) => (<div></div>));
      getWrapper = (opts = {}) => shallow(<Component {...opts.props} />, { context: opts.context });
    });

    it("should inject noOp prefixer per default", () => {
      const props = getWrapper().props();
      const prefixed = props.prefixer({ abc: 123 });
      assert.deepEqual(prefixed, { abc: 123 },
        "noOp prefixer was not provided");
    });

    it("should inject prefixer from context", () => {
      const props = getWrapper({ context: { prefixer } }).props();
      assert.strictEqual(props.prefixer, prefixer,
        "prefixer was not injected");
    });

    it("should use prefixer from props", () => {
      const props = getWrapper({ props: { prefixer: prefixer2 }, context: { prefixer } }).props();
      assert.strictEqual(props.prefixer, prefixer2,
        "prefixer from props was not relayed");
    });

    it("should use prefixer from changing props", () => {
      const wrapper = getWrapper();
      wrapper.setProps({ prefixer: prefixer2 });
      const props = wrapper.props();
      assert.strictEqual(props.prefixer, prefixer2,
        "prefixer from changing props was not relayed");
    });
  });
});
