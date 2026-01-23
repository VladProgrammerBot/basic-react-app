import React from "react";
import ReactMarkdown from "react-markdown";
import { guideMarkdownSteps } from "../workspace/cards/Guide/GuideMarkdown";

export const SimpleMd2: React.FC = () => {
  return <ReactMarkdown>{guideMarkdownSteps[0]}</ReactMarkdown>;
};
