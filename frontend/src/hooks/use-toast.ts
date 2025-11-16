import * as React from 'react'
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type Action =
  | { type: 'ADD_TOAST'; toast: ToasterToast }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToasterToast> }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, dispatch: React.Dispatch<Action>) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: 'REMOVE_TOAST', toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      }

    case 'DISMISS_TOAST': {
      const toastId = action.toastId

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        )
      }
    }

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts:
          action.toastId === undefined
            ? []
            : state.toasts.filter((t) => t.id !== action.toastId)
      }
  }
}

export function useToast() {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] })

  const toast = React.useCallback(
    (props: Omit<ToasterToast, 'id'>) => {
      const id = genId()

      dispatch({
        type: 'ADD_TOAST',
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss(id)
          }
        }
      })

      const update = (newProps: Partial<ToasterToast>) =>
        dispatch({
          type: 'UPDATE_TOAST',
          toast: { ...newProps, id }
        })

      const dismiss = (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId })

      return { id, dismiss, update }
    },
    [dispatch]
  )

  const dismiss = React.useCallback(
    (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    [dispatch]
  )

  // remove quando open=false
  React.useEffect(() => {
    state.toasts.forEach((t) => {
      if (!t.open) addToRemoveQueue(t.id, dispatch)
    })
  }, [state.toasts, dispatch])

  return {
    ...state,
    toast,
    dismiss
  }
}
