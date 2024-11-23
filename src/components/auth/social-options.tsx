"use client";

import {FcGoogle} from "react-icons/fc";
import {BsTwitterX} from "react-icons/bs";
import { Button } from "../ui/button";

export const SocialOptions = ({}) => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button className="w-full" size={"lg"} variant={"outline"} onClick={() => {}}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button className="w-full" size={"lg"} variant={"outline"} onClick={() => {}}>
                <BsTwitterX className="h-5 w-5"/>
            </Button>
        </div>
    )
}