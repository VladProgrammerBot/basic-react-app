import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Guide = () => {
    const [isGuideOpen, setIsGuideOpen] = useState(true)
    const [currentStep, setCurrentStep] = useState(0)
    const basicGuide = [
        {
            img: "/move-to-child.png",
            text: 'This program is a file system for text, you can navigate like in folders, try viewing the contents of the "plans" folder.'
        },
        {
            img: "/move-to-parent.png",
            text: "You can also go back to the parent folders using the path, click on the \"#\" at the top left, which will go to the root directory"
        },
        {
            img: "/add-child.png",
            text: "You can continue to record information. In the \"recipes\" folder, add a new recipe, creating a \"pancakes\" folder. List the ingredients inside."
        },
        {
            img: "/generate-structure.png",
            text: "You can create a structure using AI integration, so create summer plans in the \"plans\" folder"
        },
        {
            img: "/generate-structure.png",
            text: "clone"
        },
        {
            img: "https://i.sstatic.net/Wgj7N.png",
            text: <div>
                <p className="text-green-500 text-xl font-bold">You done!</p> now you can use it for remembering all you want. But if you want more visit <a href="">official documentation</a>
            </div>
        }
    ]
    const beforeLast = basicGuide.length - 2

    return (
        <div className="fixed bottom-2 sm:bottom-4 max-sm:w-[calc(100vw-16px)] w-100 right-1/2 translate-x-1/2 border-1 border-neutral-300 dark:border-neutral-700 shadow-md shadow-neutral-100 dark:shadow-neutral-950 bg-white dark:bg-neutral-800 p-2 text-center">
            <Button
                variant={"ghost"}
                onClick={() => setIsGuideOpen(!isGuideOpen)}
                className="w-full">
                {isGuideOpen ? <FaAngleDown /> : <FaAngleUp />}
            </Button>
            <div className={`duration-300 overflow-y-hidden ${isGuideOpen ? "h-90 max-h-90" : "h-0"}`}>
                {currentStep <= beforeLast && <p className="font-bold text-2xl pt-4">Step {currentStep < beforeLast ? currentStep : beforeLast} of {beforeLast}</p>}
                <img className="object-cover my-4 aspect-square max-h-40 mx-auto" src={basicGuide[currentStep].img} alt="" />
                <div className="flex justify-center w-full">
                    {basicGuide[currentStep].text}
                </div>
            </div>
            {isGuideOpen && (
                <div className="w-full flex justify-between pt-2">
                    <span>{currentStep > 0 && <Button onClick={() => setCurrentStep(prev => prev -= 1)}>
                        {currentStep < beforeLast + 1 ? "Prev" : "Go back"}
                    </Button>}</span>
                    <span>{currentStep < beforeLast + 1 && <Button onClick={() => setCurrentStep(prev => prev += 1)}>
                        {currentStep < beforeLast ? "Next" : "Finish"}
                    </Button>}</span>
                </div>
            )}
        </div>
    )
}