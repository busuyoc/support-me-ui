import { LightDarkToggle } from "@/components/ui/light-dark-toggle"

type Props = { // defines a type in TS
    children?: ReactNode, // ? marks the member as being optional in TS
}

export default function LoggedOutLayout({ children }: Props) {
    // in next, any layout files in any dirs will have automatically passed {children}
    // which represents the page inside that layout
    
    // landing page is wrapped inside /app/layout.tsx which is wrapped inside (logged-out)/layout.tsx, which is wrapped inside out (logged-out) group
    
    return (
        <>
        <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
            {/* children have flex, stacked vertically (in col)*/}
            {/* body has min-height: 100vh, padding: 96px */}
            {/* items are justified (centered on the main axis - [col]) */}
            {children}
            </div>
            <LightDarkToggle className="fixed right-0 top-1/2"/>
        </>
    )
}