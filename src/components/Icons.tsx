import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function IconBase({ children, ...props }: IconProps & { children: ReactNode }) {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
}

export function ArrowRightIcon(props: IconProps) { return <IconBase {...props}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase> }
export function ArrowLeftIcon(props: IconProps) { return <IconBase {...props}><path d="M19 12H5M11 18l-6-6 6-6" /></IconBase> }
export function BriefcaseIcon(props: IconProps) { return <IconBase {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></IconBase> }
export function CheckIcon(props: IconProps) { return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase> }
export function ChevronLeftIcon(props: IconProps) { return <IconBase {...props}><path d="m15 18-6-6 6-6" /></IconBase> }
export function ChevronRightIcon(props: IconProps) { return <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase> }
export function ClockIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase> }
export function CompassIcon(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" /></IconBase> }
export function DocumentIcon(props: IconProps) { return <IconBase {...props}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h4M9 13h6M9 17h6" /></IconBase> }
export function FileIcon(props: IconProps) { return <IconBase {...props}><path d="M6 2h8l5 5v15H6z" /><path d="M14 2v6h5M9 13h6M9 17h4" /></IconBase> }
export function LocationIcon(props: IconProps) { return <IconBase {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase> }
export function MailIcon(props: IconProps) { return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></IconBase> }
export function MenuIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase> }
export function SearchIcon(props: IconProps) { return <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></IconBase> }
export function ShieldIcon(props: IconProps) { return <IconBase {...props}><path d="M12 3 4.5 6v5.5c0 4.8 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.7 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></IconBase> }
export function SparkIcon(props: IconProps) { return <IconBase {...props}><path d="m12 3 1.2 4.1a5.2 5.2 0 0 0 3.6 3.6L21 12l-4.2 1.3a5.2 5.2 0 0 0-3.6 3.6L12 21l-1.2-4.1a5.2 5.2 0 0 0-3.6-3.6z" /></IconBase> }
export function UploadIcon(props: IconProps) { return <IconBase {...props}><path d="M12 16V4M7 9l5-5 5 5M5 15v5h14v-5" /></IconBase> }
export function XIcon(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase> }
