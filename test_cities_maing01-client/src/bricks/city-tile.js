//@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import * as UU5 from "uu5g04";

import Config from "./config/config.js";

import "./city-tile.less";
//@viewOff:imports

export const CityTile = createReactClass({
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CityTile",
    classNames: {
      main: Config.CSS + "city-tile",
      name: Config.CSS + "city-tile-name",
      info: Config.CSS + "city-tile-info",
      label: Config.CSS + "city-tile-info-label",
      value: Config.CSS + "city-tile-info-value",
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    let className = this.getClassName();
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Header level={4} className={className.name} content={this.props.name} />
        <UU5.Bricks.Div className={className.info}>
          <UU5.Bricks.Div className={className.label} content={"Population"} />
          <UU5.Bricks.Div className={className.value} content={this.props.population} />
        </UU5.Bricks.Div>
        <UU5.Bricks.Div className={className.info}>
          <UU5.Bricks.Div className={className.label} content={"Average Grade"} />
          <UU5.Bricks.Div className={className.value} content={this.props.averageGrade} />
        </UU5.Bricks.Div>

      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default CityTile;
