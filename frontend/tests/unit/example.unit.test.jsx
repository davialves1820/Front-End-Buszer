// tests/unit/useToast.unit.test.jsx
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'
import { useToast } from '../../src/hooks/useToast'

describe('Hook useToast', () => {
  it('deve adicionar um toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Teste' })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe('Teste')
    expect(result.current.toasts[0].open).toBe(true)
  })

  it('deve atualizar um toast', () => {
    const { result } = renderHook(() => useToast())

    let toastInstance
    act(() => {
      toastInstance = result.current.toast({ title: 'Original' })
    })

    act(() => {
      toastInstance.update({ title: 'Atualizado' })
    })

    expect(result.current.toasts[0].title).toBe('Atualizado')
  })

  it('deve dar dismiss no toast', () => {
    const { result } = renderHook(() => useToast())

    let toastInstance
    act(() => {
      toastInstance = result.current.toast({ title: 'Para fechar' })
    })

    act(() => {
      toastInstance.dismiss()
    })

    expect(result.current.toasts[0].open).toBe(false)
  })
})
