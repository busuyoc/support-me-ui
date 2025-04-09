import { Button } from "@/components/ui/button"
import { PersonStandingIcon } from "lucide-react" 
import Link from "next/link"
{ /* Next.js has in-built support for the "paths" and "baseUrl" options of tsconfig.json and jsconfig.json files.

These options allow you to alias project directories to absolute paths, making it easier to import modules. For example:

// before
import { Button } from '../../../components/button'
 
// after
import { Button } from '@/components/button'

https://nextjs.org/docs/13/app/building-your-application/configuring/absolute-imports-and-module-aliases*/}
export default function LandingPage() {
    return (
        <>
            <h1 className="flex gap-2 items-center"><PersonStandingIcon size={50} className="text-pink-500" />Support me!</h1>
            {/* gap-2 is 8px */}
            {/* size={50} value comes from Lucide [dk if its a prop or..] */}
            {/* classes center horizontally w gap and color pink (see TW)  */}
            <p>The best dashboard to manage customer support</p>
            <div className="flex gap-2 items-center">
                <Button asChild>
                    <Link href="/login">Log in</Link>
                </Button>
                {/* asChild passes all the styles of the component to all the children that we render within it */}
                {/* all the styling will be applied to the Link tag */}
                <small>or</small>
                <Button asChild variant="outline">
                    <Link href="/sign-up">Sign up</Link>
                </Button>
                {/* variant prop comes from shadcn */}
            </div>
        </>
    )
}