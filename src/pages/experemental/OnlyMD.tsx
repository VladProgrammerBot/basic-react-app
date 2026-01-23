import { guideMarkdownSteps } from "../workspace/cards/Guide/GuideMarkdown";
import { MarkdownRenderer } from "../workspace/cards/Guide/MarkdownRenderer";

export const OnluMD = () => {
  return (
    <div>
      <MarkdownRenderer content={guideMarkdownSteps[0]} />
    </div>
  );
};
