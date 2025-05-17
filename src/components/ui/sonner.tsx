import { useToast } from "./use-toast"

export function toast(props: any) {
    const { toast } = useToast()
    return toast(props)
} 