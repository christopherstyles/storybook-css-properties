import React, { useState, useEffect } from "react";
import { AddonPanel } from "@storybook/components";
import { PanelContent } from "./components/PanelContent";
import { getAllCSSVariables } from "./get-all-css-variables";

interface PanelProps {
  active: boolean;
}

const getIframe = (setIframePreview: React.Dispatch<React.SetStateAction<HTMLIFrameElement>>) => {
  const iframePreview = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement

  if (!iframePreview) {
    setTimeout(() => getIframe(setIframePreview), 1000)
    return
  }

  setIframePreview(iframePreview)
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [cssVars, setCssVars] = useState([]);
  const [iframePreview, setIframePreview] = useState<HTMLIFrameElement>(null);

  setTimeout(() => {getIframe(setIframePreview)}, 3000)

  useEffect(() => {
    if (!iframePreview) return
    const variables = getAllCSSVariables(iframePreview.contentWindow.document)
    setCssVars(variables)
  }, [iframePreview])

  return (
    <AddonPanel {...props}>
      <PanelContent
        cssProperties={cssVars}
      />
    </AddonPanel>
  );
};
