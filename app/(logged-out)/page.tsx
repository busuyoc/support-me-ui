import { Button } from "@/components/ui/button"
{ /* Next.js has in-built support for the "paths" and "baseUrl" options of tsconfig.json and jsconfig.json files.

These options allow you to alias project directories to absolute paths, making it easier to import modules. For example:

// before
import { Button } from '../../../components/button'
 
// after
import { Button } from '@/components/button'

https://nextjs.org/docs/13/app/building-your-application/configuring/absolute-imports-and-module-aliases*/}
export default function LandingPage() {
    return (
        <div>
            <h1>Support me!</h1>
        <Button>
            Log in
        </Button>
        <Button>
            Sign up
        </Button>
        </div>
    )
}