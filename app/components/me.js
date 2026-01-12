import { forwardRef } from "react";

const Me = forwardRef(function Me(props, ref) {
    return <div ref={ref} className="bg-[#11111150] rounded-4xl p-6">

        <div className="">
            <h1 className="text-stone-100 text-4xl  font-medium">Md. Raihan Hossen</h1>
        </div>
    </div>;
});

export default Me;