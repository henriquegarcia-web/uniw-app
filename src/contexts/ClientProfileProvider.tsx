// src/contexts/ClientProfileProvider.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react'
import { useClientAuth } from './ClientAuthProvider'
import {
  IAddress,
  ICreditCard,
  INotificationSettings,
  clientProfileService,
  clientFavoritesService,
} from '@papaya-punch/uniw-shared-modules'

interface ProfileContextData {
  isProfileLoading: boolean
  favorites: string[]
  isFavorite: (productId: string) => boolean
  addFavorite: (productId: string) => Promise<void>
  removeFavorite: (productId: string) => Promise<void>
  updateNotificationSettings(settings: INotificationSettings): Promise<void>
  addCreditCard(cardData: Omit<ICreditCard, 'id' | 'token'>): Promise<void>
  removeCreditCard(cardId: string): Promise<void>
  setDefaultCreditCard(cardId: string): Promise<void>
  addAddress(addressData: Omit<IAddress, 'id'>): Promise<void>
  removeAddress(addressId: string): Promise<void>
  setDefaultAddress(addressId: string): Promise<void>
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useClientAuth()

  const [isProfileLoading, setIsProfileLoading] = useState(false)

  const favorites = user?.clientProfile?.favorites || []

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId)
  }

  const addFavorite = async (productId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    await clientFavoritesService.addFavoriteProduct(user.id, productId)
    setIsProfileLoading(false)
  }

  const removeFavorite = async (productId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    await clientFavoritesService.removeFavoriteProduct(user.id, productId)
    setIsProfileLoading(false)
  }

  const updateNotificationSettings = async (settings: INotificationSettings) => {
    if (!user) throw new Error('Usuário não autenticado.')

    setIsProfileLoading(true)

    try {
      await clientProfileService.updateNotificationSettings(user.id, settings)
    } catch (error: any) {
      throw error
    } finally {
      setIsProfileLoading(false)
    }
  }

  const addCreditCard = async (cardData: Omit<ICreditCard, 'id' | 'token'>) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.addCreditCard(user.id, cardData)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const removeCreditCard = async (cardId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.removeCreditCard(user.id, cardId)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const setDefaultCreditCard = async (cardId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.setDefaultCreditCard(user.id, cardId)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const addAddress = async (addressData: Omit<IAddress, 'id'>) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.addAddress(user.id, addressData)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const removeAddress = async (addressId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.removeAddress(user.id, addressId)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const setDefaultAddress = async (addressId: string) => {
    if (!user) throw new Error('Usuário não autenticado.')
    setIsProfileLoading(true)
    try {
      await clientProfileService.setDefaultAddress(user.id, addressId)
    } finally {
      setIsProfileLoading(false)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        isProfileLoading,
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        updateNotificationSettings,
        addCreditCard,
        removeCreditCard,
        setDefaultCreditCard,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useClientProfile(): ProfileContextData {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile deve ser usado dentro de um ProfileProvider')
  }
  return context
}
