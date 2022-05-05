import React, { isValidElement } from "react";
import { configure, shallow } from "enzyme";
import { EnzymeAdapter } from "enzyme";
import Card from "../src/components/Card/Card";

configure({ adapter: new EnzymeAdapter() });

describe("<Card />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = isValidElement(<Card />);
    });
    it("Renderiza 1 <div> con toda la ifo que le llega por props adentro", () => {
      expect(wrapper("div")).toHaveLength(1);
    });

    it("Renderiza 1 <img>", () => {
      expect(wrapper.find("img")).toHaveLength(1);
    });

    it("Renderiza 1 <h3>", () => {
      expect(wrapper.find("h3")).toHaveLength(1);
    });

    it("Renderiza 1 <h5>", () => {
      expect(wrapper.find("h5")).toHaveLength(1);
    });
  });
});
