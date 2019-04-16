/*
 * @Author: junjie.lean
 * @Date: 2019-04-15 16:28:09
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2019-04-16 10:22:08
 */

/**
 * @description loading页，解参跳转
 */

import React from "react";
import ReactLoding from "react-loading";
export default class Loading extends React.Component {
  render() {
    let types = [
      "blank",
      "balls",
      "bars",
      "bubbles",
      "cubes",
      "cylon",
      "spin",
      "spinningBubbles",
      "spokes"
    ];

    return (
      <>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowarp",
            justifyContent: "space-around"
          }}
        >
          {types.map((item, index) => {
            return (
              <ReactLoding
                type={item}
                key={index}
                delay={4000}
                color="red"
                height="100px"
                width="100px"
              />
            );
          })}
        </div>
      </>
    );
  }
}
