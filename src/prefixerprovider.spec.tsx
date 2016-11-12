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
import { PrefixerProvider } from "./prefixerprovider";

describe("<PrefixerProvider>", () => {
  describe("props", () => {
    const prefixer = (styles: any) => ({ abc: 123 });
    let wrapper: ShallowWrapper<any, any>;
    let instance: PrefixerProvider;

    before(() => {
      wrapper = shallow(
        <PrefixerProvider
          prefixer={prefixer}>
          <span>Dummy</span>
        </PrefixerProvider>
      );
      instance = wrapper.instance() as PrefixerProvider;
    });

    it("should relay props to context", () => {
      const context = instance.getChildContext();
      assert.strictEqual(context.prefixer, prefixer,
        "prefixer was not relayed to context");
    });

    it("should handle prop change", () => {
      const nextPrefixer = (styles: any) => ({ abc: 123 });
      wrapper.setProps({ prefixer: nextPrefixer });
      const context = instance.getChildContext();
      assert.strictEqual(context.prefixer, nextPrefixer,
        "prefixer was not relayed to context");
    });
  });
});
