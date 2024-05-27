//react component showing svg


import React from "react";
import {PageProps} from "@/types";

export function Avatar({ avatar }: PageProps) {
  return /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: avatar
    }
  });
}
