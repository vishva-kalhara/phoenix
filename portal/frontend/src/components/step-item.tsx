import { ReactNode } from "react";

type StepItemProps = {
    index: number;
} & StepItemDataProps;

export type StepItemDataProps = {
    step: {
        heading: string;
        description: string;
        markup?: ReactNode;
    };
};

const StepItem = ({ index, step }: StepItemProps) => {
    return (
        <div className="flex gap-4 flex-col">
            <div className="flex gap-4">
                <div className="size-10 shrink-0 flex items-center justify-center bg-white/10 rounded-full">
                    {index + 1}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <h3 className="text-normal md:text-lg  font-semibold leading-relaxed mt-1">
                        {step.heading}
                    </h3>
                    <p className="max-w-prose text-sm md:text-normal text-white/70 leading-relaxed -mt-1">
                        {step.description}
                    </p>
                </div>
            </div>
            {step.markup}
        </div>
    );
};

export default StepItem;
