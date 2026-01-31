"use client";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from "react";
import { validateUrl } from "@/components/editor/utils/url";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";

export function LinkPlugin(): React.JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
