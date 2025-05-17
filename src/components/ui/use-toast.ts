import { useState } from "react"

export function useToast() {
    const [toasts, setToasts] = useState<any[]>([])

    const toast = (props: any) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { id, ...props }
        setToasts((prev) => [...prev, newToast])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }

    return { toast, toasts }
} 